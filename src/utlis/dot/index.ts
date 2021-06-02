import {ApiPromise, Keyring, WsProvider} from '@polkadot/api'
import {cryptoWaitReady, mnemonicGenerate, randomAsU8a} from '@polkadot/util-crypto'
import {BN_TEN, formatBalance, isHex, u8aToHex} from '@polkadot/util';
import BN from 'bn.js'
import {KeyringPair, KeyringPair$Json} from '@polkadot/keyring/types'
import type {Text} from '@polkadot/types'
import type {ChainProperties} from '@polkadot/types/interfaces';
import {getFormatBalance} from './tools'
import FileSaver from 'file-saver'

const node = {
  polkadot: 'wss://rpc.polkadot.io',
  dbc: 'wss://info.dbcwallet.io'
}
let api: ApiPromise | null = null

declare interface Network {
  api: ApiPromise,
  chain: Text,
  nodeName: Text,
  nodeVersion: Text,
  properties: ChainProperties,
  decimals: number,
  unit: string
}

// 链接账户
export const initNetwork = async (): Promise<Network> => {
  if (!api) {
    const provider = new WsProvider(node.dbc)
    api = await ApiPromise.create({
      provider
    })
  }
  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion, properties] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
    api.rpc.system.properties(),
  ])
  const tokenSymbol = properties.tokenSymbol.unwrapOrDefault()
  const tokenDecimals = properties.tokenDecimals.unwrapOrDefault()

  formatBalance.setDefaults({
    decimals: (tokenDecimals as BN[]).map((b) => b.toNumber()),
    unit: tokenSymbol[0].toString()
  });
  const {decimals, unit} = formatBalance.getDefaults()

  return {
    api,
    chain,
    nodeName,
    nodeVersion,
    properties,
    decimals,
    unit
  }
}
// 获得当前账户的余额
export const onGetBalance = async (address: string, callback: (num: string, token: string, decimals: number) => void): Promise<(() => void) | undefined> => {
// Subscribe to balance changes for our account
  return await api?.query.system.account(address, ({nonce, data: balance}) => {
    const [num, token, decimals] = getFormatBalance(balance.free)
    console.log(`原始余额是${balance.free}`)
    console.log(`余额是:${num} ${token}`)
    callback(num, token, decimals)
  })
}

// 输入的值转BN
export const inputToBn = (input: string, siPower: BN, basePower: number) => {
  const isDecimalValue = input.match(/^(\d+)\.(\d+)$/);

  let result;

  if (isDecimalValue) {
    const div = new BN(input.replace(/\.\d*$/, ''));
    const modString = input.replace(/^\d+\./, '').substr(0, api?.registry.chainDecimals[0]);
    const mod = new BN(modString);
    result = div
      .mul(BN_TEN.pow(siPower))
      .add(mod.mul(BN_TEN.pow(new BN(basePower - modString.length))));
    console.log('[modString]->', modString)
  } else {
    result = new BN(input.replace(/[^\d]/g, ''))
      .mul(BN_TEN.pow(siPower));
  }

  return result
}

// 交易
export const onTransferBalance = (pair: KeyringPair, toAddress: string, input: string, callback?: (hex: string) => void) => {
  if (api) {
    const basePower: number = formatBalance.getDefaults().decimals // 小数位数
    const siPower: BN = new BN(basePower)
    console.log(siPower.toString())
    const bob = inputToBn(input, siPower, basePower)
    const transfer = api.tx.balances.transfer(toAddress, bob)
    const hex = transfer.hash.toHex()
    console.log('transfer hash->', hex)
    // const transferHash = await transfer.signAndSend(pair)
    // console.log('[发送hash值]->', transferHash.hash.toHex())
    // return transferHash
    let unSubTransfer: () => void;
    transfer.signAndSend(pair, (result) => {
        console.log(`Current status is ${result.status}`);

        if (result.status.isInBlock || result.status.isFinalized) {
          console.log(`Transaction at blockHash ${result.status.asInBlock || result.status.asFinalized}`);
          if (callback) {
            console.log('callback');
            callback(result.status.asInBlock.toHex() || result.status.asFinalized.toHex())
          }
        }
        if (result.isCompleted) {
          unSubTransfer()
        }
      }
    ).then(unsub => {
      console.log(unsub, 'sueess.msg')
      unSubTransfer = unsub
    }).catch(e => {
      console.log(e.message, 'error.msg')
    })
  }
}

