import { ApiPromise, WsProvider } from '@polkadot/api'
import {cryptoWaitReady, blake2AsHex} from '@polkadot/util-crypto'
import { getCurrentPair } from './index' // 获取kerPair


const node = {
  polkadot: 'wss://rpc.polkadot.io',
  dbc: 'wss://innertest.dbcwallet.io'
}
let api: ApiPromise | null = null

declare interface Network {
  api: ApiPromise,
}
// 链上交互
export const GetApi = async (): Promise<Network> =>{
  if (!api) {
    const provider = new WsProvider(node.dbc)
    api = await ApiPromise.create({ 
      provider ,
      types: {
        "PriceURL": "Text",
        "ReportId": "u64",
        "SlashId": "u64",
        "BoxPubkey": "[u8; 32]",
        "StandardGpuPointPrice": {
          "gpu_point": "u64",
          "gpu_price": "u64"
        },
        "URL": "Text",
        "MachineId": "Text",
        "OrderId": "u64",
        "LiveMachine": {
          "bonding_machine": "Vec<MachineId>",
          "confirmed_machine": "Vec<MachineId>",
          "booked_machine": "Vec<MachineId>",
          "online_machine": "Vec<MachineId>",
          "fulfilling_machine": "Vec<MachineId>",
          "refused_machine": "Vec<MachineId>"
        },
        "StashMachine": {
          "total_machine": "Vec<MachineId>",
          "online_machine": "Vec<MachineId>",
          "total_calc_points": "u64",
          "total_gpu_num": "u64",
          "total_rented_gpu": "u64",
          "total_claimed_reward": "Balance",
          "can_claim_reward": "Balance",
          "left_reward": "Vec<Balance>",
          "total_rent_fee": "Balance",
          "total_burn_fee": "Balance"
        },
        "BlockNumber": "u32",
        "SysInfoDetail": {
          "total_gpu_num": "u64",
          "total_rented_gpu": "u64",
          "total_staker": "u64",
          "total_calc_points": "u64",
          "total_stake": "Balance",
          "total_rent_fee": "Balance",
          "total_burn_fee": "Balance"
        },
        "MachineInfo": {
          "controller": "AccountId",
          "machine_owner": "AccountId",
          "machine_renter": "Option<AccountId>",
          "bonding_height": "BlockNumber",
          "stake_amount": "Balance",
          "machine_status": "MachineStatus",
          "total_rented_duration": "u64",
          "total_rented_times": "u64",
          "total_rent_fee": "Balance",
          "total_burn_fee": "Balance",
          "machine_info_detail": "MachineInfoDetail",
          "reward_committee": "Vec<AccountId>",
          "reward_deadline": "BlockNumber"
        },
        "MachineStatus": {
          "_enum": [
            "AddingCustomizeInfo",
            "CommitteeVerifying",
            "CommitteeRefused",
            "WaitingFulfill",
            "Online",
            "StakerReportOffline(BlockNumber)",
            "ReporterReportOffline(BlockNumber",
            "Creating",
            "Rented"
          ]
        },
        "MachineInfoDetail": {
          "committee_upload_info": "CommitteeUploadInfo",
          "staker_customize_info": "StakerCustomizeInfo"
        },
        "CommitteeUploadInfo": {
          "machine_id": "MachineId",
          "gpu_type": "Vec<u8>",
          "gpu_num": "u32",
          "cuda_core": "u32",
          "gpu_mem": "u64",
          "calc_point": "u64",
          "sys_disk": "u64",
          "data_disk": "u64",
          "cpu_type": "Vec<u8>",
          "cpu_core_num": "u32",
          "cpu_rate": "u64",
          "mem_num": "u64",
          "rand_str": "Vec<u8>",
          "is_support": "bool"
        },
        "StakerCustomizeInfo": {
          "upload_net": "u64",
          "download_net": "u64",
          "longitude": "i64",
          "latitude": "i64",
          "telecom_operators": "Vec<TelecomName>",
          "images": "Vec<ImageName>"
        },
        "ImageName": "Text",
        "TelecomName": "Text",
        "CPU": {
          "num": "Vec<u8>",
          "type": "Vec<u8>"
        },
        "Disk": {},
        "GPU": {
          "num": "Vec<u8>",
          "gpus": "Vec<GPUDetail>"
        },
        "GPUDetail": {
          "grade": "Vec<u8>"
        },
        "AccountInfo": {
          "nonce": "u32",
          "consumers": "u32",
          "providers": "u32",
          "data": "AccountData"
        },
        "EraMachinePoints": {
          "total": "u64",
          "staker_statistic": "BTreeMap<AccountId, StashMachineStatistics>"
        },
        "PosInfo": {
          "online_gpu": "u64",
          "offline_gpu": "u64",
          "rented_gpu": "u64",
          "online_gpu_calc_points": "u64"
        },
        "MachineGradeStatus": {
          "basic_grade": "u64",
          "is_online": "bool"
        },
        "StashMachineStatistics": {
          "online_gpu_num": "u64",
          "inflation": "Perbill",
          "machine_total_calc_point": "u64",
          "rent_extra_grade": "u64",
          "individual_machine": "BTreeMap<MachineId, MachineGradeStatus>"
        },
        "CommitteeMachine": {
          "machine_id": "Vec<MachineId>",
          "total_calc_points": "u64",
          "total_gpu_num": "u64",
          "total_reward": "Balance"
        },
        "CommitteeList": {
          "normal": "Vec<AccountId>",
          "chill_list": "Vec<AccountId>",
          "waiting_box_pubkey": "Vec<AccountId>"
        },
        "LCCommitteeMachineList": {
          "booked_machine": "Vec<MachineId>",
          "hashed_machine": "Vec<MachineId>",
          "confirmed_machine": "Vec<MachineId>",
          "online_machine": "Vec<MachineId>"
        },
        "LCCommitteeOps": {
          "staked_dbc": "Balance",
          "verify_time": "Vec<BlockNumber>",
          "confirm_hash": "Hash",
          "hash_time": "BlockNumber",
          "confirm_time": "BlockNumber",
          "machine_status": "LCMachineStatus",
          "machine_info": "CommitteeUploadInfo"
        },
        "LCMachineStatus": {
          "_enum": [
            "Booked",
            "Hashed",
            "Confirmed"
          ]
        },
        "LCMachineCommitteeList": {
          "book_time": "BlockNumber",
          "booked_committee": "Vec<AccountId>",
          "hashed_committee": "Vec<AccountId>",
          "confirm_start_time": "BlockNumber",
          "confirmed_committee": "Vec<AccountId>",
          "onlined_committee": "Vec<AccountId>",
          "status": "LCVerifyStatus"
        },
        "LCVerifyStatus": {
          "_enum": [
            "SubmittingHash",
            "SubmittingRaw",
            "Summarizing",
            "Finished"
          ]
        },
        "CommitteeMachineList": {
          "booked_order": "Vec<OrderId>",
          "hashed_order": "Vec<OrderId>",
          "confirmed_order": "Vec<Order>",
          "online_machine": "Vec<MachineId>"
        },
        "CommitteeMachineOps": {
          "booked_time": "BlockNumber",
          "encrypted_err_info": "Option<Vec<u8>>",
          "encrypted_login_info": "Option<Vec<u8>>",
          "encrypted_time": "BlockNumber",
          "confirm_hash": "Hash",
          "hash_time": "BlockNumber",
          "confirm_raw": "Vec<u8>",
          "confirm_time": "BlockNumber",
          "confirm_result": "bool",
          "machine_status": "MachineStatus"
        },
        "EraRewardBalance": {
          "total": "Balance",
          "individual": "BTreeMap<AccountId, Balance>"
        },
        "LiveOrderList": {
          "reported_order": "Vec<OrderId>",
          "fully_order": "Vec<OrderId>",
          "fully_reporter_hashed": "Vec<OrderId>",
          "fully_committee_hashed": "Vec<OrderId>",
          "fully_raw": "Vec<OrderId>"
        },
        "MachineCommitteeList": {
          "order_id": "OrderId",
          "report_time": "BlockNumber",
          "booked_committee": "Vec<AccountId>",
          "hashed_committee": "Vec<AccountId>",
          "confirm_start": "BlockNumber",
          "confirmed_committee": "Vec<AccountId>",
          "onlined_committee": "Vec<AccountId>"
        },
        "Pubkey": "Vec<u8>",
        "ReporterRecord": {
          "reported_id": "Vec<OrderId>"
        },
        "StakerList": {
          "committee": "Vec<AccountId>",
          "pubkey_list": "Vec<AccountId>",
          "fulfill_list": "Vec<AccountId>",
          "chill_list": "Vec<AccountId>",
          "black_list": "Vec<AccountId>"
        },
        "TestMachineInfo": {
          "machine_owner": "AccountId",
          "bonding_height": "BlockNumber",
          "machine_grade": "u64",
          "machine_price": "u64",
          "reward_deadline": "BlockNumber"
        },
        "MTCommitteeOpsDetail": {
          "booked_time": "BlockNumber",
          "encrypted_err_info": "Option<Vec<u8>>",
          "encrypted_time": "BlockNumber",
          "confirm_hash": "Hash",
          "hash_time": "BlockNumber",
          "confirm_raw": "Vec<u8>",
          "confirm_time": "BlockNumber",
          "confirm_result": "bool",
          "staked_balance": "Balance",
          "order_status": "MTOrderStatus"
        },
        "MTOrderStatus": {
          "_enum": [
            "WaitingEncrypt",
            "Verifying",
            "WaitingRaw",
            "Finished"
          ]
        },
        "MTCommitteeReportList": {
          "booked_report": "Vec<ReportId>",
          "hashed_report": "Vec<ReportId>",
          "confirmed_report": "Vec<ReportId>",
          "online_machine": "Vec<MachineId>"
        },
        "MTLiveReportList": {
          "bookable_report": "Vec<ReportId>",
          "verifying_report": "Vec<ReportId>",
          "waiting_raw_report": "Vec<ReportId>",
          "waiting_rechecked_report": "Vec<ReportId>"
        },
        "MTReportInfoDetail": {
          "reporter": "AccountId",
          "report_time": "BlockNumber",
          "raw_hash": "Hash",
          "box_public_key": "BoxPubkey",
          "reporter_stake": "Balance",
          "first_book_time": "BlockNumber",
          "machine_id": "MachineId",
          "err_info": "Vec<u8>",
          "verifying_committee": "Option<AccountId>",
          "booked_committee": "Vec<AccountId>",
          "get_encrypted_info_committee": "Vec<AccountId>",
          "hashed_committee": "Vec<AccountId>",
          "confirm_start": "BlockNumber",
          "confirmed_committee": "Vec<AccountId>",
          "support_committee": "Vec<AccountId>",
          "against_committee": "Vec<AccountId>",
          "report_status": "ReportStatus",
          "machine_fault_type": "MachineFaultType"
        },
        "ReportStatus": {
          "_enum": [
            "Reported",
            "WaitingBook",
            "Verifying",
            "SubmittingRaw",
            "CommitteeConfirmed"
          ]
        },
        "MachineFaultType": {
          "_enum": [
            "HardwareFault(Hash, BoxPubkey)",
            "MachineOffline(Hash, BoxPubkey)",
            "MachineUnrentable(MachineId)"
          ]
        },
        "PendingSlashInfo": {
          "slash_who": "AccountId",
          "slash_time": "BlockNumber",
          "unlock_amount": "Balance",
          "slash_amount": "Balance",
          "slash_exec_time": "BlockNumber",
          "reward_to": "Vec<AccountId>"
        },
        "RentOrderDetail": {
          "renter": "AccountId",
          "rent_start": "BlockNumber",
          "confirm_rent": "BlockNumber",
          "rent_end": "BlockNumber",
          "stake_amount": "Balance"
        }
      }
    })
  }
  return { api }
}

