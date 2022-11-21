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
import { BN_TEN, formatBalance, isHex, stringToU8a , u8aToHex, u8aToString, hexToU8a, hexToString, stringToHex } from '@polkadot/util';
import { decodePair } from "@polkadot/keyring/pair/decode";
import BN from 'bn.js'
import { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types'
import type { Text } from '@polkadot/types'
import type { ChainProperties } from '@polkadot/types/interfaces';
import { getFormatBalance } from './tools'
import FileSaver from 'file-saver'
import nacl from 'tweetnacl'
import { GetApi } from './api';

const node = {
  polkadot: 'wss://rpc.polkadot.io',
  // dbc: 'wss://congtuinfo.dbcwallet.io:7777', // 聪图云私链测试链
  // dbc: 'wss://infotest.dbcwallet.io:7777', // 公链测试链
  dbc: 'wss://info.dbcwallet.io' // 公链正式链
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
  sealed: Uint8Array | string;
  nonce: Uint8Array | string;
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

// 链接账户
export const initNetwork = async (): Promise<Network> => {
  if (!api) {
    const provider = new WsProvider(node.dbc)
    // api = await ApiPromise.create({ provider })
    api = await ApiPromise.create({ 
      provider ,
      types: typeJson
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
    // unit: tokenSymbol[0].toString()  测试注释
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
    transfer.signAndSend(pair, (result: any) => {
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
  const pairs = keyring.getPairs()
  if (pairs.length > 0) {
    keyring.removePair(pairs[0].address)
  }
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

// 获取随机数
export function getRand_str(){
  const rand_str = u8aToHex(randomAsU8a(24))
  return rand_str
}


export const getStake = async (wallet: string) => {
  await GetApi()
  let de = await api?.query.maintainCommittee.reporterStake(wallet);
  return de?.toHuman();
}

// getStake('5EspPzPFnKi7UnpfFBRktfBwDJ21USmcm9rrizxHSmh3ovTt')

/**
 * dbcPriceOcw 获取链上DBC的实时价格
 * 
 * @return data:返回链上DBC的实时价格
 */
 export const dbcPriceOcw = async (): Promise<any> => {
  let de = await api?.query.dbcPriceOcw.avgPrice();
  return de?.toJSON()
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

interface Kerpair {
  publicKey?: Uint8Array,
  secretKey?: Uint8Array,
}


// 通过pair解锁密钥对 需要获取用户的pair文件及passward
export const getKeypair = ( password : string ): Kerpair => {
  const jsonStr1 = localStorage.getItem('pair')
  if (keyring && jsonStr1) {
    const pair = JSON.parse(jsonStr1?jsonStr1:'{}')
    let NewKeyPair = decodePair( password , base64Decode(pair.encoded), pair.encoding.type );
    let NewKeyPair1 = naclBoxKeypairFromSecret(NewKeyPair.secretKey)
    console.log(u8aToHex(NewKeyPair1.secretKey), u8aToHex(NewKeyPair1.publicKey), 'NewKeyPair1');
    return NewKeyPair1
  } else {
    return {}
    // throw Error ('pair is not define')
  }
}

// getKeypair('123456')

//  0xb75b54a9c6b819acf9fbb00614be9d62f68599909e5fb25e0ab081ad581f8a0b publicKey
//  0xc8c275687a435f58471111e4dc5412a3edb9e7158aea981e38733eefc195005b secretKey
// console.log(u8aToHex(getKeypair('123456789').publicKey), u8aToHex(getKeypair('123456789').secretKey),'NewKeyPair1');
// 通过助记词获取密钥对
// const MNEMONIC = 'team copy swallow diamond detail loud power goat upon session fancy raven';

// const seedAlice = mnemonicToMiniSecret(MNEMONIC);
// console.log(u8aToHex(seedAlice), 'seedAlice');

// 通过助记词生成 Uint8Array格式的私钥
// console.log(u8aToHex(seedAlice), 'seedAlice');

// Generate new public/secret keypair for Alice from the supplied seed
// const { publicKey, secretKey } = naclKeypairFromSeed(seedAlice);
// console.log(publicKey, secretKey, secretKey.slice(0,32),  'secretKey')

// 验证通过私钥生成的 Uint8Array 是否与 助记词获取的一致
// console.log(hexToU8a('0xf2ea52af98446cefa3e884353dd760e25d7f39386d0caa26be600c00425d10da'));
// 验证通过私钥生成的 Uint8Array 生成的新的密钥对是否可用
// let keys = naclBoxKeypairFromSecret(hexToU8a('0xf44f80791a45b70a350dcf3d838bfc6bb485377059842e16339a10f7cab10f61'))
// console.log(u8aToHex(keys.secretKey), u8aToHex(keys.publicKey),'naclBoxKeypairFromSecret(hexToU8a)');
// 验证通过助记词获取生成的 secretKey 生成的新的密钥对是否 与 上面的密钥对一致
// console.log(naclBoxKeypairFromSecret(secretKey),'naclBoxKeypairFromSecret(secretKey)');

// 验证地址转 publicKey：Uint8Array 及  publicKey：Uint8Array 转地址是否一致
// console.log(u8aToHex(decodeAddress('5GkLkFKcYpPfbdBwVWrCyae5uJkkXtqkkYXSbm8znSZDiFpC')), encodeAddress('0xcf2baf5cdf07372f2007aee66706db62db1e0c8eefc69d6fa233959f38f1af9f', 42),'encodeAddress->publicKey');
// 生成加密信息
export function naclSeal (message: Uint8Array, senderBoxSecret: Uint8Array, receiverBoxPublic: Uint8Array, nonce: Uint8Array): Sealed {
  return {
    nonce: u8aToHex(nonce),
    sealed: u8aToHex(nacl.box(message, nonce, receiverBoxPublic, senderBoxSecret))
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

// 自己签名，别人验证
export const CreateSignature = async (message: string , password: string ): Promise<string> => {
  let jsonStr4 = JSON.parse(localStorage.getItem('pair')!)
  await cryptoWaitReady();
  let signUrl = keyring.addFromJson(jsonStr4);
  signUrl.unlock(password)
  const signature = signUrl.sign(stringToU8a(message));
  return u8aToHex(signature)
}
