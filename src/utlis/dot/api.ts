import { ApiPromise, WsProvider } from '@polkadot/api'
import { cryptoWaitReady, blake2AsHex, randomAsU8a } from '@polkadot/util-crypto'
import { isHex,stringToU8a, u8aToHex, hexToU8a } from '@polkadot/util';
import { getCurrentPair } from './index' // 获取kerPair

const node = {
  polkadot: 'wss://rpc.polkadot.io',
  dbc: 'wss://innertest2.dbcwallet.io'
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
        "ReportHash": "[u8; 16]",
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
          "refused_machine": "Vec<MachineId>",
          "rented_machine": "Vec<MachineId>",
          "offline_machine": "Vec<MachineId>"
        },
        "StashMachine": {
          "total_machine": "Vec<MachineId>",
          "online_machine": "Vec<MachineId>",
          "total_calc_points": "u64",
          "total_gpu_num": "u64",
          "total_rented_gpu": "u64",
          "total_claimed_reward": "Balance",
          "can_claim_reward": "Balance",
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
          "machine_stash": "AccountId",
          "last_machine_renter": "Option<AccountId>",
          "last_machine_restake": "BlockNumber",
          "bonding_height": "BlockNumber",
          "online_height": "BlockNumber",
          "last_online_height": "BlockNumber",
          "init_stake_amount": "Balance",
          "current_stake_amount": "Balance",
          "machine_status": "MachineStatus",
          "total_rented_duration": "u64",
          "total_rented_times": "u64",
          "total_rent_fee": "Balance",
          "total_burn_fee": "Balance",
          "machine_info_detail": "MachineInfoDetail",
          "reward_committee": "Vec<AccountId>",
          "reward_deadline": "EraIndex"
        },
        "MachineStatus": {
          "_enum": {
            "AddingCustomizeInfo": null,
            "DistributingOrder": null,
            "CommitteeVerifying": null,
            "CommitteeRefused": "BlockNumber",
            "WaitingFulfill": null,
            "Online": null,
            "StakerReportOffline": "(BlockNumber, Box<MachineStatus>)",
            "ReporterReportOffline": "(BlockNumber, Box<MachineStatus>)",
            "Creating": null,
            "Rented": null
          }
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
          "server_room": "H256",
          "upload_net": "u64",
          "download_net": "u64",
          "longitude": "Longitude",
          "latitude": "Latitude",
          "telecom_operators": "Vec<TelecomName>"
        },
        "Longitude": {
          "_enum": {
            "East": "u64",
            "West": "u64"
          }
        },
        "Latitude": {
          "_enum": {
            "North": "u64",
            "South": "u64"
          }
        },
        "TelecomName": "Text",
        "AccountInfo": {
          "nonce": "u32",
          "consumers": "u32",
          "providers": "u32",
          "data": "AccountData"
        },
        "EraStashPoints": {
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
          "is_rented": "bool",
          "reward_account": "Vec<AccountId>"
        },
        "StashMachineStatistics": {
          "online_gpu_num": "u64",
          "inflation": "Perbill",
          "machine_total_calc_point": "u64",
          "rent_extra_grade": "u64"
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
          "waiting_box_pubkey": "Vec<AccountId>",
          "fulfilling_list": "Vec<AccountId>"
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
          "confirm_hash": "[u8; 16]",
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
          "confirm_hash": "[u8; 16]",
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
        "MTCommitteeOpsDetail": {
          "booked_time": "BlockNumber",
          "encrypted_err_info": "Option<Vec<u8>>",
          "encrypted_time": "BlockNumber",
          "confirm_hash": "ReportHash",
          "hash_time": "BlockNumber",
          "extra_err_info": "Vec<u8>",
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
          "_enum": {
            "HardwareFault": "(ReportHash, BoxPubkey)",
            "MachineOffline": "(ReportHash, BoxPubkey)",
            "MachineUnrentable": "MachineId"
          }
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
          "stake_amount": "Balance",
          "rent_status": "RentStatus"
        },
        "RentStatus": {
          "_enum": [
            "WaitingVerifying",
            "Renting",
            "RentExpired"
          ]
        },
        "CommitteeStakeParamsInfo": {
          "stake_baseline": "Balance",
          "stake_per_order": "Balance",
          "min_free_stake_percent": "Perbill"
        },
        "CommitteeStakeInfo": {
          "box_pubkey": "[u8; 32]",
          "staked_amount": "Balance",
          "used_stake": "Balance",
          "can_claim_reward": "Balance",
          "claimed_reward": "Balance"
        },
        "ReporterStakeParamsInfo": {
          "stake_baseline": "Balance",
          "stake_per_report": "Balance",
          "min_free_stake_percent": "Perbill"
        },
        "ReporterStakeInfo": {
          "box_pubkey": "[u8; 32]",
          "staked_amount": "Balance",
          "used_stake": "Balance",
          "can_claim_reward": "Balance",
          "claimed_reward": "Balance"
        }
      }
    })
  }
  return { api }
}

