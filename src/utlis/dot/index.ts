import { ApiPromise, WsProvider, Keyring } from '@polkadot/api'
import { mnemonicGenerate } from '@polkadot/util-crypto'
import type { KeyringPair } from '@polkadot/keyring/types'
import type { Text } from '@polkadot/types'
import { getFormatBalance } from './tools'

const node = {
  polkadot: 'wss://rpc.polkadot.io',
  dbc: 'wss://infotest.dbcwallet.io'
}
let api: ApiPromise | null = null

declare interface Network {
  api: ApiPromise,
  chain: Text,
  nodeName: Text,
  nodeVersion: Text
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
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ])
  return {
    api,
    chain,
    nodeName,
    nodeVersion
  }
}

// 获得当前账户的余额
export const getBalance = (address: string) => {
// Subscribe to balance changes for our account
  return api?.query.system.account(address, ({ nonce, data: balance }) => {
    const [num, token] = getFormatBalance(balance.free)
    console.log(`原始余额是${balance.free}`)
    console.log(`余额是:${num} ${token}`)
  })
}

export const transferBalance = (pair: KeyringPair, toAddress: string, bob: number, password: string) => {
  if (api) {
    const transfer = api.tx.balances.transfer(toAddress, bob)
    pair.unlock(password)
    return transfer.signAndSend(pair).then(hash => {
      return Promise.resolve(hash.toHex())
    })
  } else {
    return undefined
  }
}

// 创建账户
const keyring = new Keyring({ type: 'sr25519' })
// keyring.setSS58Format(0) // 0: potkadot前缀 2:kusama前缀 default substrade
export const createAccount = () => {
  const mnemonic = mnemonicGenerate(12)
  const pair = keyring.createFromUri(mnemonic)
  return {
    mnemonic,
    pair
  }
}

// 将Keypair增加到账户中
export const addAccount = (pair: KeyringPair): KeyringPair => {
  return keyring.addPair(pair)
}

export const getPairs = (): KeyringPair[] => {
  return keyring?.getPairs()
}
export const getPair = (address: string) => {
  return keyring.getPair(address)
}

// 导入keystore
export const importAccountFromKeystore = (file: File): Promise<KeyringPair> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (e) => {
      const fileText = e.target?.result
      if (fileText) {
        const json = JSON.parse(fileText as string)
        const pair = keyring.addFromJson(json)
        resolve(pair)
      }
    }
  })
}

// 用助记词导入
export const importAccountFromMnemonic = (word: string): KeyringPair => {
  return keyring.addFromMnemonic(word)
}

export { mnemonicValidate } from '@polkadot/util-crypto'
