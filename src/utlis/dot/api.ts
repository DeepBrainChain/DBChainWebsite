import { ApiPromise, WsProvider } from '@polkadot/api'
import { cryptoWaitReady, blake2AsHex, randomAsU8a } from '@polkadot/util-crypto'
import { formatBalance, BN_TEN, isHex, stringToU8a, u8aToHex, hexToU8a, stringToHex, hexToString } from '@polkadot/util';
import { getCurrentPair } from './index' // 获取kerPair
import BN from 'bn.js'
import { initNetwork } from './index'
import { ExtrinsicStatus, EventRecord } from '@polkadot/types/interfaces';

const node = {
  polkadot: 'wss://rpc.polkadot.io',
  // dbc: 'wss://congtuinfo.dbcwallet.io:7777', // 聪图云私链测试链
  // dbc: 'wss://infotest.dbcwallet.io:7777', // 公链测试链
  dbc: 'wss://info.dbcwallet.io' // 公链正式链
}
let api: ApiPromise | null = null

declare interface Network {
  api: ApiPromise,
}

export const typeJson1 = {
  "ReportId": "u64",
  "SlashId": "u64",
  "BoxPubkey": "[u8; 32]",
  "ReportHash": "[u8; 16]",
  "URL": "Text",
  "MachineId": "Text",
  "TelecomName": "Text",
  "FoundationIssueRewards": {
    "who": "Vec<AccountId>",
    "left_reward_times": "u32",
    "first_reward_era": "EraIndex",
    "reward_interval": "EraIndex",
    "reward_amount": "Balance"
  },
  "TreasuryIssueRewards": {
    "treasury_account": "AccountId",
    "left_reward_times": "u32",
    "first_reward_era": "EraIndex",
    "reward_interval": "EraIndex",
    "reward_amount": "Balance"
  },
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
  "UserMutHardwareStakeInfo": {
    "stake_amount": "Balance",
    "offline_time": "BlockNumber"
  },
  "MachineRecentRewardInfo": {
    "machine_stash": "AccountId",
    "recent_machine_reward": "Vec<Balance>",
    "recent_reward_sum": "Balance",
    "reward_committee_deadline": "EraIndex",
    "reward_committee": "Vec<AccountId>"
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
  "StashSlashReason": {
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
    "_enum": ["Booked", "Hashed", "Confirmed"]
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
    "_enum": ["SubmittingHash", "SubmittingRaw", "Summarizing", "Finished"]
  },
  "OCPendingSlashInfo": {
    "machine_id": "MachineId",
    "machine_stash": "AccountId",
    "stash_slash_amount": "Balance",
    "inconsistent_committee": "Vec<AccountId>",
    "unruly_committee": "Vec<AccountId>",
    "reward_committee": "Vec<AccountId>",
    "committee_stake": "Balance",
    "slash_time": "BlockNumber",
    "slash_exec_time": "BlockNumber",
    "book_result": "OCBookResultType",
    "slash_result": "OCSlashResult"
  },
  "OCBookResultType": {
    "_enum": ["OnlineSucceed", "OnlineRefused", "NoConsensus"]
  },
  "OCSlashResult": {
    "_enum": ["Pending", "Canceled", "Executed"]
  },
  "OCPendingSlashReviewInfo": {
    "applicant": "AccountId",
    "staked_amount": "Balance",
    "apply_time": "BlockNumber",
    "expire_time": "BlockNumber",
    "reason": "Vec<u8>"
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
    "_enum": ["WaitingEncrypt", "Verifying", "WaitingRaw", "Finished"]
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
  "MTReportResultInfo": {
    "report_id": "ReportId",
    "reporter": "AccountId",
    "reporter_stake": "Balance",
    "inconsistent_committee": "Vec<AccountId>",
    "unruly_committee": "Vec<AccountId>",
    "reward_committee": "Vec<AccountId>",
    "committee_stake": "Balance",
    "machine_stash": "AccountId",
    "machine_id": "MachineId",
    "slash_time": "BlockNumber",
    "slash_exec_time": "BlockNumber",
    "report_result": "ReportResultType",
    "slash_result": "SlashResult"
  },
  "ReportResultType": {
    "_enum": [
      "ReportSucceed",
      "ReportRefused",
      "ReporterNotSubmitEncryptedInfo",
      "NoConsensus"
    ]
  },
  "SlashResult": { "_enum": ["Pending", "Canceled", "Executed"] },
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
  "MTPendingSlashReviewInfo": {
    "applicant": "AccountId",
    "staked_amount": "Balance",
    "apply_time": "BlockNumber",
    "expire_time": "BlockNumber",
    "reason": "Vec<u8>"
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
  "OnlineStakeParamsInfo": {
    "online_stake_per_gpu": "Balance",
    "online_stake_usd_limit": "u64",
    "reonline_stake": "u64",
    "slash_review_stake": "Balance"
  },
  "PhaseRewardInfoDetail": {
    "online_reward_start_era": "EraIndex",
    "first_phase_duration": "EraIndex",
    "galaxy_on_era": "EraIndex",
    "phase_0_reward_per_era": "Balance",
    "phase_1_reward_per_era": "Balance",
    "phase_2_reward_per_era": "Balance"
  },
  "OPPendingSlashInfo": {
    "slash_who": "AccountId",
    "machine_id": "MachineId",
    "slash_time": "BlockNumber",
    "slash_amount": "Balance",
    "slash_exec_time": "BlockNumber",
    "reward_to_reporter": "Option<AccountId>",
    "reward_to_committee": "Option<Vec<AccountId>>",
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
  "OPPendingSlashReviewInfo": {
    "applicant": "AccountId",
    "staked_amount": "Balance",
    "apply_time": "BlockNumber",
    "expire_time": "BlockNumber",
    "reason": "Vec<u8>"
  },
  "AllMachineIdSnapDetail": {
    "all_machine_id": "Vec<MachineId>",
    "snap_len": "u64"
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
    "_enum": ["WaitingVerifying", "Renting", "RentExpired"]
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


export const typeJson = {
  "ReportId": "u64",
  "SlashId": "u64",
  "BoxPubkey": "[u8; 32]",
  "ReportHash": "[u8; 16]",
  "URL": "Text",
  "MachineId": "Text",
  "TelecomName": "Text",
  "RentOrderId": "u64",
  "FoundationIssueRewards": {
    "who": "Vec<AccountId>",
    "left_reward_times": "u32",
    "first_reward_era": "EraIndex",
    "reward_interval": "EraIndex",
    "reward_amount": "Balance"
  },
  "TreasuryIssueRewards": {
    "treasury_account": "AccountId",
    "left_reward_times": "u32",
    "first_reward_era": "EraIndex",
    "reward_interval": "EraIndex",
    "reward_amount": "Balance"
  },
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
  "UserMutHardwareStakeInfo": {
    "stake_amount": "Balance",
    "offline_time": "BlockNumber"
  },
  "MachineRecentRewardInfo": {
    "machine_stash": "AccountId",
    "recent_machine_reward": "Vec<Balance>",
    "recent_reward_sum": "Balance",
    "reward_committee_deadline": "EraIndex",
    "reward_committee": "Vec<AccountId>"
  },
  "MachineInfo": {
    "controller": "AccountId",
    "machine_stash": "AccountId",
    "renters": "Vec<AccountId>",
    "last_machine_restake": "BlockNumber",
    "bonding_height": "BlockNumber",
    "online_height": "BlockNumber",
    "last_online_height": "BlockNumber",
    "init_stake_per_gpu": "Balance",
    "stake_amount": "Balance",
    "machine_status": "MachineStatus",
    "total_rented_duration": "BlockNumber",
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
  "StashSlashReason": {
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
    "_enum": ["Booked", "Hashed", "Confirmed"]
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
    "_enum": ["SubmittingHash", "SubmittingRaw", "Summarizing", "Finished"]
  },
  "OCPendingSlashInfo": {
    "machine_id": "MachineId",
    "machine_stash": "AccountId",
    "stash_slash_amount": "Balance",
    "inconsistent_committee": "Vec<AccountId>",
    "unruly_committee": "Vec<AccountId>",
    "reward_committee": "Vec<AccountId>",
    "committee_stake": "Balance",
    "slash_time": "BlockNumber",
    "slash_exec_time": "BlockNumber",
    "book_result": "OCBookResultType",
    "slash_result": "OCSlashResult"
  },
  "OCBookResultType": {
    "_enum": ["OnlineSucceed", "OnlineRefused", "NoConsensus"]
  },
  "OCSlashResult": {
    "_enum": ["Pending", "Canceled", "Executed"]
  },
  "OCPendingSlashReviewInfo": {
    "applicant": "AccountId",
    "staked_amount": "Balance",
    "apply_time": "BlockNumber",
    "expire_time": "BlockNumber",
    "reason": "Vec<u8>"
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
    "_enum": ["WaitingEncrypt", "Verifying", "WaitingRaw", "Finished"]
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
  "MTReportResultInfo": {
    "report_id": "ReportId",
    "reporter": "AccountId",
    "reporter_stake": "Balance",
    "inconsistent_committee": "Vec<AccountId>",
    "unruly_committee": "Vec<AccountId>",
    "reward_committee": "Vec<AccountId>",
    "committee_stake": "Balance",
    "machine_stash": "AccountId",
    "machine_id": "MachineId",
    "slash_time": "BlockNumber",
    "slash_exec_time": "BlockNumber",
    "report_result": "ReportResultType",
    "slash_result": "SlashResult"
  },
  "ReportResultType": {
    "_enum": [
      "ReportSucceed",
      "ReportRefused",
      "ReporterNotSubmitEncryptedInfo",
      "NoConsensus"
    ]
  },
  "SlashResult": { "_enum": ["Pending", "Canceled", "Executed"] },
  "MTReportInfoDetail": {
    "reporter": "AccountId",
    "report_time": "BlockNumber",
    "reporter_stake": "Balance",
    "first_book_time": "BlockNumber",
    "machine_id": "MachineId",
    "rent_order_id": "RentOrderId",
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
  "MTPendingSlashReviewInfo": {
    "applicant": "AccountId",
    "staked_amount": "Balance",
    "apply_time": "BlockNumber",
    "expire_time": "BlockNumber",
    "reason": "Vec<u8>"
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
      "RentedInaccessible": "(MachineId, RentOrderId)",
      "RentedHardwareMalfunction": "(ReportHash, BoxPubkey)",
      "RentedHardwareCounterfeit": "(ReportHash, BoxPubkey)",
      "OnlineRentFailed": "(ReportHash, BoxPubkey)"
    }
  },
  "OnlineStakeParamsInfo": {
    "online_stake_per_gpu": "Balance",
    "online_stake_usd_limit": "u64",
    "reonline_stake": "u64",
    "slash_review_stake": "Balance"
  },
  "PhaseRewardInfoDetail": {
    "online_reward_start_era": "EraIndex",
    "first_phase_duration": "EraIndex",
    "galaxy_on_era": "EraIndex",
    "phase_0_reward_per_era": "Balance",
    "phase_1_reward_per_era": "Balance",
    "phase_2_reward_per_era": "Balance"
  },
  "OPPendingSlashInfo": {
    "slash_who": "AccountId",
    "machine_id": "MachineId",
    "slash_time": "BlockNumber",
    "slash_amount": "Balance",
    "slash_exec_time": "BlockNumber",
    "reporter": "Option<AccountId>",
    "renters": "Vec<AccountId>",
    "reward_to_committee": "Option<Vec<AccountId>>",
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
  "OPPendingSlashReviewInfo": {
    "applicant": "AccountId",
    "staked_amount": "Balance",
    "apply_time": "BlockNumber",
    "expire_time": "BlockNumber",
    "reason": "Vec<u8>"
  },
  "AllMachineIdSnapDetail": {
    "all_machine_id": "Vec<MachineId>",
    "snap_len": "u64"
  },
  "RentOrderDetail": {
    "machine_id": "MachineId",
    "renter": "AccountId",
    "rent_start": "BlockNumber",
    "confirm_rent": "BlockNumber",
    "rent_end": "BlockNumber",
    "stake_amount": "Balance",
    "rent_status": "RentStatus",
    "gpu_num": "u32",
    "gpu_index": "Vec<u32>"
  },
  "RentStatus": {
    "_enum": ["WaitingVerifying", "Renting", "RentExpired"]
  },
  "MachineGPUOrder": {
    "rent_order": "Vec<RentOrderId>",
    "used_gpu": "Vec<u32>"
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

// 链上交互
export const GetApi = async (): Promise<Network> =>{
  if (!api) {
    const provider = new WsProvider(node.dbc)
    api = await ApiPromise.create({ 
      provider ,
      types: typeJson
    })
  }
  return { api }
}

// 定义信息返回
let CallBack_data = {
  index: 0,
  msg:'',
  section:'',
  success: false
} 
let CallBack_data1 = {
  msg:'',
  success: false
}
// 定义回调函数
const returnFun = (status: ExtrinsicStatus, events: EventRecord[], callback: Function) => {
  if (status.isInBlock) {
    console.log(status, 'status');
    events.forEach(({ event: { method, data: [error] } }) => {
      if (method == 'ExtrinsicFailed') {
        let returnError:any = error
        const decoded = api?.registry.findMetaError(returnError.asModule);
        console.log(JSON.stringify(decoded));
        CallBack_data.msg = decoded!.method;
        CallBack_data.success = false
        CallBack_data.index = decoded!.index;
        CallBack_data.section = decoded!.section;
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
 * getBlockTime 获取链上GPUPointPrice
 * 
 * @return data:返回链上单个算力值的价格
 */
 export const standardGPUPointPrice = async (): Promise<any> => {
  await GetApi();
  let de = await api?.query.onlineProfile.standardGPUPointPrice();
  let data = de?.toJSON()
  return data
}

/**
 * getBlockTime 获取链上DBC的实时价格
 * 
 * @return data:返回链上单个算力值的价格
 */
 export const dbcPriceOcw = async (): Promise<any> => {
  await GetApi();
  let de = await api?.query.dbcPriceOcw.avgPrice();
  return de?.toJSON()
}


// export const unhandledReportResult = async (): Promise<any> => {
//   await GetApi()
//   let de = await api?.query.maintainCommittee.reportResult.entries();
//   de?.forEach(([{ args: [era, nominatorId] }, value]) => {
//     console.log(value.toJSON());
//   });
//   // return de
// }
// unhandledReportResult()

/**
 * getAccountBalance 查询账户余额
 * 
 * @return balance:余额
 */
 export const getAccountBalance = async (wallet: string): Promise<any> => {
  await GetApi();
  let de = await api?.query.system.account(wallet);
  return de?.toJSON();
}

/**
 * getCommitteeList 查询是否为理事会成员
 * 
 * @return list: boolen 理事会成员列表
 */
export const getCommitteeList = async (wallet: string): Promise<any> => {
  await GetApi();
  let de: any = await api!.query.committee.committee()
  let commit = [...de.normal.toHuman(), ...de.fulfilling_list.toHuman()]
  let isCommit = commit.indexOf(wallet) > -1? true : false
  return isCommit
}

// 查询理事会的公钥
export const getCommitteePub = async (wallet: string): Promise<any> => {
  await GetApi();
  let de: any = await api!.query.committee.committeeStake(wallet)
  return de.toHuman()
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
    CallBack_data1 = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data1)
    return;
  }
  await cryptoWaitReady();
  await api!.tx.onlineCommittee
  .submitConfirmHash( machine_id, raw_input)
  .signAndSend( kering! , ( { events = [], status } ) => {
    returnFun(status, events, callback)
  })
  .catch((res)=>{
    CallBack_data1 = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data1)
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
    CallBack_data1 = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data1)
    return;
  }
  await cryptoWaitReady()
  await api!.tx.onlineCommittee
  .submitConfirmRaw( machine_info_detail )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
  })
  .catch((res)=>{
    CallBack_data1 = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data1)
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
  let de = await api!.query.maintainCommittee.reportInfo(ReportId)
  return de?.toJSON()
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
 * committeeBookReport 开始抢单
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
    CallBack_data1 = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data1)
    return;
  }
  await cryptoWaitReady()
  await api!.tx.maintainCommittee
  .committeeBookReport(reportid)
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
  })
  .catch((res)=>{
    CallBack_data1 = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data1)
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
 * committeeSubmitVerifyHash 抢单 提交hash信息
 * @param  submitConfirmHash(report_id, hash)  passward: string 密码（可从vuex中获取）
 * @return callback 回调函数，返回数组信息
 */
 export const committeeSubmitVerifyHash = async ( permas: any,  passward: string, callback: (data: Object) => void) => {
  let { report_id, committee_rand_str, support_report } = permas
  let raw_input = blake2AsHex(
    report_id
    + committee_rand_str
    + support_report
    , 128)
  await GetApi();
  let kering = await getCurrentPair()
  try {
    await kering!.unlock(passward)
  } catch (e: any) {
    CallBack_data1 = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data1)
    return;
  }
  await cryptoWaitReady();
  console.log(report_id, raw_input, 'raw_input');
  await api!.tx.maintainCommittee
  .committeeSubmitVerifyHash( report_id, raw_input )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
  })
  .catch((res)=>{
    CallBack_data1 = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data1)
  })
}

/**
 * StartGrabbing 抢单 提交原始信息
 * @param permas
 * @return callback 回调函数，返回数组信息
 */
 export const committeeSubmitInaccessibleRaw = async ( permas: any, passward: string, callback: (data: Object) => void) => {
  let { report_id, committee_rand_str, support_report } = permas
  await GetApi();
  let kering = await getCurrentPair()
  try {
    await kering!.unlock(passward)
  } catch (e: any) {
    CallBack_data1 = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data1)
    return;
  }
  await cryptoWaitReady();
  await api?.tx.maintainCommittee
  .committeeSubmitInaccessibleRaw(report_id, committee_rand_str, support_report )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
  })
  .catch((res)=>{
    CallBack_data1 = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data1)
  })
}

/**
 * StartGrabbing 抢单 提交hash信息
 * @param  submitConfirmHash(report_id, hash)  passward: string 密码（可从vuex中获取）
 * @return callback 回调函数，返回数组信息
 */
 export const submitConfirmHash = async ( permas: any,  passward: string, callback: (data: Object) => void) => {
  let { report_id, machine_id, reporter_rand_str, committee_rand_str, err_reason, support_report } = permas
  let raw_input = blake2AsHex(machine_id + reporter_rand_str + committee_rand_str + support_report + err_reason, 128)
  await GetApi();
  let kering = await getCurrentPair()
  try {
    await kering!.unlock(passward)
  } catch (e: any) {
    CallBack_data1 = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data1)
    return;
  }
  await cryptoWaitReady();
  await api!.tx.maintainCommittee
  .committeeSubmitVerifyHash( report_id, raw_input )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
  })
  .catch((res)=>{
    CallBack_data1 = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data1)
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
    CallBack_data1 = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data1)
    return;
  }
  await cryptoWaitReady();
  await api?.tx.maintainCommittee
  .committeeSubmitVerifyRaw(report_id, machine_id, reporter_rand_str, committee_rand_str, stringToHex(err_reason), stringToHex(extra_err_info), Number(support_report))
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
  })
  .catch((res)=>{
    CallBack_data1 = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data1)
  })
}