/**
 * getAccount 获取用户信息
 * toHuman() 转义成可读字符串
 * 
 * @param address 
 */
export const getAccount = async (address: string) => {
  await GetApi();
  const now = await api!?.query.timestamp.now();
  let { nonce, data: balance} = await api!?.query.system.account(address)
  // console.log( balance.toHuman() , `${now}: balance of ${balance.free} and a nonce of ${nonce}` , nonce, now);
}


/**
 * getOrder 获取链上抢单列表
 * 
 * @return [] 抢单列表
 */
 
export const getOrder = async (): Promise<any> => {
  await GetApi();
  let de = await api?.query.maintainCommittee.liveReport()
  return de
}

/**
 * StartGrabbing 开始抢单
 * @param publicKey: Uint8Array 公钥
 * @return [] 抢单列表
 */
export const StartGrabbing = async (publicKey: Uint8Array) => {
  await GetApi();
  let de = await api?.tx.committee.committeeSetBoxPubkey(publicKey)
}
/**
 * StartGrabbing 开始抢单
 * @param reportid: number 订单号
 * @return [] 抢单列表
 */
export const bookFaultOrder = async (reportid: number) => {
  await GetApi();
  let de = await api?.tx.committee.bookFaultOrder(reportid)
  return de
}

/**
 * StartGrabbing 查询加密信息
 * @param (AccountId, ReportId)
 * @return [] 抢单列表
 */