/**
 * transfer 测试交易
 * @return callback 回调函数，返回结果信息
 */
 export const transfer = async (dest: any, value: any,  passward: string, callback: (data: Object) => void) => {
  await GetApi();
  let kering = await getCurrentPair()
  
  await cryptoWaitReady();
  await api?.tx.balances
  .transfer( dest, value )
  .signAndSend( kering! , ( { events = [], status , dispatchError  } ) => {
    let data = {
      msg:'',
      success: false
    };
  })
  .catch((res)=>{
    let data1 = {
      msg: res.message,
      success: false
    };
    callback(data1)
  })
}

// transfer('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', 1, '123456789' , (res)=>{
//   console.log(res, 'transfer');
// })
// 定义信息返回
let CallBack_data = {
  msg:'',
  success: false
}
/**
 * getBlockTime 查询链上时间
 * 
 * @return time:链上时间块
 */
 
export const getBlockTime = async (): Promise<any> => {
  await GetApi();
  let de = await api?.rpc.chain.getBlock()
  return de?.block.header.number.toHuman()
}

/**
 * getCommitteeList 查询是否为理事会成员
 * 
 * @return list: boolen 理事会成员列表
 */

export const getCommitteeList = async (wallet: string): Promise<any> => {
  await GetApi();
  let de = await api?.query.committee.committee()
  let list  = de?.normal.toHuman().indexOf(wallet) > -1? true : false
  return list
}



/**
 * ConfirmHash 派单 提交hash信息 
 * @param  ConfirmHash(machine_id, hash)  passward: string 密码（可从vuex中获取）
 * @return callback 回调函数，返回结果信息
 */
 export const ConfirmHash = async (permas: any,  passward: string, callback: (data: Object) => void) => {
  let { machine_id, gpu_type, gpu_num, cuda_core, gpu_mem, calc_point, sys_disk, data_disk, cpu_type, cpu_core_num, cpu_rate, mem_num, rand_str, is_support } = permas
  let raw_input = blake2AsHex(
    machine_id
    + gpu_type
    + gpu_num
    + cuda_core
    + gpu_mem
    + calc_point
    + sys_disk
    + data_disk
    + cpu_type
    + cpu_core_num
    + cpu_rate
    + mem_num
    + rand_str
    + is_support
    , 128)
  await GetApi();
  let kering = await getCurrentPair()
  try {
    await kering!.unlock(passward)
  } catch (e: any) {
    CallBack_data = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data)
    return;
  }
  await cryptoWaitReady();
  await api?.tx.leaseCommittee
  .submitConfirmHash( machine_id, raw_input)
  .signAndSend( kering! , ( { events = [], status } ) => {
    if (status.isFinalized) {
      events.forEach(({ event: { method, data: [error] } }) => {
        if (error.isModule && method == 'ExtrinsicFailed') {
          const decoded = api?.registry.findMetaError(error.asModule);
          CallBack_data.msg = decoded!.method;
          CallBack_data.success = false
        }else if(method == 'ExtrinsicSuccess'){
          CallBack_data.msg = method;
          CallBack_data.success = true
        }
      });
      if (callback) {
        callback(CallBack_data)
      }
    }
  })
  .catch((res)=>{
    CallBack_data = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data)
  })
}