export const reportMachineFault = async ( permas: any, passward: string, callback: (data: Object) => void) => {
  // let type = 'RentedHardwareMalfunction',
  // Hash = '0x2c897da6721be20b23417833bee44aab06f8bf909ae0891ecde64bddc25cadc5',
  // Pub = '0xe8f2957daa5be320b0a384f258da1339a07a0da3605149f4e0ec3a253a42f96c';
  await GetApi();
  let kering = getCurrentPair()
  try {
    kering!.unlock(passward)
  } catch (e: any) {
    CallBack_data1 = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data1)
    return;
  }
  // perams[type] = `(${Hash}, ${Pub})`
  await cryptoWaitReady();
  await api!.tx.maintainCommittee
  .reportMachineFault(permas)
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
  })
  .catch((res)=>{
    CallBack_data1 = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data1)
  })
}


/**
 * leaseCommitteeOps 获取验证人验证的机器
 * @param permas
 * @return callback 回调函数，返回数组信息
 */
export const leaseCommitteeOps = async (wallet: string): Promise<any> => {
  await GetApi();
  let de = await api?.query.onlineCommittee.committeeMachine(wallet)
  return de!.toHuman()
}
/**
 * machinesInfo 查询机器的详细信息
 * @param permas
 * @return callback 回调函数，返回数组信息
 */