// 创建账户
const keyring = new Keyring({type: 'sr25519'})
// keyring.setSS58Format(0) // 0: potkadot前缀 2:kusama前缀 default substrade
export const createAccountFromMnemonic = async (): Promise<{ mnemonic: string, pair: KeyringPair } | null> => {
  if (keyring) {
    await cryptoWaitReady()
    const mnemonic = mnemonicGenerate(12)
    const pair = keyring.addFromMnemonic(mnemonic)
    return {
      mnemonic,
      pair
    }
  }
  return null
}
export const createAccountFromSeed = async (): Promise<{ seed: string, pair: KeyringPair } | null> => {
  if (keyring) {
    await cryptoWaitReady()
    const seed = u8aToHex(randomAsU8a())
    const pair = keyring.addFromUri(seed)
    return {
      seed,
      pair
    }
  }
  return null
}

// 将Keypair增加到账户中
export const addAccount = (pair: KeyringPair): KeyringPair => {
  return keyring.addPair(pair)
}

export const getPairs = (): KeyringPair[] => {
  return keyring?.getPairs() || []
}
export const getPair = (address: string): KeyringPair => {
  return keyring.getPair(address)
}
// 获取当前账户
export const getCurrentPair = (): KeyringPair | null => {
  const pairs = keyring.getPairs()
  if (pairs.length > 0) {
    return pairs[0]
  } else {
    return initFromLocalstorage()
  }
}

// 导入keystore
export const importAccountFromKeystore = (file: File): Promise<KeyringPair> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (e) => {
      const fileText = e.target?.result
      if (fileText) {
        console.log('fileText->', fileText)
        const json = JSON.parse(String(fileText))
        console.log('json->', json)
        const pair = keyring.addFromJson(json)
        resolve(pair)
      }
    }
  })
}

//导入json
export const importAccountFromJson = (json: KeyringPair$Json): KeyringPair | null => {
  if (keyring) {
    return keyring.addFromJson(json)
  }
  return null
}

// 用助记词导入
export const importAccountFromMnemonic = (word: string): KeyringPair => {
  return keyring.addFromMnemonic(word)
}
export const importAccountFromSeed = (seed: string): KeyringPair => {
  return keyring.addFromUri(seed)
}

// 导出私钥
export const exportAccountForKeystore = (pair: KeyringPair, password?: string): void => {
  let jsonStr = localStorage.getItem('pair')
  if (!jsonStr) {
    jsonStr = JSON.stringify(pair.toJson(password))
  }
  const blob = new Blob([jsonStr], {type: 'application/json; charset=utf-8'});
  FileSaver.saveAs(blob, `${pair.address}.json`);
}

// 保存在localStore
export const savePair = (pair: KeyringPair, password?: string): void => {
  const jsonString = JSON.stringify(pair.toJson(password))
  console.log('saveJson->', jsonString)
  localStorage.setItem('pair', jsonString)
}

// 从本地存储恢复账户
export const initFromLocalstorage = (): KeyringPair | null => {
  const jsonStr = localStorage.getItem('pair')
  if (keyring && jsonStr) {
    const json = JSON.parse(jsonStr)
    return importAccountFromJson(json)
  }
  return null
}

// 移除账户
export const removePair = (address: string): void => {
  keyring.removePair(address)
  localStorage.removeItem('pair')
}

// 工具
export function isHexSeed(seed: string): boolean {
  return isHex(seed) && seed.length === 66;
}

// 工具
export {mnemonicValidate, isAddress} from '@polkadot/util-crypto'
