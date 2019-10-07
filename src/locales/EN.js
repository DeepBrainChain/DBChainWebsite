import enLocale from 'element-ui/lib/locale/lang/en'

export default {
  message: 'hello i18n !!',
  website_name: 'dbchain', //yousanai,  dbchain,aionego
  $: '$',
  send: 'Send',
  closeWallet: 'Close Wallet',
  toAddress: 'To Address',
  amount: 'Amount',
  from: 'FROM ',
  to: 'TO',
  value: 'VALUE',
  asset: 'ASSET',
  transfer: 'TRANSFER',
  day: 'D',
  hour: 'H',
  password: 'Password',
  unsubscribe: 'Unsubscribe',
  subscribe: 'Subscribe',
  tips: 'Reminder',
  total: 'Total',
  confirm: 'Confirm',
  cancel: 'Cancel',
  confirmPay: 'Confirm Payment',
  enterPassword: 'Enter Password',
  newWallet: ' New Wallet',
  inputPsWarning: 'Password must  be at least 8 characters long.',
  create: 'CREATE',
  dlEncryptedKey: 'Key DOWNLOAD ENCRYPTED KEY',
  finished: 'FINISHED',
  amountNoMore: 'Transaction amount cannot be more than your wallet balance', // new
  noZero: 'The amount cannot be smaller than or equal to 0', // new
  errAddr: 'Wallet address incorrect',
  transferSuccess: 'Transaction successful, please wait and check for update on blocks',
  transferFail: 'Transaction Failed',
  confirmTrTitle: 'Confirm Transfer',
  confirmTrMsg: 'You are sending <b>{amount}</b> DBC to this address:<br> <b>{address}</b>',
  confirmTrWaring: 'Are you sure?',
  lease: 'Rent',
  bind: 'Bind',
  modify: 'Modify',
  scores: 'Score(s)',
  back: 'Go Back',
  reEdit: 'Edit Again',
  open_wallet: 'Open Wallet',
  access_wallet: 'Select method to open wallet',
  keystore_file: 'Keystore File',
  private_key: 'Private Key',
  select_wallet_file: 'Select Wallet File',
  paste_key: 'Paste or enter private key',
  enter_key: 'Enter password',
  continue: 'Continue',
  unlock: 'Unlock',

  heads: {
    logo: 'DBChain',
    home: 'Home',
    gpu: 'Rent GPU',

    miner: 'Lease GPU',
    talk: 'AI Developer Forum',

  },
  footer: {
    DBChain: 'DeepBrain Chain',
    DBCMiner: 'DBCMiner',
    DBCTalk: 'DBCTalk',
    KuCoin: 'KuCoin',
    DBCTrade: 'DBCTrade',
    DBCloud: 'DBCloud',
    HuobiPro: 'Huobi Pro',
    GateIo: 'Gate.io'
  },
  gpu: {
    myWallet: 'My Wallet',
    myMachine: 'My Machine',
    machineList: 'Machine List',
    walletAddress: 'Wallet Address',
    notice_1: 'Please keep your private key safe, once a private key is lost, no one can retrieve your DBC asset for you!',
    amount: ' Amount',
    howBuyDBC: 'How to buy DBC',
    exchangeCash: 'USD value',
    showDeitailDBC: 'See DBC information:',
    clickCoinmarktcap: 'Click to read more',
    transfer: 'Transfer',
    myMachineTitle: 'My order number',
    pcs: 'Machine number (how many)',
    machineOnLine: 'Machine(s) online',
    machineOffLine: 'Machine(s) offline',
    remainingTime: 'Time left',
    reload: 'Continue renting',
    payDBCs: 'Total DBCs',
    payPrice: 'DBC price when paying',
    actualPrice: 'Total fee incurred',
    currentRemaining: 'Remaining',
    userTime: 'Time used',

    gpuBilling: 'GPU price at the time of payment',


    storage: 'Storage',

    DBCRemaining: 'Current DBC balance',
    exchangeDBC: 'DBC amount',
    machineRemaining: 'Available machine(s)',
    HDSpace: 'HD Space',
    from: 'From',
    addTo: 'To',
    originalPrice: 'Original price',
    currentPrice: 'Current price',
    rate: 'Review',
    createWallet: 'Create Wallet Account',
    openWallet: 'Open Wallet Account',
    rentMachine: 'Open or create wallet to rent machine(s)',
    mcStatusTitle: 'Machine Status', // new
    idle_status: [
      'All Machines',
      'Idle Machines',
      'Rented Machines'
    ], // new

    dbc_version: [
      'All',
      'V0.3.7.2'
    ],
    have_ip: [
      'All',
      'NO',
      'YES'
    ],
    cumulativeDuration: 'Cumulative rental time', // new

    lengthOfAvailableTime: 'Longest available time', // new
    choseGpuCount: 'Select GPU amount', // new
    bindMail: 'Email', // new
    bindMailInfo: 'This email address is used to receive the SSH account log in information for machine<br>' +
      'Before you rent a GPU you must go to my machine page to bind an email address',
    modifyMail: 'Modify',
    mailAddress: 'email address',
    inputMail: 'Please enter email address',
    inputNewMail: 'Enter email address',
    receiveMail: 'Receive email',
    receiveMailInfo: 'Please click receive email and enter the DBC amount specified in the email to complete verification',
    verifyDbc: 'Please enter the amount of DBC for verification',
    attentionDecimal: 'Please pay attention to the decimal',
    startBind: 'Start binding',
    mcDetails: {
      th_1: 'User wallet address',
      th_2: 'Actual traded DBC amount',
      th_3: 'Disruption',
      th_4: 'Amount of GPU rented',
      th_5: 'DBC refund amount',
      th_6: 'Total bought time by user',
      th_7: 'Actual usage time',
      th_8: 'User rating'
    },
    userRate: 'User review',
    mcTradeInfo: 'Machine transaction information',
    backDbcNum: 'Amount of DBC being refunded',
    rateMsg: 'How many stars would you rate the machine',
  },

  county: 'Country',
  idle_status: 'Machine Usage Status',
  total_time: 'Total Rental Time',
  total_rent_count: 'Times Rented',
  error_rent_count: 'Times Disrupted',
  disk_GB_perhour_dollar: '',
  length_of_available_time: 'Available Time',
  gpu_price_dollar: ' Each GPU Price/h',
  gpu_count: 'GPU Amount',
  tensor_cores: 'Tensor Cores',
  half_precision_tflops: 'Half-Precision',
  single_precision_tflops: 'Single-Precision',
  double_precision_tflops: 'Double-Precision',
  gpu_ram_size: 'GPU RAM',
  gpu_ram_bandwidth: 'GPU RAM Speed',
  pcie_bandwidth: 'PCIE Speed',
  cpu_numbers: 'CPU Sores',
  ram_size: 'RAM Size',
  disk_bandwidth: 'HD Speed',
  inet_up: 'Upload Speed',
  inet_down: 'Download Speed',
  have_ip_title: 'Independent IP',
  onlines_tatus: 'Machine Online Status',
  disk_space: 'HD Space',
  dbc_version_title: 'DBC Version',

  msg: {
    dlg_0: 'machine current longest available time {time},minimal rental time is one hour \n ' +
      'Once the rented time for the machine is up, all data in the machine will be cleared, so make sure you rented the sufficient amount of time.\n' +
      'Once you are done with the machine you can cancel the rest of the rental time and receive refund in your wallet for the time you did not use, only fees incurred by actual usage will be charged. ',

    dlg_5: 'If the machine stops abruptly during use and the usage time has not exceeded 144 hours, all DBC will be refunded. \n' +
      '<br>' + 'If the usage time exceeds 144 hours then a total of DBC equal to 144 hours usage will be refunded.',
    wallet_0: 'Save your private key file in a safe place, such as writing it down and putting it in a safe.',
    wallet_1: '' +
      '<b>Do not lose it!</b>' +
      'If lost it can not be retrieved' +
      '<br>' +
      'DO not share it. Do not send it to anyone on WeChat, QQ, Facebook, Line, KakaoTalk, WhatsApp or any other communication software' +
      'If you use this document on a malicious phishing website your asset will be stolen!' +
      '<br>' +
      'You must have a back-up!' +
      'Treat it as if one day if could be worth millions of USD',
    wallet_2: 'Save your private key',
    wallet_3: '<b>Do not lose it</b>' +
      'If lost it can not be retrieved<br>' +
      '<b>DO not share it. Do not send it to anyone on WeChat, QQ, Facebook, Line, KakaoTalk, WhatsApp or any other communication software</b>' +
      'If you use this document on a malicious phishing website your asset will be stolen!<br>' +
      '<b>You must have a back-up!</b>' +
      'Treat it as if one day if could be worth millions of USD',
    wallet_4: 'Private key incorrect',
    wallet_5: 'You must remember your password, do not lose it, ' +
      'you need this password and your private key to unlock your wallet'
  },
  home: {
    intr_dbchain_1: "DBChain",
    intr_yousanai_1: "YouSanAI",
    intr_aionego_1: "AIOneGo",
    intr_deepshare_1: "Deepshare",
    intr_sharegpu_1: "ShareGPU",
    intr_panchuangai_1: "PanChuangAI",
    intr_yalecloud_1: "YaleCloud",
    intr_52lm_1: "52LM",
    intr_dimi_1: "DiMiAI",
    intr_mayi_1: "MaYiPool",
    intr_windywinter_1: "WindyWinter AI",
    intr_1024lab_1: "1024LAB",
    intr_litaai_1: "LITA AI",
    intr_ainlp_1: "AINLP-DBC GPU service platform,",
    intr_52cv_1: "52CV",
    intr_redstonewill_1: "RedStoneAI",
    intr_1: ' provides GPU rental service.join us! can help your machine very convenient access to the DBC network, gain revenue. \n' +
      '\n' +
      ' If your GPU is ever idle, you can connect it to the DBC network to earn DBC tokens and enjoy the benefit of the tokens appreciation. \n ' +
      '\n' +
      ' If your GPU is ever idle for more than one hour, you can connect it to the DBC network to earn DBC tokens.',
    intr_2: 'Our GPUs come from all over the world, connected through the DBC distributed network, there is no centralized server in here, your data will not be stolen. \n',
    intr_3: ' In the DBC network You need the DBC token to rent and use GPU(s).GPU(s) are priced in USD, the higher the price of DBC the less DBC you need in order to pay.',

    intr_4: ' is committed to\n ' +
      'providing users with cost-effective AI computing service, using DBC token for payment.\n ' +
      '  DBC is a decentralized AI computing network distributed around the world. Through us, you can easily use the machines in the network.\n ' +
      '  We provide various services to meet your needs.\n ' +
      '  In the DBC network you can find cheap and varied GPUs. Throughout the usage of the GPU(s) your data are encrypted during transmission.',
    intr_5: 'In the DBC network you can find cheap and varied GPUs. Throughout the usage of the GPU(s) your data are encrypted during transmission.',
    intr_6: 'GPU rental is charged by the minute, if a GPU machine stops abruptly during usage you can be compensated up to 144 hour\'s rental fee.',
    intr_7: 'DBC will start mining from 2020 and each year 500 million DBCs are mined, starting from the 4th year, 250 millions are mined each year and the amount is halved every 5 years from then on. A total of 4 billion DBCs will be mined.',
    intr_8: 'Join DBC income combo: supernodes reward + mining reward + rental reward',
    start: 'Start renting GPU',
    github: 'GitHub',
    video: 'Video',
    startMiner: 'Start renting GPU'
  },
  help: {
    'title': 'How to buy DBC',
    '1': '1.Buy DBC, enter',

    '2': '2.Buy DBC from Huobi',
    '3': '3.Buy DBC from KuCoin',
    '4': '4.Buy DBC from gate.io',
    '5': '5.Transfer DBC to your account from other wallets that support DBC, such as neotracker.io, O3 Wallet',
    'reloadWallet': 'Deposit and enter wallet account',
  },
  miner: {
    addMc_Title: 'Please add your machine according to the following steps:',
    addMc_editTitle: 'Edit again',
    addMc_setupApp: 'Install software',
    addMc_bind: 'Bind machine',
    addMc_area: 'Select time zone',
    addMc_price: 'Set a price',
    addMc_dbc: 'Enter verification code',
    addMc_mail: 'Click here to receive verification code',
    addMc_date: 'Set a date',
    addMc_week: 'Repeat by the week',
    period_1: 'All day (all times)',
    period_2: 'Specified time slot',
    rent: 'lease your machine',
    rentMachine: 'Open or create wallet to lease your machine',
    addMc_msg_1: [
      'Install DBC software',
      'Please install according to user manual.'
    ],
    addMc_msg_2: 'After installation you need to enter current wallet address in order to bind your machine on the platform.',

    addMc_msg_4: [
      'Each GPU\'s price ',

    ],
    addMc_msg_5: '',

    addMc_msg_6: [
      'Please ensure the internet and electricity connection of your machine, if either is stopped during usage, then the DBC equal to 144 hours of sage staked will be deducted. If the rental time is less than 144 hours, then',
      'we will deduct DBC base on the actual usage time!'
    ],
    mc_msg_1: 'if the machine stops during usage, then the DBC equal to 144 hours of sage staked will be deducted. <br>If the rental time is less than 144 hours, then all DBC will be deducted'
  },
  mcList: {},
  my_machine_binding_email: 'Email',
  my_machine_vocing: 'Verifying, this will take a few minutes',
  my_machine_isnormal_over: 'Order completed',
  my_machine_nonormal_over: 'Order disrupted',
  my_machine_order_cancer: 'Order cancelled',
  my_machine_order_rent_success: 'Order in use',
  my_machine_order_vocing_pay: 'Verifying payment, this will take a few minutes.',
  my_machine_order_pay_error: 'verification for payment failed,over time',
  my_machine_order_return_dbc: 'Refund successful',
  my_machine_order_vocing_machine_success: 'Verification for machine environment successful',

  my_machine_beused_time: 'Time used',
  my_machine_hour: 'h',
  my_machine_min: 'm',
  my_machine_dbc_version: 'Version',
  my_machine_china: 'China',
  my_machine_idle_gpus: 'Number of idle GPU',
  my_machine_length_of_available_time: 'Longest available rental time',
  my_machine_total_time_be_used: 'Total rental time',
  my_machine_total_rent_count: 'Times Rented',

  list_country: 'Country',
  list_dbc_version: 'DBC Version',
  list_try: 'Trial',
  list_rentout: 'Rent',
  list_china: 'China',
  list_idle_gpus: 'Idle GPUs',
  list_length_of_available_time: 'Available Time',
  list_total_time_be_used: 'Total Rental Time',
  list_total_rent_count: 'Times Rented',
  list_error_rent_count: 'Times Disrupted',
  list_cuda_version: 'CUDA',
  list_disk_space: 'HD Space',
  list_cpu_type: 'CPU Model',
  list_half_precision_tflops: 'Half-Precision',
  list_gpu_ram_size: 'GPU RAM',
  list_disk_bandwidth: 'HD Speed',
  list_cpu_numbers: 'CPU Cores',
  list_ram_size: 'RAM Size',
  list_single_precision_tflops: 'Single-Precision',
  list_gpu_ram_bandwidth: 'GPU RAM Speed',
  list_inet_up: 'Upload Speed',
  list_double_precision_tflops: 'Double-Precision',
  list_pcie_bandwidth: 'PCIE Speed',
  list_inet_down: 'Download Speed',
  list_os: 'OS',
  list_all: 'All',
  list_create_order_success: 'Order created successfully',

  myMachine_rent_success_msg: 'Machine has been rented successfully, log in details are sent to your email, please check your email and save the log in details.',
  myMachine_is_pay_vocing: 'Paymet being verified',
  myMachine_maybe_is_used: 'Machine might be rented by someone else already, please cancel order and rent another machine.',
  myMachine_is_vocing_machine: 'Verifying whether machine environment is suitable, please wait, it will take a few minutes.',
  myMachine_is_dbc_transfering: 'DBC transaction in progress',
  myMachine_is_transfer_error: 'DBC transaction failed, please pay again',
  myMachine_return_dbc: 'Refund tokens',
  myMachine_confirm_pay: 'Confirm and pay',
  myMachine_concer_order: 'Cancel order',
  myMachine_no_double_pay: 'Pay attention to not pay twice',
  myMachine_please_confirm_pay: 'Please confirm payment',
  myMachine_confirm: 'Confirm',
  myMachine_cancer: 'Cancel',
  myMachine_code_send: 'Verification code has been sent to your email, please enter the verification code',
  myMachine_cancer_order: 'Cancel order',

  footer_friend: 'Useful links',
  //footer_service: 'Customer service: :support@dbchain.ai, the customer service will get back to you in 24 hours',

  dlg_bindMail_input_email: 'Please enter correct email address',
  dlg_bindMail_binding_error: 'Binding failed',
  dlg_bindMail_no_dbc: 'DBC balance not enough to bind email address, please deposit at least 1 DBC',

  dlg_lease_time: 'Usage time',
  dlg_lease_wallet_balance: 'Current DBC wallet balance',
  dlg_lease_create_order: 'Create order',

  dlg_rate_edit_evalute: 'Edit review',
  dlg_rate_please_input: 'Please enter content',
  dlg_rate_please_code: 'Please enter verification code',
  dlg_rate_send_code: 'Send verification code',

  dlg_reload_one: 'One',
  dlg_reload_tow: 'Two',

  dlg_return_dbc: 'Refund token',
  dlg_input_code: 'Please enter email verification code',
  dlg_get_code: 'Receive verification code',

  dlg_try: 'Trial',
  dlg_try_condition: 'Conditions for a trial: current wallet holds more than 1,000 DBC in balance',
  dlg_try_fee: 'Trial fee: 0 DBC',
  dlg_try_time: 'Trial time: 30 minutes',
  dlg_try_gpu_count: 'GPU amount: 1',
  dlg_try_confirm: 'Confirm payment',
  dlg_try_msg: 'Once payment is successful, machine log in details will be sent to your email address',

  drop_item_select: 'Please select',
  drop_item_no_data: 'No data',

  wallet_box_adddress: 'Wallet address: your wallet address is also your account, when you give this address to another person, the other person can send DBC token to your address.',
  wallet_box_keystore: 'Private key saved document: private key saved document exist in an encrypted password form to save your private key, we suggest you always use your private key to unlock your wallet.',
  wallet_box_key: 'Your private key is the unencrypted version of your private key, this means no password is needed. If someone finds your unencrypted private key they can access your wallet without a password. So please always use your encrypted private key.',

  creat_wallet_index_download: 'Please download the encrypted private key',

  mywallet_create: 'Create wallet account',
  mywallet_open: 'Open wallet account',
  mywallet_open_create: 'Open or create wallet account to rent machine(s)',
  mywallet_transfer_record: 'Transaction record',
  mywallet_display: 'Open or create wallet to view transaction record',

  machine_detail_many: ' participate in rating, rating',
  machine_detail_no: 'No',
  machine_detail_yes: 'Yes',
  machine_order_rentout: 'Machine rental order information',
  machine_order_evaluation: 'User review(s)',
  machine_order_is_over: 'Order completed',
  machine_order_is_nonormal_over: 'Order disrupted',
  machine_order_cancer: 'Order cancelled',
  machine_order_using: 'Order in use',
  machine_order_vocing_pay: 'Verifying payment',
  machine_order_vocing_failure: 'verification for payment failed，over time',
  machine_order_return_dbc_success: 'Refund successful',
  machine_order_is_used_time: 'Time used',
  machine_order_hour: 'Hour(s)',
  machine_order_min: 'Minute(s)',

  add_machine_download: 'Download user manual',
  add_machine_input_time: 'Enter time',
  add_machine_from: 'From',
  add_machine_from_time: 'Start renting after hour(s)',
  add_machine_to: 'To',
  add_machine_to_time: 'Stop renting after hour(s)',
  add_machine_input_id: 'Please enter machine ID',
  add_machine_machine_id: 'Machine ID',
  add_machine_msg_tips: 'the platform charges 10% fee.\n' +
    'Once mining starts, the entire DBC network will have 95,890,000 DBC as mining rewards daily. The reward will be allocated automatically according to the overall performance of machines. We will try to connect machine(s) at the first available instance', //9.15 21.27

  my_machine_miner_info: 'Information of machine(s) that I lease',
  my_machine_miner_tips: 'If the machine stops during usage then the DBC for 7 days of usage staked in the contract will be deducted. If the rental was less than 7 days then all DBC is deducted.',
  my_machine_miner_rentout: 'Lease machine(s)',
  my_machine_miner_vocing: 'Verifying, it will take a few minutes',
  my_machine_miner_status: 'Machine Status',
  my_machine_miner_online: 'Online',
  my_machine_miner_offline: 'Offline',
  my_machine_miner_can_beused_time: 'Available time',
  my_machine_before: 'Before',
  my_machine_after: 'After',
  my_machine_start: 'Start',
  my_machine_end: 'Ends in (hours)',
  my_machine_can_time: 'Available time',
  my_machine_edit: 'Edit again',

  open_wallet_cannot_read: 'Your browser does not support reading of local document',

  footer_service: "Customer support",
  footr_reply: "customer service will reply within 24 hours",
  footer_service_dbchain: "support@dbchain.ai", //9.17 19:33
  footer_service_yousanai: "longpeng@yousanai.cn", //9.17 19:33
  footer_service_aionego: "aionego66@hotmail.com", //9.17 19:33
  footer_service_deepshare: "", //9.17 19:33
  footer_service_panchuangai: "zhouas@panchuangai.cn", //9.17 19:33
  footer_service_sharegpu: "758655995@qq.com", //9.17 19:33
  footer_service_yalecloud: "yalesoft@163.com", //9.17 19:33
  footer_service_52lm: "2483098379@qq.com", //9.17 19:33
  footer_service_dimi: "18019983388@163.com", //9.17 19:33
  footer_service_mayi: "mayipool@163.com", //9.17 19:33

  footer_service_windywinter: "591498086@qq.com", //9.17 19:33
  footer_service_1024lab: "2413810931@qq.com", //9.17 19:33
  footer_service_litaai: "ranran@litaai.xyz", //9.17 19:33
  footer_service_ainlp: "textminer@foxmail.com", //9.17 19:33
  footer_service_52cv: "amos@52cv.net", //9.17 19:33
  footer_service_redstonewill: "redstonewill@hotmail.com", //9.17 19:33
  list_start_rentout: 'minutes later, it can be rented',
  list_can_rentout: 'Users can rent it now',
  my_gpu_count: 'The number of gpus I rent ', //9.17 19:33

  pay_over_time: "Unable to pay. It has expired for 10 minutes. The order will be cancelled within 1 minute", //9.29 00:26
  click_to_view: 'click to view',
  continue_pay: "Relet",
  ...enLocale
}
