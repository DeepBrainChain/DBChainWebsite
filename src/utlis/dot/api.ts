import { ApiPromise, WsProvider } from '@polkadot/api'
import { cryptoWaitReady, blake2AsHex, randomAsU8a } from '@polkadot/util-crypto'
import { formatBalance, BN_TEN, isHex, stringToU8a, u8aToHex, hexToU8a, stringToHex } from '@polkadot/util';
import { getCurrentPair } from './index' // 获取kerPair
import BN from 'bn.js'
import { initNetwork } from './index'


const node = {
  polkadot: 'wss://rpc.polkadot.io',
  // dbc: 'wss://innertest2.dbcwallet.io' // 测试网
  dbc: 'wss://preinfo.dbcwallet.io' // 银河竞赛预主网
  //dbc: 'wss://info.dbcwallet.io' // 主网
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
        "Pubkey": "Vec<u8>",
        "ReportId": "u64",
        "SlashId": "u64",
        "BoxPubkey": "[u8; 32]",
        "ReportHash": "[u8; 16]",
        "URL": "Text",
        "MachineId": "Text",
        "OrderId": "u64",
        "TelecomName": "Text",
        "StandardGpuPointPrice": {
          "gpu_point": "u64",
          "gpu_price": "u64"
        },
        "LiveMachine": {
          "bonding_machine": "Vec<MachineId>",
          "confirmed_machine": "Vec<MachineId>",
          "booked_machine": "Vec<MachineId>",
          "online_machine": "Vec<MachineId>",
          "fulfilling_machine": "Vec<MachineId>",
          "refused_machine": "Vec<MachineId>",
          "rented_machine": "Vec<MachineId>",
          "offline_machine": "Vec<MachineId>",
          "refused_mut_hardware_machine": "Vec<MachineId>"
        },
        "StashMachine": {
          "total_machine": "Vec<MachineId>",
          "online_machine": "Vec<MachineId>",
          "total_calc_points": "u64",
          "total_gpu_num": "u64",
          "total_rented_gpu": "u64",
          "total_earned_reward": "Balance",
          "total_claimed_reward": "Balance",
          "can_claim_reward": "Balance",
          "total_rent_fee": "Balance",
          "total_burn_fee": "Balance"
        },
        "SysInfoDetail": {
          "total_gpu_num": "u64",
          "total_rented_gpu": "u64",
          "total_staker": "u64",
          "total_calc_points": "u64",
          "total_stake": "Balance",
          "total_rent_fee": "Balance",
          "total_burn_fee": "Balance"
        },
        "UserReonlineStakeInfo": {
          "stake_amount": "Balance",
          "offline_time": "BlockNumber"
        },
        "MachineInfo": {
          "controller": "AccountId",
          "machine_stash": "AccountId",
          "last_machine_renter": "Option<AccountId>",
          "last_machine_restake": "BlockNumber",
          "bonding_height": "BlockNumber",
          "online_height": "BlockNumber",
          "last_online_height": "BlockNumber",
          "init_stake_per_gpu": "Balance",
          "stake_amount": "Balance",
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
            "ReporterReportOffline": "(StashSlashReason, Box<MachineStatus>, AccountId, Vec<AccountId>)",
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
            "South": "u64",
            "North": "u64"
          }
        },
        "EraStashPoints": {
          "total": "u64",
          "staker_statistic": "BTreeMap<AccountId, StashMachineStatistics>"
        },
        "StashMachineStatistics": {
          "online_gpu_num": "u64",
          "inflation": "Perbill",
          "machine_total_calc_point": "u64",
          "rent_extra_grade": "u64"
        },
        "PosInfo": {
          "online_gpu": "u64",
          "offline_gpu": "u64",
          "rented_gpu": "u64",
          "online_gpu_calc_points": "u64"
        },
        "MachineGradeStatus": {
          "basic_grade": "u64",
          "is_rented": "bool"
        },
        "CommitteeList": {
          "normal": "Vec<AccountId>",
          "chill_list": "Vec<AccountId>",
          "waiting_box_pubkey": "Vec<AccountId>",
          "fulfilling_list": "Vec<AccountId>"
        },
        "OCCommitteeMachineList": {
          "booked_machine": "Vec<MachineId>",
          "hashed_machine": "Vec<MachineId>",
          "confirmed_machine": "Vec<MachineId>",
          "online_machine": "Vec<MachineId>"
        },
        "OCCommitteeOps": {
          "staked_dbc": "Balance",
          "verify_time": "Vec<BlockNumber>",
          "confirm_hash": "[u8; 16]",
          "hash_time": "BlockNumber",
          "confirm_time": "BlockNumber",
          "machine_status": "OCMachineStatus",
          "machine_info": "CommitteeUploadInfo"
        },
        "OCMachineStatus": {
          "_enum": [
            "Booked",
            "Hashed",
            "Confirmed"
          ]
        },
        "OCMachineCommitteeList": {
          "book_time": "BlockNumber",
          "booked_committee": "Vec<AccountId>",
          "hashed_committee": "Vec<AccountId>",
          "confirm_start_time": "BlockNumber",
          "confirmed_committee": "Vec<AccountId>",
          "onlined_committee": "Vec<AccountId>",
          "status": "OCVerifyStatus"
        },
        "OCVerifyStatus": {
          "_enum": [
            "SubmittingHash",
            "SubmittingRaw",
            "Summarizing",
            "Finished"
          ]
        },
        "ReporterReportList": {
          "processing_report": "Vec<ReportId>",
          "canceled_report": "Vec<ReportId>",
          "succeed_report": "Vec<ReportId>",
          "failed_report": "Vec<ReportId>"
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
        "MTCommitteeOrderList": {
          "booked_report": "Vec<ReportId>",
          "hashed_report": "Vec<ReportId>",
          "confirmed_report": "Vec<ReportId>",
          "finished_report": "Vec<ReportId>"
        },
        "MTLiveReportList": {
          "bookable_report": "Vec<ReportId>",
          "verifying_report": "Vec<ReportId>",
          "waiting_raw_report": "Vec<ReportId>",
          "finished_report": "Vec<ReportId>"
        },
        "MTPendingSlashInfo": {
          "slash_who": "AccountId",
          "slash_time": "BlockNumber",
          "slash_amount": "Balance",
          "slash_exec_time": "BlockNumber",
          "reward_to": "Vec<AccountId>",
          "slash_reason": "MTReporterSlashReason"
        },
        "MTReporterSlashReason": {
          "_enum": [
            "ReportRefused",
            "NotSubmitEncryptedInfo"
          ]
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
            "RentedInaccessible": "MachineId",
            "RentedHardwareMalfunction": "(ReportHash, BoxPubkey)",
            "RentedHardwareCounterfeit": "(ReportHash, BoxPubkey)",
            "OnlineRentFailed": "(ReportHash, BoxPubkey)"
          }
        },
        "CMPendingSlashInfo": {
          "slash_who": "AccountId",
          "slash_time": "BlockNumber",
          "slash_amount": "Balance",
          "slash_exec_time": "BlockNumber",
          "reward_to": "Vec<AccountId>",
          "slash_reason": "CMSlashReason"
        },
        "CMSlashReason": {
          "_enum": [
            "OCNotSubmitHash",
            "OCNotSubmitRaw",
            "OCInconsistentSubmit",
            "MCNotSubmitHash",
            "MCNotSubmitRaw",
            "MCInconsistentSubmit"
          ]
        },
        "OnlineStakeParamsInfo": {
          "online_stake_per_gpu": "Balance",
          "online_stake_usd_limit": "u64",
          "reonline_stake": "u64"
        },
        "OPPendingSlashInfo": {
          "slash_who": "AccountId",
          "slash_time": "BlockNumber",
          "slash_amount": "Balance",
          "slash_exec_time": "Option<BlockNumber>",
          "reward_to": "Option<Vec<AccountId>>",
          "slash_reason": "OPSlashReason"
        },
        "OPSlashReason": {
          "_enum": {
            "RentedReportOffline": "BlockNumber",
            "OnlineReportOffline": "BlockNumber",
            "RentedInaccessible": "BlockNumber",
            "RentedHardwareMalfunction": "BlockNumber",
            "RentedHardwareCounterfeit": "BlockNumber",
            "OnlineRentFailed": "BlockNumber",
            "CommitteeRefusedOnline": null,
            "CommitteeRefusedMutHardware": null,
            "ReonlineShouldReward": null
          }
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
  let de = await api?.query.system.number();
  return de?.toHuman();
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
  await api?.tx.onlineCommittee
  .submitConfirmHash( machine_id, raw_input)
  .signAndSend( kering! , ( { events = [], status } ) => {
    returnFun(status, events, callback)
    // if (status.isInBlock) {
    //   events.forEach(({ event: { method, data: [error] } }) => {
    //     if (error.isModule && method == 'ExtrinsicFailed') {
    //       const decoded = api?.registry.findMetaError(error.asModule);
    //       CallBack_data.msg = decoded!.method;
    //       CallBack_data.success = false
    //     }else if(method == 'ExtrinsicSuccess'){
    //       CallBack_data.msg = method;
    //       CallBack_data.success = true
    //     }
    //   });
    //   if (callback) {
    //     callback(CallBack_data)
    //   }
    // }
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
    gpu_type, 
    gpu_num, 
    cuda_core, 
    gpu_mem, 
    calc_point, 
    sys_disk, 
    data_disk, 
    cpu_type, 
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
  await api?.tx.onlineCommittee
  .submitConfirmRaw( machine_info_detail )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
    // if (status.isInBlock) {
    //   events.forEach(({ event: { method, data: [error] } }) => {
    //     if (error.isModule && method == 'ExtrinsicFailed') {
    //       const decoded = api?.registry.findMetaError(error.asModule);
    //       CallBack_data.msg = decoded!.method;
    //       CallBack_data.success = false
    //     }else if(method == 'ExtrinsicSuccess'){
    //       CallBack_data.msg = method;
    //       CallBack_data.success = true
    //     }
    //   });
    //   if (callback) {
    //     callback(CallBack_data)
    //   }
    // }
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
  console.log(reportid, 'reportid' );
  await cryptoWaitReady()
  await api?.tx.maintainCommittee
  .bookFaultOrder(reportid)
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
    // if (status.isInBlock) {
    //   events.forEach(({ event: { method, data: [error] } }) => {
    //     if (error.isModule && method == 'ExtrinsicFailed') {
    //       const decoded = api?.registry.findMetaError(error.asModule);
    //       CallBack_data.msg = decoded!.method;
    //       CallBack_data.success = false
    //     }else if(method == 'ExtrinsicSuccess'){
    //       CallBack_data.msg = method;
    //       CallBack_data.success = true
    //     }
    //   });
    //   if (callback) {
    //     callback(CallBack_data)
    //   }
    // }
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
  let { report_id, machine_id, reporter_rand_str, committee_rand_str, err_reason, extra_err_info, support_report } = permas
  let raw_input = blake2AsHex(
    machine_id
    + reporter_rand_str
    + committee_rand_str
    + support_report
    + err_reason
    + extra_err_info
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
  console.log(report_id, raw_input, 'raw_input');
  await api?.tx.maintainCommittee
  .submitConfirmHash( report_id, raw_input )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
    // if (status.isInBlock) {
    //   events.forEach(({ event: { method, data: [error] }}) => {
    //     if (error.isModule && method == 'ExtrinsicFailed') {
    //       const decoded = api?.registry.findMetaError(error.asModule);
    //       CallBack_data.msg = decoded!.method;
    //       CallBack_data.success = false
    //     }else if(method == 'ExtrinsicSuccess'){
    //       CallBack_data.msg = method;
    //       CallBack_data.success = true
    //     }
    //   });
    //   if (callback) {
    //     callback(CallBack_data)
    //   }
    // }
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
  let { report_id, machine_id, reporter_rand_str, committee_rand_str, err_reason, extra_err_info, support_report } = permas
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
  .submitConfirmRaw(report_id, machine_id, reporter_rand_str, committee_rand_str, err_reason, extra_err_info, support_report )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
    // if (status.isInBlock) {
    //   events.forEach(({ event: { method, data: [error] }}) => {
    //     if (error.isModule && method == 'ExtrinsicFailed') {
    //       const decoded = api?.registry.findMetaError(error.asModule);
    //       CallBack_data.msg = decoded!.method;
    //       CallBack_data.success = false
    //     }else if(method == 'ExtrinsicSuccess'){
    //       CallBack_data.msg = method;
    //       CallBack_data.success = true
    //     }
    //   });
    //   if (callback) {
    //     callback(CallBack_data)
    //   }
    // }
  })
  .catch((res)=>{
    CallBack_data = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data)
  })
}


