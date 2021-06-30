import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'
import {
  cryptoWaitReady, 
  mnemonicGenerate, 
  randomAsU8a, 
  mnemonicToMiniSecret,
  naclKeypairFromSeed,
  decodeAddress,
  encodeAddress,
  base64Decode,
  naclBoxKeypairFromSecret,
  signatureVerify,
  blake2AsHex} from '@polkadot/util-crypto'
import { BN_TEN, formatBalance, isHex,stringToU8a , u8aToHex, hexToU8a } from '@polkadot/util';
import { decodePair } from "@polkadot/keyring/pair/decode";
import BN from 'bn.js'
import { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types'
import type { Text } from '@polkadot/types'
import type { ChainProperties } from '@polkadot/types/interfaces';
import { getFormatBalance } from './tools'
import FileSaver from 'file-saver'
import nacl from 'tweetnacl'

const node = {
  polkadot: 'wss://rpc.polkadot.io',
  // dbc: 'wss://innertest.dbcwallet.io'
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
interface Sealed {
  sealed: Uint8Array;
  nonce: Uint8Array;
}

// 链接账户
export const initNetwork = async (): Promise<Network> => {
  if (!api) {
    const provider = new WsProvider(node.dbc)
    api = await ApiPromise.create({ provider })
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
export const onGetBalance = async (address: string, callback: (num: string, token: string, decimals: number, free: any) => void): Promise<(() => void) | undefined> => {
// Subscribe to balance changes for our account
  return await api?.query.system.account(address, ({nonce, data: balance}) => {
    const free = balance.free
    const [num, token, decimals] = getFormatBalance(balance.free)
    console.log(`原始余额是${balance.free}`)
    const num1 = num !='0'?num.slice(0, num.length-4):num
    callback(num1, token, decimals, free)
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
        const json = JSON.parse(String(fileText))
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

/**
 * 非对称加密方法
 *  decodePair：通过pair和对应密码解锁密钥对
 *  hexToU8a：hex值转为Uint8Array格式
 *  naclBoxKeypairFromSecret: 用过给出的 Uint8Array格式对象 生成新的 Uint8Array 32位密钥对，用来进行非对称加密解密
 *  decodeAddress：将给定钱包地址生成 publicKey：Uint8Array 格式对象
 *  encodeAddress：将给定publicKey：Uint8Array 格式对象生成 钱包地址字段
 * 
 *  naclSeal 生成加密信息字段
 * @param message: Uint8Array 不限长度
 * @param senderBoxSecret: Uint8Array 32位
 * @param receiverBoxPublic: Uint8Array 32位
 * @param nonce: Uint8Array 24位
 * @returns nonce ， sealed
 * 
 *   naclOpen 解开加密信息字段
 * @param sealed: Uint8Array
 * @param nonce: 与传入nonce对应
 * @param senderBoxPublic: Uint8Array 32位
 * @param receiverBoxSecret: Uint8Array 32位
 * @returns message: Uint8Array
 * u8aToString(message) 将Uint8Array转为字符串
 */

// 通过pair解锁密钥对 需要获取用户的pair文件及passward
export const getKeypair = ( password : string ): Object => {
  const jsonStr1 = localStorage.getItem('pair')
  if (keyring && jsonStr1) {
    const pair = JSON.parse(jsonStr1?jsonStr1:'{}')
    let NewKeyPair = decodePair( password , base64Decode(pair.encoded), pair.encoding.type );
    let NewKeyPair1 = naclBoxKeypairFromSecret(NewKeyPair.secretKey)
    return NewKeyPair1
  } else {
    return {}
    // throw Error ('pair is not define')
  }
}

// 通过助记词获取密钥对
// const MNEMONIC = 'unfold tackle winner comfort child hammer build recall regular lucky inform remain';

// const seedAlice = mnemonicToMiniSecret(MNEMONIC);

// 通过助记词生成 Uint8Array格式的私钥
// console.log(seedAlice, 'seedAlice');

// Generate new public/secret keypair for Alice from the supplied seed
// const { publicKey, secretKey } = naclKeypairFromSeed(seedAlice);
// console.log(publicKey, secretKey, secretKey.slice(0,32),  'secretKey')

// 验证通过私钥生成的 Uint8Array 是否与 助记词获取的一致
// console.log(hexToU8a('0xf2ea52af98446cefa3e884353dd760e25d7f39386d0caa26be600c00425d10da'));

// 验证通过私钥生成的 Uint8Array 生成的新的密钥对是否可用
// console.log(naclBoxKeypairFromSecret(hexToU8a('0xf2ea52af98446cefa3e884353dd760e25d7f39386d0caa26be600c00425d10da')),'naclBoxKeypairFromSecret(hexToU8a)');

// 验证通过助记词获取生成的 secretKey 生成的新的密钥对是否 与 上面的密钥对一致
// console.log(naclBoxKeypairFromSecret(secretKey),'naclBoxKeypairFromSecret(secretKey)');

// 验证地址转 publicKey：Uint8Array 及  publicKey：Uint8Array 转地址是否一致
// console.log(decodeAddress('5GkLkFKcYpPfbdBwVWrCyae5uJkkXtqkkYXSbm8znSZDiFpC'), encodeAddress(publicKey, 42),'encodeAddress->publicKey');
// 生成加密信息
export function naclSeal (message: Uint8Array, senderBoxSecret: Uint8Array, receiverBoxPublic: Uint8Array, nonce: Uint8Array = randomAsU8a(24)): Sealed {
  return {
    nonce,
    sealed: nacl.box(message, nonce, hexToU8a('0x383D1BA9DE5EB1A4656665002DA06586227362C31AABCE0988980612B858CD3A'), senderBoxSecret)
  }; 
}

// 解析加密信息
export function naclOpen (sealed: Uint8Array, nonce: Uint8Array, senderBoxPublic: Uint8Array, receiverBoxSecret: Uint8Array): Uint8Array | null {
  return nacl.box.open(sealed, nonce, senderBoxPublic, receiverBoxSecret ) || null;
}


/**
 * 生成签名信息
 * sign 
 * sign (message: Uint8Array | string)
 * 
 * signatureVerify 验证签名
 * signatureVerify (message: Uint8Array | string, signature: Uint8Array | string, publicKey: Uint8Array | string)
 * @param message: Uint8Array | string
 * @param signature: Uint8Array | string
 * @param publicKey: Uint8Array | string
 * @returns true or false
*/

let message = 'ceshiyixia'
// 自己签名并验证
// export const CreateSignature = async (message: string | Uint8Array , password: string ) => {
//   let jsonStr4 = JSON.parse(localStorage.getItem('pair')!)
//   let signUrl = keyring.addFromJson(jsonStr4);
//   signUrl.unlock(password)
//   await cryptoWaitReady();
//   const signature = signUrl.sign(message);
//   console.log(signature, 'signature');
//   console.log(signUrl.verify(message, signature, signUrl.publicKey));
// }
// CreateSignature(message, '123456789');

// 自己签名，别人验证
// export const CreateSignature = async (message: string | Uint8Array , password: string ): Promise<Uint8Array> => {
//   let jsonStr4 = JSON.parse(localStorage.getItem('pair')!)
//   let signUrl = keyring.addFromJson(jsonStr4);
//   signUrl.unlock(password)
//   await cryptoWaitReady();
//   const signature = signUrl.sign(message);
//   return signature
// }
// CreateSignature(message, '123456789').then((res)=>{
//   console.log(signatureVerify( message, res, '5DhFCVhtxZkz1mXWQcGv67tPvGzqXjEcF1q1DPUdCAJEX7vm' ), 'signatureVerify2' );
// })
/**
 * 生成HASH值
 * blake2AsHex(data: Uint8Array | string, bitLength?: number)
 */

let machine_id = "2gfpp3MAB4Aq2ZPEU72neZTVcZkbzDzX96op9d3fvi3",
 gpu_type = "GeForceRTX2080Ti",
 gpu_num = "4",
 cuda_core = "4352",
 gpu_mem = "11283456",
 calc_point = "6825",
 hard_disk = "3905110864",
 cpu_type = "Intel(R) Xeon(R) Silver 4110 CPU",
 cpu_core_num = "32",
 cpu_rate = "26",
 mem_num = "527988672",
 
 upload_net = "22948504" , //不确定的数值
 download_net = "30795411" , // 不确定的数值
 longitude = "3122222" , // 经度, 不确定值，存储平均值
 latitude = "12145806" , // 纬度, 不确定值，存储平均值
 
 rand_str = "abcdefg",
 is_support = "true"
 
 let raw_input = (
     machine_id
     + gpu_type
     + gpu_num
     + cuda_core
     + gpu_mem
     + calc_point
     + hard_disk
     + cpu_type
     + cpu_core_num
     + cpu_rate
     + mem_num
     + upload_net
     + download_net
     + longitude
     + latitude
     + rand_str
     + is_support
 )
blake2AsHex(raw_input ,128)


// 链上交互
// let api1: ApiPromise | null = null
// export const GetApi = async ()=>{
//   if (!api1) {
//     const provider = new WsProvider('wss://innertest.dbcwallet.io')
//     api1 = await ApiPromise.create({ 
//       provider ,
//       types: {
//         "PriceURL": "Text",
//         "ReportId": "u64",
//         "SlashId": "u64",
//         "StandardGpuPointPrice": {
//           "gpu_point": "u64",
//           "gpu_price": "u64"
//         },
//         "URL": "Text",
//         "MachineId": "Text",
//         "OrderId": "u64",
//         "LiveMachine": {
//           "bonding_machine": "Vec<MachineId>",
//           "ocw_confirmed_machine": "Vec<MachineId>",
//           "booked_machine": "Vec<MachineId>",
//           "waiting_hash": "Vec<MachineId>",
//           "bonded_machine": "Vec<MachineId>"
//         },
//         "StakerMachine": {
//           "total_machine": "Vec<MachineId>",
//           "online_machine": "Vec<MachineId>",
//           "total_calc_points": "u64",
//           "total_gpu_num": "u64",
//           "total_claimed_reward": "Balance",
//           "can_claim_reward": "Balance",
//           "left_reward": "VecDeque<Balance>"
//         },
//         "BlockNumber": "u32",
//         "MachineInfo": {
//           "machine_owner": "AccountId",
//           "machine_renter": "Option<AccountId>",
//           "bonding_height": "BlockNumber",
//           "stake_amount": "Balance",
//           "machine_status": "MachineStatus",
//           "machine_info_detail": "MachineInfoDetail",
//           "machine_price": "u64",
//           "reward_committee": "Vec<AccountId>",
//           "reward_deadline": "BlockNumber"
//         },
//         "MachineStatus": {
//           "_enum": [
//             "MachineSelfConfirming",
//             "CommitteeVerifying",
//             "WaitingFulfill",
//             "Online",
//             "StakerReportOffline(BlockNumber)",
//             "ReporterReportOffline(BlockNumber",
//             "Creating",
//             "Rented"
//           ]
//         },
//         "MachineInfoDetail": {
//           "committee_upload_info": "CommitteeUploadInfo",
//           "staker_customize_info": "StakerCustomizeInfo"
//         },
//         "CommitteeUploadInfo": {
//           "machine_id": "MachineId",
//           "gpu_type": "Vec<u8>",
//           "gpu_num": "u32",
//           "cuda_core": "u32",
//           "gpu_mem": "u64",
//           "calc_point": "u64",
//           "hard_disk": "u64",
//           "cpu_type": "Vec<u8>",
//           "cpu_core_num": "u32",
//           "cpu_rate": "u64",
//           "mem_num": "u64",
//           "rand_str": "Vec<u8>",
//           "is_support": "bool"
//         },
//         "StakerCustomizeInfo": {
//           "left_change_time": "u64",
//           "upload_net": "u64",
//           "download_net": "u64",
//           "longitude": "u64",
//           "latitude": "u64",
//           "images": "Vec<ImageName>"
//         },
//         "ImageName": "Text",
//         "CPU": {
//           "num": "Vec<u8>",
//           "type": "Vec<u8>"
//         },
//         "Disk": {
//         },
//         "GPU": {
//           "num": "Vec<u8>",
//           "gpus": "Vec<GPUDetail>"
//         },
//         "GPUDetail": {
//           "grade": "Vec<u8>"
//         },
//         "AccountInfo": {
//           "nonce": "u32",
//           "consumers": "u32",
//           "providers": "u32",
//           "data": "AccountData"
//         },
//         "EraMachinePoints": {
//           "total": "u64",
//           "individual_points": "BTreeMap<MachineId, MachineGradeStatus>",
//           "staker_statistic": "BTreeMap<AccountId, StakerStatistics>"
//         },
//         "MachineGradeStatus": {
//           "basic_grade": "u64",
//           "is_online": "bool"
//         },
//         "StakerStatistics": {
//           "online_num": "u64",
//           "inflation": "Perbill",
//           "machine_total_calc_point": "u64",
//           "rent_extra_grade": "u64"
//         },
//         "StakingLedger": {
//           "stash": "AccountId",
//           "total": "Compact<Balance>",
//           "active": "Compact<Balance>",
//           "unlocking": "Vec<UnlockChunk>",
//           "claimed_rewards": "Vec<EraIndex>",
//           "released_rewards": "Balance",
//           "upcoming_rewards": "Vec<Balance>"
//         },
//         "UnlockChunk": {
//           "value": "Compact<Balance>",
//           "era": "Compact<EraIndex>"
//         },
//         "CommitteeMachine": {
//           "machine_id": "Vec<MachineId>",
//           "total_calc_points": "u64",
//           "total_gpu_num": "u64",
//           "total_reward": "Balance"
//         },
//         "LCCommitteeList": {
//           "committee": "Vec<AccountId>",
//           "chill_list": "Vec<AccountId>",
//           "fulfill_list": "Vec<AccountId>",
//           "black_list": "Vec<AccountId>"
//         },
//         "LCCommitteeMachineList": {
//           "booked_machine": "Vec<MachineId>",
//           "hashed_machine": "Vec<MachineId>",
//           "confirmed_machine": "Vec<MachineId>",
//           "online_machine": "Vec<MachineId>"
//         },
//         "LCCommitteeOps": {
//           "booked_time": "BlockNumber",
//           "stake_dbc": "Balance",
//           "verify_time": "Vec<BlockNumber>",
//           "confirm_hash": "[u8; 16]",
//           "hash_time": "BlockNumber",
//           "confirm_time": "BlockNumber",
//           "machine_status": "LCMachineStatus",
//           "machine_info": "CommitteeUploadInfo1"
//         },
//         "LCMachineStatus": {
//           "_enum": [
//             "Booked",
//             "Hashed",
//             "Confirmed"
//           ]
//         },
//         "CommitteeUploadInfo1": {
//           "machine_id": "MachineId",
//           "gpu_type": "Vec<u8>",
//           "gpu_num": "u32",
//           "cuda_core": "u32",
//           "gpu_mem": "u64",
//           "calc_point": "u64",
//           "hard_disk": "u64",
//           "cpu_type": "Vec<u8>",
//           "cpu_core_num": "u32",
//           "cpu_rate": "u64",
//           "mem_num": "u64",
//           "rand_str": "Vec<u8>",
//           "is_support": "bool"
//         },
//         "LCMachineCommitteeList": {
//           "book_time": "BlockNumber",
//           "booked_committee": "Vec<AccountId>",
//           "hashed_committee": "Vec<AccountId>",
//           "confirm_start": "BlockNumber",
//           "confirmed_committee": "Vec<AccountId>",
//           "onlined_committee": "Vec<AccountId>"
//         },
//         "CommitteeMachineList": {
//           "booked_order": "Vec<OrderId>",
//           "hashed_order": "Vec<OrderId>",
//           "confirmed_order": "Vec<Order>",
//           "online_machine": "Vec<MachineId>"
//         },
//         "CommitteeMachineOps": {
//           "booked_time": "BlockNumber",
//           "encrypted_err_info": "Option<Vec<u8>>",
//           "encrypted_login_info": "Option<Vec<u8>>",
//           "encrypted_time": "BlockNumber",
//           "confirm_hash": "Hash",
//           "hash_time": "BlockNumber",
//           "confirm_raw": "Vec<u8>",
//           "confirm_time": "BlockNumber",
//           "confirm_result": "bool",
//           "machine_status": "MachineStatus"
//         },
//         "EraRewardBalance": {
//           "total": "Balance",
//           "individual": "BTreeMap<AccountId, Balance>"
//         },
//         "LiveOrderList": {
//           "reported_order": "Vec<OrderId>",
//           "fully_order": "Vec<OrderId>",
//           "fully_reporter_hashed": "Vec<OrderId>",
//           "fully_committee_hashed": "Vec<OrderId>",
//           "fully_raw": "Vec<OrderId>"
//         },
//         "MachineCommitteeList": {
//           "order_id": "OrderId",
//           "report_time": "BlockNumber",
//           "booked_committee": "Vec<AccountId>",
//           "hashed_committee": "Vec<AccountId>",
//           "confirm_start": "BlockNumber",
//           "confirmed_committee": "Vec<AccountId>",
//           "onlined_committee": "Vec<AccountId>"
//         },
//         "Pubkey": "Vec<u8>",
//         "ReporterRecord": {
//           "reported_id": "Vec<OrderId>"
//         },
//         "StakerList": {
//           "committee": "Vec<AccountId>",
//           "pubkey_list": "Vec<AccountId>",
//           "fulfill_list": "Vec<AccountId>",
//           "chill_list": "Vec<AccountId>",
//           "black_list": "Vec<AccountId>"
//         },
//         "TestMachineInfo": {
//           "machine_owner": "AccountId",
//           "bonding_height": "BlockNumber",
//           "machine_grade": "u64",
//           "machine_price": "u64",
//           "reward_deadline": "BlockNumber"
//         },
//         "MTCommitteeList": {
//           "committee": "Vec<AccountId>",
//           "waiting_box_pubkey": "Vec<AccountId>"
//         },
//         "MTCommitteeOpsDetail": {
//           "booked_time": "BlockNumber",
//           "encrypted_err_info": "Option<Vec<u8>>",
//           "encrypted_time": "BlockNumber",
//           "confirm_hash": "Hash",
//           "hash_time": "BlockNumber",
//           "confirm_raw": "Vec<u8>",
//           "confirm_time": "BlockNumber",
//           "confirm_result": "bool",
//           "staked_balance": "Balance",
//           "order_status": "MTOrderStatus"
//         },
//         "MTOrderStatus": {
//           "_enum": [
//             "WaitingEncrypt",
//             "Verifying",
//             "WaitingRaw",
//             "Finished"
//           ]
//         },
//         "MTCommitteeOrderList": {
//           "booked_order": "Vec<ReportId>",
//           "hashed_order": "Vec<ReportId>",
//           "confirmed_order": "Vec<ReportId>",
//           "online_machine": "Vec<MachineId>"
//         },
//         "MTLiveReportList": {
//           "bookable_report": "Vec<ReportId>",
//           "verifying_report": "Vec<ReportId>",
//           "waiting_raw_report": "Vec<ReportId>",
//           "waiting_rechecked_report": "Vec<ReportId>"
//         },
//         "MTReportInfoDetail": {
//           "reporter": "AccountId",
//           "report_time": "BlockNumber",
//           "raw_hash": "Hash",
//           "box_public_key": "[u8; 32]",
//           "reporter_stake": "Balance",
//           "first_book_time": "BlockNumber",
//           "machine_id": "MachineId",
//           "err_info": "Vec<u8>",
//           "verifying_committee": "Option<AccountId>",
//           "booked_committee": "Vec<AccountId>",
//           "get_encrypted_info_committee": "Vec<AccountId>",
//           "hashed_committee": "Vec<AccountId>",
//           "confirm_start": "BlockNumber",
//           "confirmed_committee": "Vec<AccountId>",
//           "support_committee": "Vec<AccountId>",
//           "against_committee": "Vec<AccountId>",
//           "report_status": "ReportStatus",
//           "report_type": "ReportType"
//         },
//         "ReportStatus": {
//           "_enum": [
//             "Reported",
//             "WaitingBook",
//             "Verifying",
//             "SubmitingRaw",
//             "CommitteeConfirmed"
//           ]
//         },
//         "ReportType": {
//           "_enum": [
//             "HardwareFault",
//             "MachineOffline",
//             "MachineUnrentable"
//           ]
//         },
//         "PendingSlashInfo": {
//           "slash_who": "AccountId",
//           "slash_time": "BlockNumber",
//           "unlock_amount": "Balance",
//           "slash_amount": "Balance",
//           "slash_exec_time": "BlockNumber",
//           "reward_to": "Vec<AccountId>"
//         },
//         "RentOrderDetail": {
//           "renter": "AccountId",
//           "rent_start": "BlockNumber",
//           "confirm_rent": "BlockNumber",
//           "rent_end": "BlockNumber",
//           "stake_amount": "Balance"
//         }
//       }
//     })
//   }
//   const now = await api1?.query.timestamp.now();
//   let { nonce, data: balance} = await api1?.query.system.account('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')
//   console.log( balance.toHuman() , `${now}: balance of ${balance.free} and a nonce of ${nonce}` , nonce, now);
// }
// GetApi();


import { StartGrabbing, getAccount, getOrder } from './api'
// getOrder()
// getAccount('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY');
// let Kpair = getKeypair('123456789')
// console.log(Kpair, 'Kpair');
// StartGrabbing(Kpair.publicKey)
// commite()
