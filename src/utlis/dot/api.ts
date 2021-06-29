import { ApiPromise, WsProvider } from '@polkadot/api'

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
        "StandardGpuPointPrice": {
          "gpu_point": "u64",
          "gpu_price": "u64"
        },
        "URL": "Text",
        "MachineId": "Text",
        "OrderId": "u64",
        "LiveMachine": {
          "bonding_machine": "Vec<MachineId>",
          "ocw_confirmed_machine": "Vec<MachineId>",
          "booked_machine": "Vec<MachineId>",
          "waiting_hash": "Vec<MachineId>",
          "bonded_machine": "Vec<MachineId>"
        },
        "StakerMachine": {
          "total_machine": "Vec<MachineId>",
          "online_machine": "Vec<MachineId>",
          "total_calc_points": "u64",
          "total_gpu_num": "u64",
          "total_claimed_reward": "Balance",
          "can_claim_reward": "Balance",
          "left_reward": "VecDeque<Balance>"
        },
        "BlockNumber": "u32",
        "MachineInfo": {
          "machine_owner": "AccountId",
          "machine_renter": "Option<AccountId>",
          "bonding_height": "BlockNumber",
          "stake_amount": "Balance",
          "machine_status": "MachineStatus",
          "machine_info_detail": "MachineInfoDetail",
          "machine_price": "u64",
          "reward_committee": "Vec<AccountId>",
          "reward_deadline": "BlockNumber"
        },
        "MachineStatus": {
          "_enum": [
            "MachineSelfConfirming",
            "CommitteeVerifying",
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
          "hard_disk": "u64",
          "cpu_type": "Vec<u8>",
          "cpu_core_num": "u32",
          "cpu_rate": "u64",
          "mem_num": "u64",
          "rand_str": "Vec<u8>",
          "is_support": "bool"
        },
        "StakerCustomizeInfo": {
          "left_change_time": "u64",
          "upload_net": "u64",
          "download_net": "u64",
          "longitude": "u64",
          "latitude": "u64",
          "images": "Vec<ImageName>"
        },
        "ImageName": "Text",
        "CPU": {
          "num": "Vec<u8>",
          "type": "Vec<u8>"
        },
        "Disk": {
        },
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
          "individual_points": "BTreeMap<MachineId, MachineGradeStatus>",
          "staker_statistic": "BTreeMap<AccountId, StakerStatistics>"
        },
        "MachineGradeStatus": {
          "basic_grade": "u64",
          "is_online": "bool"
        },
        "StakerStatistics": {
          "online_num": "u64",
          "inflation": "Perbill",
          "machine_total_calc_point": "u64",
          "rent_extra_grade": "u64"
        },
        "StakingLedger": {
          "stash": "AccountId",
          "total": "Compact<Balance>",
          "active": "Compact<Balance>",
          "unlocking": "Vec<UnlockChunk>",
          "claimed_rewards": "Vec<EraIndex>",
          "released_rewards": "Balance",
          "upcoming_rewards": "Vec<Balance>"
        },
        "UnlockChunk": {
          "value": "Compact<Balance>",
          "era": "Compact<EraIndex>"
        },
        "CommitteeMachine": {
          "machine_id": "Vec<MachineId>",
          "total_calc_points": "u64",
          "total_gpu_num": "u64",
          "total_reward": "Balance"
        },
        "LCCommitteeList": {
          "committee": "Vec<AccountId>",
          "chill_list": "Vec<AccountId>",
          "fulfill_list": "Vec<AccountId>",
          "black_list": "Vec<AccountId>"
        },
        "LCCommitteeMachineList": {
          "booked_machine": "Vec<MachineId>",
          "hashed_machine": "Vec<MachineId>",
          "confirmed_machine": "Vec<MachineId>",
          "online_machine": "Vec<MachineId>"
        },
        "LCCommitteeOps": {
          "booked_time": "BlockNumber",
          "stake_dbc": "Balance",
          "verify_time": "Vec<BlockNumber>",
          "confirm_hash": "[u8; 16]",
          "hash_time": "BlockNumber",
          "confirm_time": "BlockNumber",
          "machine_status": "LCMachineStatus",
          "machine_info": "CommitteeUploadInfo1"
        },
        "LCMachineStatus": {
          "_enum": [
            "Booked",
            "Hashed",
            "Confirmed"
          ]
        },
        "CommitteeUploadInfo1": {
          "machine_id": "MachineId",
          "gpu_type": "Vec<u8>",
          "gpu_num": "u32",
          "cuda_core": "u32",
          "gpu_mem": "u64",
          "calc_point": "u64",
          "hard_disk": "u64",
          "cpu_type": "Vec<u8>",
          "cpu_core_num": "u32",
          "cpu_rate": "u64",
          "mem_num": "u64",
          "rand_str": "Vec<u8>",
          "is_support": "bool"
        },
        "LCMachineCommitteeList": {
          "book_time": "BlockNumber",
          "booked_committee": "Vec<AccountId>",
          "hashed_committee": "Vec<AccountId>",
          "confirm_start": "BlockNumber",
          "confirmed_committee": "Vec<AccountId>",
          "onlined_committee": "Vec<AccountId>"
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
        "MTCommitteeList": {
          "committee": "Vec<AccountId>",
          "waiting_box_pubkey": "Vec<AccountId>"
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
        "MTCommitteeOrderList": {
          "booked_order": "Vec<ReportId>",
          "hashed_order": "Vec<ReportId>",
          "confirmed_order": "Vec<ReportId>",
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
          "box_public_key": "[u8; 32]",
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
          "report_type": "ReportType"
        },
        "ReportStatus": {
          "_enum": [
            "Reported",
            "WaitingBook",
            "Verifying",
            "SubmitingRaw",
            "CommitteeConfirmed"
          ]
        },
        "ReportType": {
          "_enum": [
            "HardwareFault",
            "MachineOffline",
            "MachineUnrentable"
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
 * toHuman() 转义成可读字符串
 * 
 * @param address 
 */
// 获取链上信息
export const getAccount = async (address: string) => {
  await GetApi();
  const now = await api!?.query.timestamp.now();
  let { nonce, data: balance} = await api!?.query.system.account(address)
  // console.log( balance.toHuman() , `${now}: balance of ${balance.free} and a nonce of ${nonce}` , nonce, now);
}

// 获取链上抢单列表
export const getOrder = async () => {
  await GetApi();
  let de = await api?.query.maintainCommittee.liveReport()
  // console.log(de?.toJSON());
}
// 开始抢单
export const StartGrabbing = async (publicKey: Uint8Array) => {
  await GetApi();
  let de = await api?.tx.committee.committeeSetBoxPubkey(publicKey)
}


// import { Keyring } from "@polkadot/keyring";
// import {cryptoWaitReady} from '@polkadot/util-crypto'
const json = localStorage.getItem('pair')
const json2= JSON.parse(json?json:'{}')
// 提交原始信息
// export const commite = async () => {
//   await GetApi();
//   const { nonce } = await api?.query.system.account(json2.address)
//   console.log(json2, nonce, 'eqweqw');
//   let result = await api?.tx.maintainCommittee
//     .submitConfirmRaw(0,'0x2222','0x11111111','0x11111111','0x11111111','不')
//     .signAndSend( json2, nonce ,(result: any) => {
//       console.log(`Current status is ${result.status}`);
//       console.log(result , 'deded');
//     })
// }