export const reportMachineFault = async ( callback: (data: Object) => void ) => {
  let type = 'RentedHardwareMalfunction',
  Hash = '0x2c897da6721be20b23417833bee44aab06f8bf909ae0891ecde64bddc25cadc5',
  Pub = '0xe8f2957daa5be320b0a384f258da1339a07a0da3605149f4e0ec3a253a42f96c';
  let perams: any = {};
  await GetApi();
  let kering = await getCurrentPair()
  try {
    await kering!.unlock('lynn123123')
  } catch (e: any) {
    CallBack_data = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data)
    return;
  }
  perams[type] = `(${Hash}, ${Pub})`
  await cryptoWaitReady();
  await api?.tx.maintainCommittee
  .reportMachineFault(perams)
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
    // if (status.isInBlock) {
    //   events.forEach(({ event: { method, data: [error] }}) => {
    //     if (error.isModule && method == 'ExtrinsicFailed') {
    //       const decoded = api?.registry.findMetaError(error.asModule);
    //       CallBack_data.msg = decoded!.method;
    //       CallBack_data.success = false
    //     }else if(method == 'ExtrinsicSuccess'){
    //       CallBack_data.msg = method;
    //       CallBack_data.success = true
    //     }
    //   });
    //   if (callback) {
    //     callback(CallBack_data)
    //   }
    // }
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
 * leaseCommitteeOps 获取验证人验证的机器
 * @param permas
 * @return callback 回调函数，返回数组信息
 */