export const committeeOps = async (AccountId: number, ReportId:number):Promise<any> => {
  await GetApi();
  let de = await api?.query.maintainCommittee.committeeOps(AccountId, ReportId)
  return de?.toHuman()
}




/**
 * StartGrabbing 提交hash信息
 * @param  submitConfirmHash(report_id, hash)  passward: string 密码（可从vuex中获取）
 * @return callback 回调函数，返回数组信息
 */
export const submitConfirmHash = async (report_id: number, permas: any,  passward: string, callback: (arr: Array<string>) => void) => {
  let str='';
  for(var i in permas){
    str += permas[i]
  }
  console.log(blake2AsHex(str), 'blake2AsHex(str)');
  await GetApi();
  let kering = await getCurrentPair()
  await kering!.unlock(passward)
  await cryptoWaitReady();
  await api?.tx.maintainCommittee
  .submitConfirmHash( report_id, blake2AsHex(str) )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    let methods: Array<string> = []
    if (status.isFinalized) {
      events.forEach(({ event: { method }, phase }) => {
        methods.push(method)
      });
      if (callback) {
        console.log('callback');
        callback(methods)
      }
    }
  })
  .then((res)=>{
    console.log(res, 'then');
  })
  .catch((res)=>{
    callback(['error'])
  })
}


/**
 * StartGrabbing 提交原始信息
 * @param report_id
 * @param machine_id  
 * @param reporter_rand_str
 * @param committee_rand_str
 * @param err_reason
 * @param support_report
 * @return callback 回调函数，返回数组信息
 */
export const submitConfirmRaw = async (report_id:number, permas: object, passward: string, callback?: (arr: Array<string>) => void) => {
  await GetApi();
  let kering = await getCurrentPair()
  await kering!.unlock(passward)
  await cryptoWaitReady();
  await api?.tx.maintainCommittee
  .submitConfirmRaw(report_id, permas )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    let methods: Array<string> = []
    if (status.isFinalized) {
      events.forEach(({ event: { method }, phase }) => {
        methods.push(method)
      });
      if (callback) {
        console.log('callback');
        callback(methods)
      }
    }
  })
}
