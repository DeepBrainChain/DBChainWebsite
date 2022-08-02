import enLocale from 'element-ui/lib/locale/lang/en'

export default {
  /* 关于webtype:
   ** 修改数值时，要把router.js文件开头引入的Home组件切换与此类型一致
   ** 如果是法币聪图云模式，要把根目录下public/index.html 中脚本的 websiteNameIsCongtuCloud变量 修改为true
   */
  webtype: "1",
  website_name: 'dbchain', //yousanai,  dbchain,aionego
  contain_new_wallet: "1",
  $: '$',
  send: 'Send',
  closeWallet: 'Close Wallet',
  toAddress: 'To Address',
  amount: 'Amount',
  from: 'FROM ',
  to: 'TO',
  value: 'VALUE',
  transfer: 'TRANSFER',
  day: 'D',
  hour: 'H',
  password: 'Password',
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
  transfer_ing: "Transferring, please wait...",
  transferSuccess: 'Transaction successful, please wait and check for update on blocks',
  transferFail: 'Transaction Failed',
  confirmTrTitle: 'Confirm Transfer',
  confirmTrMsg: 'You are sending <b>{amount}</b> DBC to this address:<br> <b>{address}</b>',
  confirmTrWaring: 'Are you sure?',
  bind: 'Bind',
  back: 'Go Back',
  open_wallet: 'Open Wallet',
  keystore_file: 'Keystore File',
  private_key: 'Private Key',
  select_wallet_file: 'Select Wallet File',
  paste_key: 'Paste or enter private key',
  enter_key: 'Enter password',
  continue: 'Continue',
  unlock: 'Unlock',
  transfer_tips: "You can transfer DBC to the other party by entering the DBC wallet address of the other party in the address area, then enter the number of DBCs to be transferred then click 'Send', about 10-30 seconds the other party will receive the DBC",
  dbc_price_wallet_tips: "DBC prices fluctuate all the time, please pay attention to the risks when buying DBC",
  dbcChange_tips: "DBC 24hours price change",
  heads: {
    home: 'Home',
    virtual: "Rent GPU Servers",
    virtual1: "Rent GPU VMs",
    gputype: "GPU type",
    area: "engine room",
    room: "Datacenter ID",
    mymachine: "MyMachine",
    mywallet: "MyWallet",
    help: 'Help',
    talk: 'AI Developer Forum',
    audit:'Audit Machine'
  },
  footer: {
    DBChain: 'DeepBrain Chain',
  },
  gpu: {
    myWallet: 'My Wallet',
    myMachine_gpuVirtual: "My Whole GPU",
    myMachine_gpuVirtual1: "My GPU VMs",
    myVerify_gpuVirtual: "My validation GPU VM",
    walletAddress: 'Wallet Address',
    notice_1: 'Please keep your private key safe, once a private key is lost, no one can retrieve your DBC asset for you!',
    amount: ' Amount',
    howBuyDBC: 'How to buy DBC',
    exchangeCash: 'USD value',
    showDeitailDBC: 'See DBC information:',
    clickCoinmarktcap: 'Click to read more',
    transfer: 'Transfer',
    rentMachine: 'Open or create wallet',
    payDBCs:'Total DBC paid',
    userTime: 'Elapsed time',
    payPrice: "DBC price when paid",
    actualPrice: "incurring actual costs",
    currentRemaining: "remaining",
    gpuBilling: "GPU price when paid",
    createWallet: "Create a wallet account",
    openWallet: "Open wallet account",
    mySecurityGroup: "My Security Group", //2021 12.2
  },
  msg: {
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
    wallet_6: 'You must remember your password, do not lose it, ' + 'You need this password and your private key file to unlock the wallet'
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
    intr_changhe_1: "long river cloud",
    intr_dpool_1: "DPool",
    intr_tycloud_1: "TYCloud",
    intr_Nexuicloud_1: "Nexui",
    intr_1: ' provides GPU rental service.join us! can help your machine very convenient access to the DBC network, gain revenue. \n' +
      '\n' +
      ' If your GPU is ever idle, you can connect it to the DBC network to earn DBC tokens and enjoy the benefit of the tokens appreciation. \n ' +
      '\n' +
      ' If your GPU is ever idle for more than one hour, you can connect it to the DBC network to earn DBC tokens.',
    intr_2: 'Our GPUs come from all over the world, connected through the DBC distributed network, there is no centralized server in here, your data will not be stolen. \n',
    intr_3: ' In the DBC network You need the DBC token to rent and use GPU(s).GPU(s) are priced in USD, the higher the price of DBC the less DBC you need in order to pay.',
    intr_4: ' committed to providing users with cost-effective GPU computing services, using DBC TOKEN for settlement. DeepBrain Chain is an infinitely scalable high-performance computing network. Through us, you can easily use the GPU server in DeepBrain Chain. We provide rich services to meet your needs.',
    intr_5: 'In our cloud platform you can find a wide variety of GPUs at an affordable price.',
    intr_7: 'DBC will start mining from 2020 and each year 500 million DBCs are mined, starting from the 4th year, 250 millions are mined each year and the amount is halved every 5 years from then on. A total of 4 billion DBCs will be mined.',
    intr_8: 'Join DBC income combo: supernodes reward + mining reward + rental reward',
    intr_snbt_4: ' is committed to providing users with cost-effective artificial intelligence computing services, Hong Kong strategic international investment co., ltd. and the ordos government reached a strategic cooperation in 2017, the establishment of ordos sanolbert technology co., ltd. is committed to the block chain + artificial intelligence field. Build "three research, two production and one platform" industrial closed loop ecological system, take big data industry as an opportunity, based on ordos high-tech industry planning cloud computing industrial park, build super computing industry platform, with wisdom and data to boost the value. Outline the possibilities of the future.',
    startMiner: 'Start renting GPU'
  },
  help: {
    'title': 'How to buy DBC',
    "3": "1.Buy DBC directly with PayPal or Alipay (can be invoiced)",
    "3-1": "1.Buy DBC directly with PayPal (can be invoiced)",
    '4': '2.Buy DBC from gate.io',
    '5': '3.Transfer DBC to your account from other wallets that support DBC, such as',
    reloadWallet: 'Deposit and enter wallet account',
    enter:'Enter'
  },
  list_total_rent_count: "Total number of rentals",
  list_gpu_ram_size: "GPU memory",
  list_cpu_numbers: "Number of CPU cores",
  list_ram_size: "machine memory",
  list_inet_up: "Upstream bandwidth",
  list_inet_down: "Downlink bandwidth",
  footer_friend: 'Useful links',
  wallet_box_adddress: 'Wallet address: your wallet address is also your account, when you give this address to another person, the other person can send DBC token to your address.',
  wallet_box_keystore: 'Private key saved document: private key saved document exist in an encrypted password form to save your private key, we suggest you always use your private key to unlock your wallet.',
  wallet_box_key: 'Your private key is the unencrypted version of your private key, this means no password is needed. If someone finds your unencrypted private key they can access your wallet without a password. So please always use your encrypted private key.',
  creat_wallet_index_download: 'Please download the encrypted private key',
  mywallet_create: 'Create wallet account',
  mywallet_open: 'Open wallet account',
  mywallet_open_create: 'Open or create wallet account to rent machine(s)',
  mywallet_transfer_record: 'Transaction record',
  mywallet_display: 'Open or create wallet to view transaction record',
  open_wallet_cannot_read: 'Your browser does not support reading of local document',
  footer_service: "Customer support",
  footr_reply: "customer service will reply within 24 hours",
  footer_service_dbchain: "support@dbchain.ai", //9.17 19:33
  footer_service_yousanai: "longpeng@yousanai.cn", //9.17 19:33
  footer_service_aionego: "aionego66@hotmail.com", //9.17 19:33
  footer_service_deepshare: "service@deepshare.net", //9.17 19:33
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
  footer_service_52cv: "微信号 xiao-ma-baoli，请注明“GPU”", //9.17 19:33
  footer_service_alpha_dbchain: "1123622944@qq.com", //9.17 19:33
  footer_service_redstonewill: "redstonewill@hotmail.com", //9.17 19:33
  footer_service_xyzlab: "gpu@xyzlab.ai", //9.17 19:33
  footer_service_gpgpu: "sharegpu@protonmail.com", //9.17 19:33
  footer_service_rocketai: "xing_hua_zhang@126.com", //9.17 19:33
  footer_service_deepbit: "a18159851988@163.com", //9.17 19:33
  footer_service_aichriscloud: "zhangmw_play@163.com", //9.17 19:33
  footer_service_vnxmart: "customerservice@visionx.org", //9.17 19:33
  footer_service_aiaicloud: "kf@aiaicloud.cn", //9.17 19:33
  footer_service_snbt: "368496964@qq.com、3426409648@qq.com", //9.17 19:33
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
  footer_service_changhe: "changhecloud@outlook.com", //9.17 19:33
  footer_service_dpool: "hello@decentral.cc", //9.17 19:33
  footer_service_tycloud: "tyhctech@gmail.com", //9.17 19:33
  footer_service_Nexuicloud: "Info@nexuicom.com",
  pleae_create_wallet: "Please create wallet account in My Wallet first",
  diskspace_remaining: "Maximum free hard disk space",
  memory_space: "memory space",
  howsellDBC: "How to sell DBC",
  helpsell: {
    title: "How to sell DBC",
    "2": "1.Sell DBC from Huobi（Sell DBC into Bitcoin first, then sell BTC for RMB to transfer into bank account or or Alipay）",
    "3": "2.Sell DBC from Kucoin",
    "4": "Sell DBC from Gate.io",
  },
  dbc_price_wallet: "DBC Price",
  dbc_price_usd: "USD",
  lessdbc: "Insufficient DBC balance",
  list_gpu_count_tip: "GPU model and total number of GPUs for the current machine",
  mywallet_open_new: "Open wallet account",
  mnemonic: "mnemonic",
  errorPassword: "wrong password",
  ...enLocale,
  /**
   * hz 新增单词
   */
  startVir: "Start renting a GPU machine",
  home_intr: "The GPU lease is billed on a daily basis, and the machine lease can also be renewed on a daily basis before the machine lease expires.",
  result: 'result',
  verifyPassward: "Please enter account password",
  DBCWallet: "DBC wallet",
  DBCBrowser: "DBC Browser",
  DBCWiki: "DBC Wiki",
  responseTip: 'The submission process takes about 20~40 seconds, please wait a moment',
  // 审核机器
  audit:{
    // 抢单页面
    ordergrabbingMachine:'List of grab orders',
    distributionMachine:'Assign machine list',
    myAudit:'My review list',
    myOrder:'My order list',
    ogMachine_tips:'When someone opens an order to grab an order, the time for the order will count down, and the limit will end in 3 hours. The session information needs to be sent to the verifier within half an hour to the corresponding verifier, and the verifier has one hour to verify. Validators can only submit original information after 3 hours',
    order:'Numbering',
    seeDetails:'waiting for order',
    seeDetails1:'waiting for problem description',
    seeDetails2:'View problem description',
    seeDetails3:'Submit the verification result Hash value',
    seeDetails4:'View virtual machine information',
    status:'state',
    status1:'waiting for order',
    status2:'has been robbed',
    countdown:'Order countdown',
    hasNum:'Number of people who have taken orders',
    start:'Order when opening',
    start1:'Verifying',
    start2:'over',
    tipmsg:'After grabbing the order, wait for the nominee to send the relevant information before viewing the information',
    tipmsg1:'Successful order',
    tipmsg2:'Failed to grab an order',
    tipmsg3:'The machine is issued successfully, please go to my machine list',
    tipmsg4:'You can grab an order after you become a committee',
    message:'wrong description',
    confirm: 'run virtual machine',
    hasError:'There is a problem with the machine',
    noError:'No problem with the machine',
    // 派单页面
    verification:'start verification',
    verification1:'Submit the verification result Hash value',
    verification2:'Submit the original value of the verification result',
    verification3:'View virtual machines',
    verification4:'Create a virtual machine',
    verification5:'order completed',
    mytime:'my verifiable time period',
    verification1_time:'Submit the verification result Hash value countdown',
    verification2_time:'Submit the original value of the verification result countdown',
    savemsg: 'save information',
    savemsgtip: 'Tip: save the original information to the local, when the page submits the original value error, you can go to the chain to operate',
    verification_tips:'The result hash value must be submitted within the verification time',
    verification_tips1_1:'Submission within 12 hours after',
    verification_tips1_2:'contains original value',
    verification_tips1:'Or All three validators have submitted the hash or the submission contains the original value',
    verification_tips2:'Only within the verification time can you view and log in to the virtual machine for machine verification.',
    confirmHash: 'The number of hashes that have been submitted',
    // 我的审核
    machineStatus:'Machine state',
    machineStatus1:'Verifying',
    machineStatus2:'online',
    machineStatus3:'renting',
    machineStatus4:'idle',
    verificationTime: 'Verified times',
    today_profit:'Earnings today',
    total_profit:'Cumulative income',
    all_profit:'Total revenue',
    all_machine:'Total number of machines',
    machineTips:'(Tips: After the machine is taken off the shelf, the profit of the machine will stop)',
    myResult:'my verification result',
    finalResult:'final verification result',
    adopt:'pass through',
    failed:'Did not pass',
    proportion:'Validation ratio',
    record:'Historical Earnings Information',
    date:"Date",
    income:"Earnings (DBC)",
    machine_id: 'machine ID',
    reporter_nonce: 'Reporter random number',
    validator_nonce: "Validator's own random number",
    contentofreport: 'Content of report',
    problem: 'Is there a problem with the machine',
    hasproblem:'has a problem',
    noproblem:'no problem',
    isSupportY:'support',
    isSupportN:'not support',
    err_tip1:'Wallet address cannot be empty',
    err_tip2:'Server exception, please try again later',
    coefficient:'Regional coefficient',
    coefficient1:'coefficient',
    GPUmodel:'GPU model',
    CC_num:'Number of CUDA cores',
    Memoryvalue:'memory value',
    GPUnumber:'Number of GPUs',
    CPUcores:'Number of CPU cores',
    CPUmodel:'CPU model',
    CPUfrequency:'CPU frequency',
    Memory:'RAM',
    Shd_space:'System hard disk space',
    Dhd_space:'Data hard disk space',
    SGC_power:'Single GPU computing power value (X100)',
    Vresults:'Validation results',
    bindEmail:'Please bind your email information first',
    Op_Successful:'Successful operation',
    Op_Failed:'operation failed',
    errormsg:'Failed to get data, please try again later!',
    // 验证GPU列表
    verify_msg: 'Creating, please click the View Virtual Machine button after 5~10 minutes to view the creation result',
    verify_msg1: 'Failed to create, please try again or simply refuse the machine to go online',
    verify_msg2: 'Failed to query virtual machine information, please confirm whether to create',
    verify_msg3: 'Failed to create a virtual machine, please confirm whether the machine has been created or directly refuse to go online',
  
    report_id: 'Order Id',
    report_err: 'Reason for reporting',
    report_info: 'No access after renting',
    report_info1: 'Other faults',
    ogMachine_tips1:'When the error report is that the machine cannot be accessed after being rented, the verification rule is changed to submit the hash value of the verification result within 5 minutes after the first validator grabs the order. Validators are allowed to submit original information after 5 minutes, and the validation will be completed within 10 minutes',
    
  },
  // 租用虚拟机
  virtual: {
    batch: 'Bulk lease',
    choose:'select all',
    commit:'confirm submission',
    batch_Mac: 'rent machine',
    useTime: 'Use time',
    Machine_status:'machine usage status',
    GPU_Num:'Number of GPUs',
    All_Machine:'Total number of machines',
    Idle_Machine:'number of idle machines',
    All_Gpu:'Total number of GPUs',
    Idle_Gpu: 'Number of idle GPUs',
    Daily_Rent: 'daily rent',
    Hours_Rent: 'Hourly rent per card',
    Machine_ID:'machine ID',
    Room_number:'Room number',
    Machine_sta:'Machine state',
    Machine_onlineNum:'Number of free GPUs remaining',
    All:'All',
    Rented:'Rented',
    Idle:'Idle',
    GPU_memory:'GPU memory',
    GPU_type:'GPU model',
    CPU_cores:'Number of CPU cores',
    CPU_frequency:'CPU frequency',
    CPU_type:'CPU model',
    Country:'country',
    City:'city',
    Cumulative_DBC_rent:'Cumulative DBC rent',
    Network_operators:'Network operators',
    Online_time:'Online time',
    Memory_num:'number of memory',
    System_hd:'system hard drive',
    Data_hd:'data hard drive',
    Bandwidth1:'Upstream bandwidth',
    Bandwidth2:'Downlink bandwidth',
    lable_two2:'Operator name',
    tip0:'Please select the machine to rent first',
    tip1:'Reminder: The current machine can be rented for a maximum of 90 days and a minimum of 1 day',
    tip2:'If there is a problem with the machine during use, you can submit a report and appeal, and you can get dbc compensation if the appeal is successful.',
    tip3:'The rental process will incur a rental fee of 10 DBC, which will not be refunded regardless of whether the final rental is successful or not',
    tip4:'The order is successful, and will be redirected to my machine page',
    tip5:'The order failed, DBC will return to the original account later',
    tip6:'Failed to get wallet address',
    tip7:'successfully ordered',
    tip8:'About to jump to my machine page',
    Machine_num:'Number of machines',
    Max_disk_Num:"Maximum available hard disk space for a virtual machine",
    Max_Mem:"Virtual machine maximum available memory",
    total:"Total",
    equivalent:"Equivalent DBC Quantity",
    confirm: 'confirm payment',
    cancal: 'cancel',

    dedicated: 'Support multiple IP'
  },
  // 订单列表
  myvirtual:{
    tip1:'Create a virtual machine before confirming the lease. After the virtual machine is successfully created, confirm the lease. If there is no lease after the countdown, the order will be automatically cancelled.',
    tip2:'Virtual machine is being created...',
    tip3:'Virtual machine created successfully',
    tip4: 'Tip: Before clicking Confirm Lease, please make sure that the virtual machine has been created successfully',
    tip5: 'Are you sure to restart the virtual machine?',
    tip6: 'Reminder: The minimum time for each renewal is 1 day',
    tip7: 'It can be set arbitrarily between 6000-60000. If the same machine wants to create multiple virtual machines, the open ports between different virtual machines cannot overlap, otherwise the virtual machine creation will fail.',
    tip8: 'It can be set between 5600-5899. If the same machine wants to create multiple virtual machines, the ports between different virtual machines cannot overlap, otherwise the virtual machine creation fails.',
    tip9: 'It can be set between 5900-5999. If the same machine wants to create multiple virtual machines, the VNC ports between different virtual machines cannot overlap, otherwise the virtual machine creation fails.',
    tip10: 'RDP port cannot be the same as SSH port',
    tip11: 'The operating system needs to be consistent with the mirror system, where bios defaults to ubuntu as legacy and Windows as uefi',
    tip12: 'The range is "224.0.0.0" to "239.255.255.255", and the two must be separated by an English comma',
    tip13: 'Are you sure you want to delete the virtual machine?',
    tip14: 'Are you sure you want to stop the virtual machine?',
    tip15: 'Are you sure you want to start the virtual machine?',
    tip16: 'Are you sure to modify the virtual machine? Please stop the virtual machine first',
    tip17: 'Reminder: The current machine can be rented for up to {hour} hours, and the shortest is 1 hour',
    tip18: 'Username and password entered incorrectly, please re-confirm and submit',
    title: 'my rental machine',
    tower: 'tower',
    confirm_time: 'Confirm rental countdown',
    status1: 'To be confirmed rental',
    status2: 'In use',
    status3: 'End of order',
    status4: 'Cancel the order',
    status5: 'Refunding, please wait',
    create_status1: 'Creating, please wait patiently, do not refresh the page',
    create_status2: 'Failed to create',
    time_left: 'Time left',
    order_status1:'not paid',
    order_status2:'in use',
    order_status3:'cancel the order',
    order_status4:'order interruption',
    order_status5:'end of order',
    Confirm_rental: 'Confirm rental',
    rental_success: 'Confirm rental success!',
    rental_fails: 'Confirm rental failed!',
    Confirm_create: 'Confirm creation',
    Renew:'Renewal',
    renew_success: 'Renewal succeeded',
    Build:'Create a GPU virtual machine',
    SeeVirtual:'View GPU virtual machines',
    Build_success:'When the GPU virtual machine is created, click the View button to view the details',
    Build_fails:'Failed to create GPU virtual machine',
    virId: 'VM ID',
    reboot:'Restart the VM',
    reboot_success:'restarted successfully',
    reboot_fails:'restart failed',
    delect:'Delete VM',
    delect_success:'successfully deleted',
    delect_fails:'failed to delete',
    stop: 'Stop VM',
    stop_success: 'Stop the virtual machine successfully',
    stop_fails: 'Failed to stop virtual machine',
    start: 'Start the VM',
    start_success: 'Start the virtual machine successfully',
    start_fails: 'Failed to start virtual machine',
    reset:'Reset Password',
    user:'Username',
    user1: 'please enter user name',
    pass1:'new password:',
    pass2:'double confirm:',
    pass3:'Please enter password',
    pass4:'Please enter the password again',
    pass5:'The passwords entered twice do not match',
    Confirm_edit: 'Confirm the changes',
    change:'Modify virtual machine parameters',
    edit_success: 'Successfully modified',
    edit_fails:'fail to edit',
    mirror_name: 'mirror name',
    IP_address: 'machine IP address',
    user_name: 'username',
    password: 'login password',
    ssh_port: 'SSH port',
    rdp_port: 'RDP port',
    operation:'Operating system',
    multicast: 'multicast address',
    local_address:'Intranet IP address',
    open_port_range: 'open port range',
    port_range: 'port range',
    vnc_port: 'VNC port',
    vir_mem: 'virtual machine memory',
    vir_sys: 'virtual machine system disk',
    vir_data: 'virtual machine data disk',
    vir_gpu_num: 'The number of GPUs in the virtual machine',
    vir_cpu_num: 'The number of virtual machine CPU cores',
    renew_time:'Lease renewal time',
    balance:'Current account DBC balance',
    max_set:'The maximum can be set',
    order_details: 'View order details',
    details:'order details',
    refund:'refund',
    renewal_time: 'Lease renewal time',
    err_msg: 'No virtual machine was created for this machine',
    err_msg1: 'Failed to get data, please try again later!',
    vir_status: 'closed',
    vir_status1: 'creating',
    vir_status2: 'running',
    vir_status3: 'starting',
    vir_status4: 'stopping',
    vir_status5: 'restarting',
    vir_status6: 'resetting',
    vir_status7: 'start error',
    vir_status8: 'restart error',
    vir_status9: 'pm_suspended',

    newTip1: 'Operating system and image cannot be empty',
    newTip2: 'Duplicate SSH port number, please re-enter',
    newTip3: 'The rdp port number is duplicated, please re-enter',
    newTip4: 'Duplicate vnc port number, please re-enter',
    newTip5: 'Duplicate open port range, please re-enter',

    newTip6: 'Empty is to release ip',
    label1: 'release ip',
    label2: 'Release security group',
    label3: 'Clear security group',
    label4: 'Do not use',
    publicIp: 'Public IP',
    security: 'Current application security group',
    securityPort: 'Security group application port',
    vmdelectTime: 'Virtual machine deletion countdown',
    vmdelect: 'The virtual machine has been deleted',
    mac_address:'Mac address',
    editDisk: 'Modify Disk',
    driveletter: 'drive letter',
    diskSize: 'size',
    addDisk: 'Add Disk',
    chooseDisk: 'Choose disk directory',
    chooseDisk1: 'Increase disk size',
    max_set_new:'Can be added up to',
    addDiskTip: 'If the remaining disk capacity is not enough, click the Add Disk button to add a new data disk',
    addDisksuccess: 'Added successfully',
    addTip: 'Disk directory cannot be empty!',
    errTip: 'Are you sure to modify the disk size? Please stop the virtual machine first',

    clearMem: 'clear machine memory',
    clearMem_success: 'Cleaned up successfully',
    GpuFailed: 'Insufficient GPU allocation, please restart the virtual machine after modifying the number of GPUs',

    mac_err: 'Report a problem',
    mac_err_cancel: 'Cancel report',
    mac_err_submsg: 'Submit encrypted information',
    mac_err_t: 'Report machine problem',
    mac_err_label: 'Select failure cause',
    mac_err_label1: 'Create virtual machine exception',
    mac_err_label2: 'Hardware failure',
    mac_err_label3: 'The hardware information is wrong',
    mac_err_label4: 'Fault information detailed description',
    mac_err_msg1: 'Cancel successful, failed to release DBC',
    mac_err_msg2: 'Cancel failed',
    mac_err_msg3: 'Verification, cannot cancel',
    mac_err_msg4: 'Report successful',
    mac_err_msg5: 'Report failed',
    mac_err_msg6: 'DBC refund failed, please contact customer service for processing',
    mac_err_msg7: 'DBC has been returned to the original account',
    mac_err_msg8: 'Cancellation is successful, the release of the pledge DBC is successful',
    mac_err_msg9: 'Send successfully',
    mac_err_msg10: 'Send failed',
    mac_err_msg11: 'Failed to obtain encrypted information',
    mac_err_tip1: 'Note: To report this fault, you need to pledge 20000DBC and pay the reporting fee of 10DBC, and before the machine lease expires, if no one grabs the order, you need to manually cancel the report to avoid penalties for untimely verification. ',
    mac_err_tip2: 'Note: To report this fault, you need to pledge 20000DBC and pay the reporting fee of 10DBC, and three hours before the machine lease expires, if no one grabs the order, you need to manually cancel the report to avoid penalties for not verifying in time. When someone grabs the order, the encrypted information needs to be sent within half an hour, otherwise 1000 pledge coins will be deducted',
    mac_err_tip3: 'If the information is not processed in time, the punishment is being reported. After the punishment DBC is deducted, the punishment status ends (after 48~72 hours), and the remaining pledged DBC will be refunded',
    mac_err_tip4: 'The report has been processed, and the remaining DBC pledged is expected to be refunded after 48~72 hours. If there is no refund, please contact customer service for processing'
  },
  // 单个虚拟机
  signleVir: {
    title: 'my rented virtual machine',
    orderId: "Order ID",
    machineId: 'Machine ID',
    remainingGPU:'Number of available GPUs remaining',
    order_status1: 'Creating, please wait',
    order_status2: 'During the deduction, please do not operate the page',
    order_status3: 'In use',
    order_status4: 'Transfer failed, please re-rent',
    order_status5: 'Lease has expired',
    order_status6: 'Creation failed, please re-lease',
    virStatus: 'virtual machine state',
    tip1: 'The minimum lease renewal time is 1 hour, and the longest is {maxTime} hours',
    tip2: 'Insufficient account balance, please recharge and rent',
    tip3: 'Failed to get temporary wallet address'
  },
  // 安全租
  security: {
    name: 'Security Group',
    desc: '{rule_num} security group rules are applied to {vm_num} virtual machines',
    number: 'Number of my security groups',
    add: 'New security group',
    table1: 'Security group name',
    table2: 'create time',
    table3: 'Number of bound virtual machines',
    table4: 'Number of rules',
    table5: 'Operation',
    editName: 'Edit name',
    confirmName: 'Confirm modification',
    cName_err: 'Modification failed',
    cName_err1: 'Security group name already exists',
    clone: 'Clone security group',
    rule: 'corresponding rule',
    addrule: 'Add a new security group rule',
    editrule: 'Modify security group rules',
    label1: 'Regular direction',
    label2: 'Protocol',
    label3: 'Port',
    label4: 'authorization object',
    label5: 'Action',
    label6: 'Strategy',
    option1: 'Outbound',
    option2: 'Incoming direction',
    option3: 'TCP',
    option4: 'UDP',
    option5: 'ICMP',
    status1: 'Allow',
    status2: 'Reject',
    status3: 'In force',
    status4: 'Setting',
    operate1: 'edit',
    operate2: 'delete',
    operate3: 'confirm',
    addtip: 'Set the port number or port range, the port range needs to be linked with a dash "-"',
    addtip1: 'Please select the rule direction',
    addtip2: 'Please select a protocol',
    addtip3: 'Please enter the port',
    addtip4: 'Please select the authorization object',
    addtip5: 'Created successfully',
    addtip6: 'Create failed',
    deleteSec: 'Delete security group',
    deconfirm: 'Confirm to delete the security group? ',
    deleteSec1: 'Delete security group rules',
    deconfirm1: 'Are you sure to delete this security group rule? ',
    err_reason1: 'Security group does not exist',
    err_reason2: 'Cloning failed',
    err_reason3: 'A bound virtual machine exists and cannot be deleted',
    err_reason4: 'Deletion failed',
    err_reason5: 'Modification failed',
  },
  // 购买DBC
  buyDBC: {
    address: 'wallet address',
    amount: "Amount of purchase",
    pay: "Pay by",
    finish: 'complete the purchase',
    enterwallet: "Please enter the wallet address to receive DBC",
    continue: 'continue',
    support: "Customer support",
    reply: "Customer service will reply within 24 hours",
    quantity: 'corresponding quantity',
    seePrice: "Click to view the price:",
    enterAmount: "Please enter the amount",
    payNum: 'Amount to be paid',
    payBy: 'Please select mode of payment:',
    status1: "Inquiring...",
    status2: "The DBC transfer is successful. It will take about a few minutes to arrive at the account. Please check the wallet address.",
    status3: "The payment is successful, but the DBC transfer fails, please email support@dbctrade.io. We will help you within 24 hours",
    status4: "Payment failed, please email support@dbctrade.io. We will help you within 24 hours",
    status5: "If the order amount is inconsistent with the transfer amount, please contact customer service",
    title1: "important hint",
    tip1: "The platform transfers DBC through smart contracts. After the payment is completed, the smart contract will automatically transfer the DBC you purchased to the DBC address you specify.",
    tip2: "Reminder: The platform charges a fee of 14% + 0.3USD, and the maximum single purchase amount is 2,000 USD. If you need to invoice, please send an email to the customer service support mailbox at the bottom right",
    tip3: "DBC prices fluctuate all the time, please be aware of the risks!",
    tip4: "DBC price refers to the price of gate DBC/USDT trading pair,",
    tip5: "The DBC amount is 0, please refresh the page and re-enter the USD amount",
    tip6: "Amount cannot exceed 2000",
    tip7: "Amount cannot be less than 1",
    tip8: "Incorrect amount entered",
    tip9: "The smart contract wallet balance is insufficient, please re-enter the purchase amount",
    tip10: "Insufficient smart contract wallet balance, contact customer service for processing",
  },
  // 操作报错原因
  err_reason:{
    // onlineCommittee
    NotInBookList: 'order does not exist',
    AlreadySubmitHash: 'Hash has been submitted',
    NotAllHashSubmited: 'Not all hashes submitted',
    TimeNotAllow: 'Submitted within the allowed time',
    NotSubmitHash: 'Hash not submitted',
    AlreadySubmitRaw: 'Raw data submitted',
    InfoNotFeatHash: 'The submission result is inconsistent with Hash',
    DuplicateHash: 'Repeat Hash value',
    // maintainCommittee
    NotCommittee: 'you are not yet a committee member',
    AlreadyBooked: 'Order has been grabbed',
    OrderStatusNotFeat: 'order status not allowed',
    NotInBookedList: 'order does not exist',
    NotOrderReporter: 'Not the person reporting the order',
    NotOrderCommittee: 'Not the order committee',
    GetStakeAmountFailed: 'Failed to get pledge amount',
    StakeFailed: 'pledge failed',
    OrderNotAllowCancel: 'Cancellation of the order is not allowed',
    OrderNotAllowBook: 'The order does not allow reservations',
    NotProperCommittee: 'non-regular committee members',
    NotEqualReporterSubmit: 'Inconsistent with the Hash value submitted by the reporter',
    NotEqualCommitteeSubmit: 'Inconsistent with the Hash value submitted by the committee',
    ReduceTotalStakeFailed: 'Reduce total staking failures',
    PayTxFeeFailed: 'Failed to pay transaction fee',
    NotNeedEncryptedInfo: 'No encrypted information required',
    ExpiredReport: 'Overdue report',
    AlreadySubmitConfirmation: 'Confirmation has been submitted',
    BalanceNotEnough: 'Insufficient balance',
    StakeNotEnough: 'Insufficient pledge amount',
    BoxPubkeyIsNoneInFirstReport: 'BoxPubkeyIsNoneInFirstReport',
    NotReporter: 'not the reporter',
    TimeNotAllowed: 'not within the allowed time frame',
    SlashIdNotExist: 'Penalty ID does not exist',
    NotPendingReviewSlash: 'Penalty for not applying for technical committee review',
    NotSlashed: 'not punished',
  },

  showAliPay: '1' // 是否显示支付宝支付 1 显示 0 不显示
}