export const leaseCommitteeOps = async (): Promise<any> => {
  // await GetApi();
  // let de = await api?.query.leaseCommittee.committeeOps()
  // console.log(de?.toHuman())
  let data = [
    [
      [
        '5HL92dTnQrZSJZy7ckDVYVt9mMX3NsjShWsYDquB3eB3yb5R',
        '10bc6a648abc114620656fb912c0af5a50d37c2da5ccc8bcf85537bcd7706211'
      ],
      {
        staked_dbc: '1.0000 kDBC',
        verify_time: [
          '18,272',
          '19,712',
          '21,152'
        ],
        confirm_hash: '0x96dd1ebd25fbe5fd20ba84d91db20532',
        hash_time: '18,284',
        confirm_time: '19,897',
        machine_status: 'Confirmed',
        machine_info: {
          machine_id: '10bc6a648abc114620656fb912c0af5a50d37c2da5ccc8bcf85537bcd7706211',
          gpu_type: 'GeForceRTX3080Ti',
          gpu_num: 4,
          cuda_core: '10,204',
          gpu_mem: 12,
          calc_point: '76,283',
          sys_disk: 480,
          data_disk: '2,000',
          cpu_type: 'Intel(R) Xeon(R) Silver 4214R CPU @ 2.40GHz',
          cpu_core_num: 48,
          cpu_rate: '2,400',
          mem_num: 768,
          rand_str: '',
          is_support: true
        }
      }
    ]
  ]
  return data
}