export const machinesInfo = async ( day: string |number, machineId: string): Promise<any> => {
  await GetApi();
  let de = await api!.query.onlineProfile.machinesInfo(machineId)
  let reward = await erasMachineReleasedReward( day, machineId )
  let data = {
    todayReward: Number(reward),
    info: de!.toHuman()
  }
  return data
}
/**
 * 查询当前是链上第几天
 * currentEra
*/
export const currentEra = async ():Promise<any> => {
  await GetApi()
  let nowDay = await api!.query.onlineProfile.currentEra()
  console.log(nowDay.toHuman(), 'currentEra')
  return nowDay.toHuman()
}

/**
 * 查询机器在指定的某天获得的具体收益
 * erasMachineReleasedReward
*/
export const erasMachineReleasedReward = async ( EraIndex: string|number, MachineId: string ):Promise<any> => {
  await GetApi()
  let totalReward = await api!.query.onlineProfile.erasMachineReleasedReward(EraIndex, MachineId)
  return Number(totalReward.toJSON())
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
// 转账
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
    CallBack_data1 = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data1)
    return;
  }
  await cryptoWaitReady();
  await api!.tx.balances
  .transfer( dest, bob )
  .signAndSend( kering! , ( { events = [], status  } ) => {
    returnFun(status, events, callback)
  })
  .catch((res)=>{
    CallBack_data1 = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data1)
  })
}

