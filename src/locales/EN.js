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
    mymachine: "我的机器",
    mywallet: "我的钱包",
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
    common: "普通AI训练区",
    highStabilityAITrain: "高稳定AI训练区",
    aiInference: "AI推理区",
    hashCompute: "FileCoin计算区",
    superNodeCompute: "超级节点算力区"
  },

  country: 'Country',
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
    intr_alpha_dbchain_1: "Alpha-dbchain",
    intr_xyzlab_1: "XYZ Lab",
    intr_gpgpu_1: "GPGPU",
    intr_rocketai_1: "RocketAI",
    intr_deepbit_1: "DeepBit",
    intr_aichriscloud_1: "AIChrisCloud",
    intr_vnxmart_1: "VNX AI Marketplace",
    intr_aiaicloud_1: "AIAICloud",
    intr_snbt_1: "SNBT AI",
    intr_heekmind_1: "HeekMind",
    intr_aicv_1: "AICV",
    intr_freegpu_1: "FreeGpu",
    intr_boincplanet_1: "BoincPlanet",
    intr_shareaiot_1: "ShareAIOT",
    intr_topgpu_1: "TopGpu",
    intr_thinkotech_1: "ThinkoAITech",
    intr_coolgpu_1: "CoolGpu",
    intr_scclouds_1: "The Stars",
    intr_nvidiaai_1: "NvidiaAI",
    intr_deligpu_1: "DeliGPU",
    intr_longway_1: "Longway",
    intr_sharedgpu_1: "SharedGPU",
    intr_aipower_1: "AIPower",
    intr_cvstudy_1: "CVStudy",
    intr_gpuhub_1: "GPUHub",
    intr_district51_1: "District51",
    intr_deepmind_1: "DeepMind AI",
    intr_transportation_1: "Transportation",
    intr_planetc_1: "PlanetC",
    intr_sdnu_1: "SDNUAI",
    intr_freegputop_1: "FreeGPU",
    intr_tensorgpu_1: "TensorGPU",
    intr_opengpu_1: "OpenGPU",
    intr_aiyanxishe_1: "AI YanXiShe",
    intr_codefate_1: "CodeFate",
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
    intr_snbt_4: ' is committed to providing users with cost-effective artificial intelligence computing services, Hong Kong strategic international investment co., ltd. and the ordos government reached a strategic cooperation in 2017, the establishment of ordos sanolbert technology co., ltd. is committed to the block chain + artificial intelligence field. Build "three research, two production and one platform" industrial closed loop ecological system, take big data industry as an opportunity, based on ordos high-tech industry planning cloud computing industrial park, build super computing industry platform, with wisdom and data to boost the value. Outline the possibilities of the future.',
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
  list_rentout_gpu: "租用GPU容器", //2020 1 9
  list_rentout_cpu: "租用CPU容器", //2020 1 9
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
  myMachine_no_double_pay: 'Pay attention to not pay twice, you can check My Wallet, transfer record. If you have paid, please click  Paid',
  myMachine_please_confirm_pay: 'Please confirm payment',
  myMachine_confirm: 'Confirm',
  myMachine_cancer: 'Cancel',
  myMachine_paid: 'Paid',
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
  dlg_try_gpu_count: 'GPU amount: 0',
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
  footer_service_deepshare: "yuanj@deepshare.net", //9.17 19:33
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
  footer_service_alpha_dbchain: "1123622944@qq.com", //9.17 19:33
  footer_service_xyzlab: "gpu@xyzlab.ai", //9.17 19:33
  footer_service_gpgpu: "sharegpu@protonmail.com", //9.17 19:33
  footer_service_rocketai: "xing_hua_zhang@126.com", //9.17 19:33

  footer_service_deepbit: "a18159851988@163.com", //9.17 19:33
  footer_service_aichriscloud: "zhangmw_play@163.com", //9.17 19:33
  footer_service_vnxmart: "customerservice@visionx.org", //9.17 19:33
  footer_service_aiaicloud: "kf@aiaicloud.cn", //9.17 19:33
  footer_service_snbt: "368496964@qq.com", //9.17 19:33
  footer_service_heekmind: "amdin@heekmind.com", //9.17 19:33
  footer_service_aicv: "944830401@qq.com", //9.17 19:33
  footer_service_freegpu: "1760398969@qq.com", //9.17 19:33
  footer_service_boincplanet: "info@boinc.io", //9.17 19:33
  footer_service_shareaiot: "3123029727@qq.com", //9.17 19:33
  footer_service_topgpu: "treenewbeetogether@163.com", //9.17 19:33
  footer_service_thinkotech: "284522212@qq.com", //9.17 19:33
  footer_service_coolgpu: "coolgpu@163.com", //9.17 19:33
  footer_service_scclouds: "ser@scclouds.cn", //9.17 19:33
  footer_service_nvidiaai: "167442878@qq.com", //9.17 19:33
  footer_service_deligpu: "arrky@mail.ru", //9.17 19:33
  footer_service_longway: "2546954766@qq.com", //9.17 19:33
  footer_service_sharedgpu: "wyking@163..com", //9.17 19:33
  footer_service_aipower: "1272068154@qq.com", //9.17 19:33
  footer_service_cvstudy: "cvstudy@163.com", //9.17 19:33
  footer_service_gpuhub: "gpuhub@foxmail.com", //9.17 19:33
  footer_service_district51: "district51_604@126.com", //9.17 19:33
  footer_service_deepmind: "528121344@qq.com", //9.17 19:33
  footer_service_transportation: "jinleizhangbjtu@gmail.com", //9.17 19:33
  footer_service_planetc: "planetc_ai@sina.com", //9.17 19:33
  footer_service_sdnu: "sdnuai@163.com", //9.17 19:33
  footer_service_freegputop: "hill_gpu@163.com", //9.17 19:33
  footer_service_tensorgpu: "support@tensorgpu.com", //9.17 19:33
  footer_service_opengpu: "1184823135@qq.com", //9.17 19:33
  footer_service_aiyanxishe: "kefu@yanxishe.com", //9.17 19:33
  footer_service_codefate: "wangming1785@foxmail.com", //9.17 19:33
  list_start_rentout: 'minutes later, it can be rented',
  list_can_rentout: 'Users can rent it now',
  my_gpu_count: 'The number of gpus I rent ', //9.17 19:33

  pay_over_time: "Unable to pay. It has expired for 10 minutes. The order will be cancelled within 1 minute", //9.29 00:26
  click_to_view: 'click to view',
  continue_pay: "Rerent",

  continue_pay_time: "Rerent time",
  continue_pay_details: "Order details",
  click_to_view_continue_pay: "View rerent order details",
  continue_pay_pay_success: "Paid successfully",
  continue_pay_success: "Rerent successfully",
  continue_pay_order_is_over: 'Order end',
  restart_machine: 'Restart', //12.22,
  cpu_mode_switch: "Payment method requires DBC token to be able to use the CPU docker. Pledging doesn't actually cost you any DBC, you just need to pledge DBC then you can use the CPU docker for free. Once your usage has ended all DBCs you pledged will be returned to you. The two methods of usage are not different from each other.",
  payment: " Payment method ",
  deposit: " Pledging method ",
  pleae_create_wallet: "Please create wallet account in My Wallet first",
  choseImages: "Please select mirror",
  diskspace_dlg: "HD space",
  diskspace_giving: "Free giveaway",

  diskspace_giving_gpu: "Each GPU gives you",
  buy_diskspace: "Buy extra HD space",
  disk_hour: "G*h",
  disk_max: "You can buy a maximum of",
  memory_dlg: "RAM allocated",
  memory_every_gpu: "Each GPU's allocated RAM is ",
  lease_gpu: "Rent GPU docker",
  over_max_disk: "You've exceeded the HD space you purchased,if you increase your GPU amount you can increase your HD space limit ",
  diskspace_remaining: "Maximum HD space available",
  memory_more: "The more HD space you buy the more RAM you are allocated",
  open_cpu_to_gpu: "Activate GPU",
  diskspace_cpu_data: "Current used HD space of the CPU is:",
  diskspace_gpu_data: "Current used HD space of the GPU is:",
  diskspace_new_gpu: "Space left on your docker after activating GPU",
  diskspace_every_cpu_can_buy: "Each GPU can purchase a maximum of",
  myMachine_is_vocing_machine_update: "Activating GPU, according to the amount of data already stored in your docker you need approximately",
  container_is_closed_update: "In the process of starting the GPU, the current CPU docker will be in a paused state and cannot be used.After the activation is complete, you can log in again",
  rent_cpu_cotainer: "Rent CPU docker",
  open_gpu_cpu_to_gpu: "Activate GPU",
  deposit_tips1: "1.The free docker function can help save costs when preparing the environment and transferring data. When all the conditions are ready, you can re-enable GPUs for training or inference",
  deposit_tips2: "2.The pledge function does not cost you anything, but requires DBC as a deposit. The deposit will be automatically returned when the docker is stopped or the GPU is turned on.",
  deposit_tips3: "3.The deposit will be on the blockchain smart contract, you can check the status of the deposit at any time through the wallet address, no one can use the deposit",
  myMachine_rent_success_msg_update: "GPU activation successful, please wait 3 minutes then you can log in again",
  please_switch_cpu_mode: "Please select method of using CPU docker",
  switch_diskspace: "Select HD space",
  switch_memory: "Select RAM space",
  deposit_dbc_count: "DBC amount needed to be pledged",
  return_deposit_dbc: "During the usage of the machine, if the machine is interrupted, all pledged DBC will be returned",
  deposit_time_tip: "The current machine can be used {time} for the longest, and the shortest time is one hour.",
  stop_time_tip: "If the machine's rental time expires, the docker will be deactivated.And if your wallet balance is less than 20, 000 DBC, the docker will be destroyed immediately.If your wallet balance exceeds 20, 000 DBC, all the data on the machine will be " +
    "automatically retained for 7 days (this function requires the machine's DBC version to be equal to or newer than 0.3 .7 .3, and your wallet balance must also exceed 20, 000 DBC during this period).You can" +
    " continue to enable the docker at any time within 7 days and use it.The docker will be destroyed if it is deactivated for more than 7 days." +
    "After you finished using the machine, you can cancel the lease in advance, and the pledged DBC will be returned to your wallet.",
  deposit_dbcs_cpu: "Total DBC pledged",
  cpu_containers_list: "CPU docker(s) already created",
  cpu_containers_can_use_memory_list: "CPU docker can allocate RAM",
  cpu_containers_can_use_disk_list: "CPU docker can allocate HD",
  gpu_containers_can_use_memory_list: "GPU docker can allocate RAM",
  gpu_containers_can_use_disk_list: "GPU docker can allocate HD",
  memory_space: "RAM space",
  howsellDBC: "How to sell DBC",
  helpsell: {
    title: "How to sell DBC",


    "2": "1.Sell DBC from Huobi（Sell DBC into Bitcoin first, then sell BTC for RMB to transfer into bank account or or Alipay）",
    "3": "2.Sell DBC from Kucoin",
    "4": "3.Sell DBC from Gate.io",


  },
  dbc_price_wallet: "DBC Price",
  dbc_price_usd: "USD",
  stopGpu_mymachine: "Stop GPU",
  stopgpu_please_switch_cpu_mode: "After the GPU is stopped, the GPU docker will become a CPU docker. There are two ways to use the CPU docker. The payment method requires you to pay DBC to use the CPU docker. The pledging method does not actually cost you any DBC. You only need to pledge the DBC to use the CPU docker for free. After use, all the pledged DBC will be returned to you. The two usage methods have the same function.",
  stopgpu_to_cpu_payment: "Stop GPU, switch to CPU docker",
  less_data_disk_10g: "Available HD space cannot be smaller than 10G",
  less_data_disk_1g: "Available HD space cannot be smaller than 1G",
  less_data_disk_over_max: "GPU docker data overload, cannot stop GPU",
  diskspace_new_cpu: "After shutting down GPU, docker space available is",
  myMachine_rent_success_msg_update_stop_gpu: "Successfully stopped GPU, please wait 3 minutes then you can log in",
  myMachine_is_vocing_machine_update_stop_gpu: "Stopping GPU, according to the amount of data already stored in your docker you need approximately",
  container_is_closed_update_stop_gpu: "In the process of stopping the GPU, the current GPU docker will be in a paused state and cannot be used.After the activation is complete, you can log in again",
  open_gpu_stopped: "Activate as GPU docker",
  open_cpu_stopped: "Activate as CPU docker",
  container_id: "Docker ID",
  stop_containers_number: "Docker(s) I've stopped: ",
  remaining_time_length: "Countdown on docker destruction",
  stopped_time_length: "Time that docker has been stopped:",
  image_data_stopped: "Space that docker took up:",
  container_isnormal_over: "Docker has been stopped",
  dbc_vesion_error: "Your DBC version is older than 0.3.7.3. hence does not support docker activation function",
  no_idle_gpus: "Current machine has no available GPU",
  no_container: "Current machine's CPU docker is full ",
  stop_to_cpu_container: "Activate as CPU docker",
  myMachine_is_vocing_machine_update_stop_to_open: "Activating docker, according to data amount already stored in your docker it will take approximately: ",

  myMachine_rent_success_msg_update_stop_to_open: "Successfully activate docker, please wait 3 minutes then you can log in",
  stop_to_gpu_container: "Activate as GPU docker",
  user_defined: "Self-defined installation",
  cpu_container_instruaction: "Kind reminder: rent CPU docker first, prepare your environment and data, then switch to GPU docker, that way you can save on cost",
  diskspace_data_stop: "HD space already used in current docker：",
  diskspace_new_cpu_stop: "Space available after docker is activated",
  myMachine_gpu_rentout: "Machine(s) I rented out",
  lessdbc: "DBC balance not enough",
  transfer_error: "Transfer failed, please try again",
  transfer_success: "Transfer successful",
  dbc_lack_of_balance: "DBC balance not enough",
  please_confirm_pay: "Please confirm payment",
  stop_instruaction: "Kind Reminder: Your DBC balance is more than 20,000DBC, you can activate docker already stopped, historical data are saved within",
  dbcnum_error: "Number(s) keyed in incorrect",
  your_country: "Add geographic location of the machine",
  stopgpu_tip_mymachine: "After stopping the GPU, it will switch to a CPU docker, all data will be saved and can continue to used",
  myMachine_rentout_success_msg: "The verification is successful, and the machine can be rented out after 3 minutes",
  myMachine_rentout_error: "The verification failed, the machine cannot go online, contact technical supportsupport@dbchain.ai",
  myMachine_is_vocing_machine_rentout: "Verifying whether the machine is available, please be patient, it will take 5-10 minutes",
  my_machine_miner_vocing_rentout: "Verifying",
  my_machine_miner_vocing_error: "Verification failed",
  stoprent_tip_mymachine: "After canceling the lease, if your current wallet balance is greater than 20,000DBC, the data will continue to be saved and can be used after you activate the docker in my stopped docker",
  list_gpu_count_tip: "GPU model and total number of GPUs of the current machine",
  transfer_tips: "You can transfer DBC to the other party by entering the DBC wallet address of the other party in the address area, then enter the number of DBCs to be transferred then click 'Send', about 10-30 seconds the other party will receive the DBC",
  dbc_price_wallet_tips: "DBC prices fluctuate all the time, please pay attention to the risks when buying DBC",
  dbcChange_tips: "DBC 24hours price change",
  dlg_bindMail_dbc_tip: "Kind reminder: At least 1 DBC is required in the wallet to be able to bind successfully",
  dlg_bindMail_voc_failure: "Verification failed, please get verification code again to verify",
  restart_tip_mymachine: "If the docker cannot be connected, you can restart the docker, the process will be killed, data will not be lost, and the environment will not be reset",
  send_email_error: "E-mail failed to sent please click 'Re-sent email' ",
  send_email_repeat: "Re-sent email",
  diskspace_less_zero: "Available space in docker cannot be less than 1G",
  myMachine_rentout_success_msg_mining: 'The verification is successful, the current machine is a mining machine, and the machine can be launched on the cloud computing platform in 3 minutes', //2020 4.9
  ...enLocale
}