/**
 * machinesInfo 查询机器的详细信息
 * @param permas
 * @return callback 回调函数，返回数组信息
 */
export const machinesInfo = async (machineId: string): Promise<any> => {
  // await GetApi();
  // let de = await api?.query.onlineProfile.machinesInfo()
  // console.log(de?.toHuman())
  let data = {
    controller: '5E4tsQdDiTY3FNTvfpJsoG8UXfM7B9TvSG77SQdFn9uJbckR',
    machine_stash: '5E7123qZExgZaYKnmTcJacu68c2GbLeSHo9qNWmUWcaw4RSR',
    last_machine_renter: '5EHuyFRjExKpEcduSvRykkKTRWo8DYqPR9ifYVe2wVcYxTo3',
    last_machine_restake: '22,509',
    bonding_height: '20,206',
    online_height: '22,509',
    last_online_height: '22,509',
    init_stake_amount: '400.0000 kDBC',
    current_stake_amount: '400.0000 kDBC',
    machine_status: {
      Rented: null
    },
    total_rented_duration: 0,
    total_rented_times: 1,
    total_rent_fee: '60.4808 kDBC',
    total_burn_fee: 0,
    machine_info_detail: {
      committee_upload_info: {
        machine_id: '0054ab938a6d9427656e2ca098dc6c6c755a4e47cd98c0cfa309f85c817b6e17',
        gpu_type: 'GeForceRTX3080Ti',
        gpu_num: 4,
        cuda_core: '10,240',
        gpu_mem: 12,
        calc_point: '76,283',
        sys_disk: 480,
        data_disk: '2,000',
        cpu_type: 'Intel(R) Xeon(R) Silver 4214R CPU @ 2.40GHz',
        cpu_core_num: 48,
        cpu_rate: '2,400',
        mem_num: 768,
        rand_str: '',
        is_support: true
      },
      staker_customize_info: {
        server_room: '0xc3a3289c1661b21fe15ac138a43745e817082081c1befd05e3ee72c73ac03473',
        upload_net: 100,
        download_net: 100,
        longitude: {
          East: '1,182,946'
        },
        latitude: {
          North: '340,643'
        },
        telecom_operators: [
          'China Telecom'
        ]
      }
    },
    reward_committee: [
      '5Cyb1Tx992KdpAdAwMfg4JJNMmCpidPybcSZniyRaPnp5q8z',
      '5HL92dTnQrZSJZy7ckDVYVt9mMX3NsjShWsYDquB3eB3yb5R',
      '5HgjMd2iuiyzPvurozVydmwCcSbDZRgdA6UHtvtXi9KSr3A8'
    ],
    reward_deadline: 737
  }
  return data
}