/**
 * ConfirmRaw 派单 提交原始信息
 * @param permas => machine_info_detail
 * @return callback 回调函数，返回结果信息
 */
export const ConfirmRaw = async (permas: any, passward: string, callback: (arr: Object) => void) => {
  let { machine_id, gpu_type, gpu_num, cuda_core, gpu_mem, calc_point, sys_disk, data_disk, cpu_type, cpu_core_num, cpu_rate, mem_num, rand_str, is_support } = permas
  let machine_info_detail = {
    machine_id, 
    gpu_type: u8aToHex(stringToU8a(gpu_type)), 
    gpu_num, 
    cuda_core, 
    gpu_mem, 
    calc_point, 
    sys_disk, 
    data_disk, 
    cpu_type: u8aToHex(stringToU8a(cpu_type)), 
    cpu_core_num, 
    cpu_rate,
    mem_num, 
    rand_str, 
    is_support
  }
  await GetApi();
  let kering = await getCurrentPair()
  try {
    await kering!.unlock(passward)
  } catch (e: any) {
    CallBack_data = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data)
    return;
  }
  await cryptoWaitReady()
  await api?.tx.leaseCommittee
  .submitConfirmRaw( machine_info_detail )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    if (status.isFinalized) {
      events.forEach(({ event: { method, data: [error] } }) => {
        if (error.isModule && method == 'ExtrinsicFailed') {
          const decoded = api?.registry.findMetaError(error.asModule);
          CallBack_data.msg = decoded!.method;
          CallBack_data.success = false
        }else if(method == 'ExtrinsicSuccess'){
          CallBack_data.msg = method;
          CallBack_data.success = true
        }
      });
      if (callback) {
        callback(CallBack_data)
      }
    }
  })
  .catch((res)=>{
    CallBack_data = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data)
  })
}

/**
 * getOrder 获取链上抢单列表
 * 
 * @return [] 抢单列表
 */
 
export const getOrder = async (): Promise<any> => {
  await GetApi();
  let de = await api?.query.maintainCommittee.liveReport()
  return de?.toHuman()
}

export const reportInfo = async (ReportId: string): Promise<any> => {
  await GetApi();
  let de = await api?.query.maintainCommittee.reportInfo(ReportId)
  return de?.toHuman()
}

/**
 * committeeSetBoxPubkey 开始抢单
 * @param publicKey: Uint8Array 公钥
 * @return [] 抢单列表
 */
export const StartGrabbing = async (publicKey: Uint8Array): Promise<any> => {
  await GetApi();
  let de = await api?.tx.committee.committeeSetBoxPubkey(publicKey)
  return de?.toHuman()
}
/**
 * bookFaultOrder 开始抢单
 * @param reportid: number 订单号
 * @return [] 抢单列表
 * 
 */
export const bookFaultOrder = async (reportid: number, passward:string, callback: (data: Object) => void) => {
  await GetApi();
  let kering = await getCurrentPair()
  try {
    await kering!.unlock(passward)
  } catch (e: any) {
    CallBack_data = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data)
    return;
  }
  await cryptoWaitReady()
  await api?.tx.maintainCommittee
  .bookFaultOrder(reportid)
  .signAndSend( kering! , ( { events = [], status  } ) => {
    if (status.isFinalized) {
      events.forEach(({ event: { method, data: [error] } }) => {
        if (error.isModule && method == 'ExtrinsicFailed') {
          const decoded = api?.registry.findMetaError(error.asModule);
          CallBack_data.msg = decoded!.method;
          CallBack_data.success = false
        }else if(method == 'ExtrinsicSuccess'){
          CallBack_data.msg = method;
          CallBack_data.success = true
        }
      });
      if (callback) {
        callback(CallBack_data)
      }
    }
  })
  .catch((res)=>{
    CallBack_data = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data)
  })
}

