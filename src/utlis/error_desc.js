import { i18n } from '../setup'

export const Error_Reason = {
  onlineCommittee: [
    i18n.t('err_reason.NotInBookList'), 
    i18n.t('err_reason.AlreadySubmitHash'), 
    i18n.t('err_reason.NotAllHashSubmited'), 
    i18n.t('err_reason.TimeNotAllow'),
    i18n.t('err_reason.NotSubmitHash'), 
    i18n.t('err_reason.AlreadySubmitRaw'), 
    i18n.t('err_reason.InfoNotFeatHash'), 
    i18n.t('err_reason.DuplicateHash')
  ],
  maintainCommittee: [
    i18n.t('err_reason.NotCommittee'),
    i18n.t('err_reason.AlreadyBooked'),
    i18n.t('err_reason.OrderStatusNotFeat'),
    i18n.t('err_reason.NotInBookedList'),
    i18n.t('err_reason.NotOrderReporter'),
    i18n.t('err_reason.NotOrderCommittee'),
    i18n.t('err_reason.GetStakeAmountFailed'),
    i18n.t('err_reason.StakeFailed'),
    i18n.t('err_reason.OrderNotAllowCancel'),
    i18n.t('err_reason.OrderNotAllowBook'),
    i18n.t('err_reason.NotProperCommittee'),
    i18n.t('err_reason.NotEqualReporterSubmit'),
    i18n.t('err_reason.NotEqualCommitteeSubmit'),
    i18n.t('err_reason.ReduceTotalStakeFailed'),
    i18n.t('err_reason.PayTxFeeFailed'),
    i18n.t('err_reason.NotNeedEncryptedInfo'),
    i18n.t('err_reason.ExpiredReport'),
    i18n.t('err_reason.AlreadySubmitConfirmation'),
    i18n.t('err_reason.BalanceNotEnough'),
    i18n.t('err_reason.StakeNotEnough'),
    i18n.t('err_reason.BoxPubkeyIsNoneInFirstReport'),
    i18n.t('err_reason.NotReporter'),
    i18n.t('err_reason.TimeNotAllowed'),
    i18n.t('err_reason.SlashIdNotExist'),
    i18n.t('err_reason.NotPendingReviewSlash'),
    i18n.t('err_reason.NotSlashed')
  ]
}