/**
 * transfer 交易
 * @return callback 回调函数，返回结果信息
 */

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

export const transfer = async (dest: any, value: string,  passward: string, callback: (data: Object) => void) => {
  await initNetwork();
  const basePower: number = formatBalance.getDefaults().decimals // 小数位数
  console.log(basePower, 'basePower');
  const siPower: BN = new BN(basePower)
  const bob = inputToBn(value, siPower, basePower)
  console.log(bob,'bob');
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
  await api?.tx.balances
  .transfer( dest, bob )
  .signAndSend( kering! , ( { events = [], status , dispatchError  } ) => {
    returnFun(status, events, callback)
    // if (status.isInBlock) {
    //   events.forEach(({ event: { method, data: [error] } }) => {
    //     if (error.isModule && method == 'ExtrinsicFailed') {
    //       const decoded = api?.registry.findMetaError(error.asModule);
    //       CallBack_data.msg = decoded!.method;
    //       CallBack_data.success = false
    //     }else if(method == 'ExtrinsicSuccess'){
    //       CallBack_data.msg = method;
    //       CallBack_data.success = true
    //     }
    //   });
    //   if (callback) {
    //     callback(CallBack_data)
    //   }
    // }
  })
  .catch((res)=>{
    CallBack_data = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data)
  })
}


const returnFun = (status: any, events: any, callback: Function) => {
  if (status.isInBlock) {
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
}