/**
 * committeeOrder 查询我的抢单列表
 * @param (AccountId)
 */
 export const committeeOrder = async (AccountId: string):Promise<any> => {
  await GetApi();
  let de = await api?.query.maintainCommittee.committeeOrder(AccountId)
  return de?.toHuman()
}

/**
 * committeeOps 查询抢单机器详细信息
 * @param (AccountId, ReportId)
 */
export const committeeOps = async (AccountId: number, ReportId:number):Promise<any> => {
  await GetApi();
  let de = await api?.query.maintainCommittee.committeeOps(AccountId, ReportId)
  return de?.toHuman()
}




/**
 * StartGrabbing 抢单 提交hash信息
 * @param  submitConfirmHash(report_id, hash)  passward: string 密码（可从vuex中获取）
 * @return callback 回调函数，返回数组信息
 */
export const submitConfirmHash = async ( permas: any,  passward: string, callback: (data: Object) => void) => {
  let { report_id, machine_id, reporter_rand_str, committee_rand_str, err_reason, support_report } = permas
  let raw_input = blake2AsHex(
    report_id
    + machine_id
    + reporter_rand_str
    + committee_rand_str
    + err_reason
    + support_report
    , 256)
  await GetApi();
  let kering = await getCurrentPair()
  try {
    await kering!.unlock(passward)
  } catch (e: any) {
    CallBack_data = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data)
    return;
  }
  await cryptoWaitReady();
  console.log(report_id, raw_input, 'raw_input');
  await api?.tx.maintainCommittee
  .submitConfirmHash( report_id, raw_input )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    if (status.isFinalized) {
      events.forEach(({ event: { method, data: [error] }}) => {
        if (error.isModule && method == 'ExtrinsicFailed') {
          const decoded = api?.registry.findMetaError(error.asModule);
          CallBack_data.msg = decoded!.method;
          CallBack_data.success = false
        }else if(method == 'ExtrinsicSuccess'){
          CallBack_data.msg = method;
          CallBack_data.success = true
        }
      });
      if (callback) {
        callback(CallBack_data)
      }
    }
  })
  .catch((res)=>{
    CallBack_data = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data)
  })
}


/**
 * StartGrabbing 抢单 提交原始信息
 * @param permas
 * @return callback 回调函数，返回数组信息
 */
export const submitConfirmRaw = async ( permas: any, passward: string, callback: (data: Object) => void) => {
  let { report_id, machine_id, reporter_rand_str, committee_rand_str, err_reason, support_report } = permas
  await GetApi();
  let kering = await getCurrentPair()
  try {
    await kering!.unlock(passward)
  } catch (e: any) {
    CallBack_data = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data)
    return;
  }
  await cryptoWaitReady();
  await api?.tx.maintainCommittee
  .submitConfirmRaw(report_id, machine_id, reporter_rand_str, committee_rand_str, err_reason, support_report )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    if (status.isFinalized) {
      events.forEach(({ event: { method, data: [error] }}) => {
        if (error.isModule && method == 'ExtrinsicFailed') {
          const decoded = api?.registry.findMetaError(error.asModule);
          CallBack_data.msg = decoded!.method;
          CallBack_data.success = false
        }else if(method == 'ExtrinsicSuccess'){
          CallBack_data.msg = method;
          CallBack_data.success = true
        }
      });
      if (callback) {
        callback(CallBack_data)
      }
    }
  })
  .catch((res)=>{
    CallBack_data = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data)
  })
}