// 批量转账
export const batchTransfer = async (walletList: Array<any>, passward: string, callback: (data: Object) => void) => {
  await initNetwork();
  const basePower: number = formatBalance.getDefaults().decimals // 小数位数
  const siPower: BN = new BN(basePower)
  let tsArray: Array<any> = []
  for(let i =0; i< walletList.length; i++){
    let money = `${walletList[i].totalDbc}.${walletList[i].info.nonce}`
    let bob = inputToBn(money, siPower, basePower)
    tsArray.push(api?.tx.balances.transfer( walletList[i].info.wallet, bob ))
  }
  let kering = await getCurrentPair()
  try {
    await kering!.unlock(passward)
  } catch (e: any) {
    CallBack_data1 = {
      msg: e.message,
      success: false
    };
    callback(CallBack_data1)
    return;
  }
  await cryptoWaitReady();
  await api!.tx.utility
  .batch(tsArray)
  .signAndSend( kering! , ( { events = [], status  } ) => {
    if (status.isInBlock) {
      events.forEach(({ event: { method, data: [error] } }) => {
        // console.log(error, method, 'method');
        let returnError: any = error
        if (method == 'ExtrinsicFailed') {
          const decoded = api?.registry.findMetaError(returnError.asModule);
          console.log(JSON.stringify(decoded));
          CallBack_data.msg = decoded!.method;
          CallBack_data.success = false
          CallBack_data.index = decoded!.index;
          CallBack_data.section = decoded!.section;
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
    CallBack_data1 = {
      msg: res.message,
      success: false
    };
    callback(CallBack_data1)
  })
}




// console.log(hexToString('2 + '12345678' + '1', 128'), '333333');