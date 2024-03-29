import enLocale from "element-ui/lib/locale/lang/zh-CN";

export default {
  /* 关于webtype:
   ** 修改数值时，要把router.js文件开头引入的Home组件切换与此类型一致
   ** 如果是法币聪图云模式，要把根目录下public/index.html 中脚本的 websiteNameIsCongtuCloud变量 修改为true
   */
  webtype: "1", //0:表示法币支付网站,1:表示dbc支付网站
  website_name: "dbchain", //dbchain, 1024lab, tycloud, Nexuicloud <--||| yousanai, congTuCloud, aionego,deepshare,panchuangai,sharegpu,yalecloud,52lm,dimi,mayi,windywinter,litaai,52cv,ainlp, 
  contain_new_wallet: "1", //0:不包含新钱包，1:包含新钱包
  $: "$",
  send: "发送",
  closeWallet: "关闭钱包",
  toAddress: "目标地址",
  amount: "数量",
  from: "源地址",
  to: "目标地址",
  value: "数量",
  transfer: "转账记录Hash值",
  day: "天",
  hour: "小时",
  password: "密码",
  tips: "温馨提示",
  total: "总计",
  confirm: "确定",
  cancel: "取消",
  confirmPay: "确认支付",
  enterPassword: "请输入密码",
  newWallet: "新的钱包",
  inputPsWarning: "密码至少需要8个字符",
  create: "创建",
  dlEncryptedKey: "下载加密后的私钥",
  finished: "完成",
  amountNoMore: "转账数量不能超过您的钱包的余额", // new
  noZero: "数量不能小于等于零", // new
  errAddr: "钱包地址不正确",
  transfer_ing: "转账中，请稍等...",
  transferSuccess: "转账成功，请等待区块同步后查看",
  transferFail: "转账失败",
  confirmTrTitle: "确认转账",
  confirmTrMsg: "你正在发送 <b>{amount}</b> DBC到此地址:<br> <b>{address}</b>",
  confirmTrWaring: "确定吗?",
  bind: "绑定",
  back: "返回",
  open_wallet: "打开钱包",
  keystore_file: "Keystore文件",
  private_key: "私钥",
  select_wallet_file: "选择钱包文件",
  paste_key: "粘贴或者输入私钥",
  enter_key: "输入密码",
  continue: "继续",
  unlock: "解锁",
  transfer_tips: "在目标地址中输入对方的DBC钱包地址，然后输入转账的DBC数量，点击发送，就可以把DBC转账到对方的DBC钱包中,大概10-30秒对方就可以收到DBC",
  dbc_price_wallet_tips: "DBC价格是随时波动的，购买DBC的时候请注意波动风险",
  dbcChange_tips: "DBC 24小时价格变化",
  heads: {
    home: "首页",
    virtual: "租用GPU整机",
    virtual1: "租用GPU虚拟机",
    gputype: "GPU类型",
    area: "地理区域",
    room: "数据中心ID",
    mymachine: "我的机器",
    mywallet: "我的钱包",
    help: "帮助文档",
    talk: "AI开发者论坛",
    audit:'审核机器'
  },
  footer: {
    DBChain: "DeepBrain Chain",
  },
  gpu: {
    myWallet: "我的钱包",
    myMachine_gpuVirtual: "我的GPU整机", //2021 9.14
    myMachine_gpuVirtual1: "我的GPU虚拟机", //2021 9.14
    myVerify_gpuVirtual: "我的验证GPU虚拟机", //2021 12.2
    walletAddress: "钱包地址",
    notice_1: "请保管好私钥信息，私钥丢失，任何人都将无法帮你找回DBC资产!",
    amount: "数量",
    howBuyDBC: "如何购买DBC",
    exchangeCash: "等值美元",
    showDeitailDBC: "查看dbc详细信息:",
    clickCoinmarktcap: "进入了解",
    transfer: "转账",
    payDBCs: "支付的DBC总数",
    payPrice: "支付时DBC价格",
    actualPrice: "产生实际的费用",
    currentRemaining: "剩余",
    userTime: "已使用时间",
    gpuBilling: "支付时GPU价格",
    createWallet: "创建钱包账号",
    openWallet: "打开钱包账号",
    rentMachine: "请打开或者创建钱包",
    mySecurityGroup: "我的安全组", //2021 12.2
  },
  msg: {
    wallet_0: "存储你的私钥文件，将文件保存到安全的地方。比如手动抄写下来，放到保险箱",
    wallet_1: "" +
      "<b>千万不要丢失它!</b>" +
      "如果丢失将无法恢复" +
      "<br>" +
      "也不要分享它！不要在微信、QQ、Facebook、Line、KakaoTalk、WhatsApp等社交软件互相传输" +
      "如果您在恶意钓鱼网站上使用此文件，您的资金将被窃取！" +
      "<br>" +
      "一定要备份！" +
      "就像它有一天可能价值数百万美元一样",
    wallet_2: "保存你的私钥",
    wallet_3: "<b>千万不要丢失它！</b>" +
      "如果丢失将无法恢复<br>" +
      "<b>也不要分享它！不要在微信、QQ、Facebook、Line、KakaoTalk、WhatsApp等社交软件互相传输</b>" +
      "如果您在恶意钓鱼网站上使用此文件，您的资金将被窃取！<br>" +
      "<b>一定要备份</b>" +
      "就像它有一天可能价值数百万美元一样",
    wallet_6: "一定要记住密码！不能丢失，" + "你需要这个密码和你的私钥文件才能解锁钱包 "
  },
  home: {
    intr_dbchain_1: "DBChain",
    intr_yousanai_1: "有三人工智能",
    intr_aionego_1: "一起AI",
    intr_deepshare_1: "深度之眼",
    intr_sharegpu_1: "ShareGPU",
    intr_panchuangai_1: "磐创AI",
    intr_yalecloud_1: "YaleCloud",
    intr_52lm_1: "52LM",
    intr_dimi_1: "籴米AI",
    intr_mayi_1: "蚂蚁矿业",
    intr_windywinter_1: "东风AI云计算",
    intr_1024lab_1: "1024LAB",
    intr_litaai_1: "利他AI",
    intr_ainlp_1: "AINLP-DBC GPU服务平台，",
    intr_52cv_1: "52CV",
    intr_alpha_dbchain_1: "Alpha-dbchain",
    intr_redstonewill_1: "AI有道",
    intr_xyzlab_1: "XYZ Lab",
    intr_gpgpu_1: "GPGPU",
    intr_rocketai_1: "RocketAI",
    intr_deepbit_1: "深比特",
    intr_aichriscloud_1: "深度计算服务站",
    intr_vnxmart_1: "VNX人工智能交易平台",
    intr_aiaicloud_1: "智能云海",
    intr_snbt_1: "赛诺AI",
    intr_heekmind_1: "HeekMind",
    intr_aicv_1: "AICV",
    intr_freegpu_1: "FreeGpu",
    intr_boincplanet_1: "算力地球",
    intr_shareaiot_1: "携而智物",
    intr_topgpu_1: "深极智算",
    intr_coolgpu_1: "酷卡",
    intr_scclouds_1: "星创云",
    intr_nvidiaai_1: "英智",
    intr_deligpu_1: "DeliGPU",
    intr_longway_1: "Longway",
    intr_sharedgpu_1: "共享算力",
    intr_aipower_1: "AIPower",
    intr_thinkotech_1: "鑫思考AI技术平台",
    intr_cvstudy_1: "AI算法与图像处理",
    intr_gpuhub_1: "GPUHub",
    intr_district51_1: "51区",
    intr_deepmind_1: "DeepMind中文网AI训练平台",
    intr_transportation_1: "当交通遇上机器学习",
    intr_planetc_1: "C星球",
    intr_sdnu_1: "山师AI",
    intr_freegputop_1: "免费GPU租用平台",
    intr_tensorgpu_1: "张量GPU",
    intr_opengpu_1: "OpenGPU",
    intr_aiyanxishe_1: "AI研习社云平台",
    intr_codefate_1: "码缘",
    intr_changhe_1: "长河云",
    intr_dpool_1: "DPool",
    intr_tycloud_1: "天予云",
    intr_Nexuicloud_1: "Nexui",
    intr_1: "提供GPU出租服务，加入我们，可以帮助您的机器非常方便的接入到深脑链网络中，获取收益。\n" +
      "\n" +
      "       只要你的GPU有空闲，就可以加入我们赚取DBC Token，同时可以享受Token升值带来的更多收益。\n" +
      "\n" +
      "      只要GPU闲置1小时以上就可以加入我们获取收益",
    intr_2: "这里的GPU来自于全球各地，通过DBC分布式网络连接在一起，这里面没有中心化服务器，你的数据不会被窃取。",
    intr_3: "在这个DBC网络购买机器需要使用DBC Token进行支付。GPU是按照美元定价，DBC价格越高需要的数量越少。",
    intr_4: "致力于为用户提供高性价比的GPU算力服务，采用DBC TOKEN进行结算。深脑链是一个无限扩容的高性能算力网络，通过我们您可以方便地使用深脑链中的GPU服务器，我们提供丰富的服务满足您的需求。",
    intr_5: "在我们的云平台中你可以找到高性价比且种类多样的GPU。",
    intr_7: "深脑链从2020年开始每年产出5亿 DBC，3年后，每年产出2.5亿，并且以后每5年产出减半，总计有40亿",
    intr_8: "加入深脑链收益组成：超级节点收益+奖励收益+租金收益",
    intr_snbt_4: "致力于为用户提供高性价比的人工智能算力服务，2017年香港战略国际投资有限公司与鄂尔多斯政府达成战略合作，成立鄂尔多斯市赛诺伯特科技有限公司，致力于区块链+人工智能领域。构建“三研两产一平台”产业闭环生态体系“，以大数据产业为契机，以鄂尔多斯高新技术产业规划云计算产业园区为基础，打造超算力产业平台，以智慧与数据助力价值。勾勒未来无限可能。",
    startMiner: "开始出租GPU"
  },
  help: {
    title: "如何购买DBC", 
    "3": "1.直接用PayPal或者支付宝购买DBC(可以开发票)", 
    "3-1": "1.直接用PayPal购买DBC(可以开发票)", 
    "4": "2.从Gate.io购买DBC",
    "5": "3.从其他支持DBC的钱包转账到钱包账号，比如",
    reloadWallet: "充值进入钱包账号",
    enter:'进入'
  },
  list_total_rent_count: "出租总次数",
  list_gpu_ram_size: "GPU显存",
  list_cpu_numbers: "CPU内核数",
  list_ram_size: "机器内存数",
  list_inet_up: "上行带宽",
  list_inet_down: "下行带宽",
  footer_friend: "友情链接",
  wallet_box_adddress: "钱包地址:您的地址也可以称为您的帐户.当你把这个地址发给对方时,对方可以给您的钱包地址打DBC代币.",
  wallet_box_keystore: "密钥存储文件:密钥存储文件使用密码以加密形式存储您的私钥.建议始终使用密钥存储文件来解锁您的钱包.",
  wallet_box_key: "您的私钥这是您的私钥的未加密文本版本,意味着不需要密码.如果有人找到你的未加密的私钥,他们可以在没有密码的情况下访问你的钱包.因此,通常建议使用加密版本.",
  creat_wallet_index_download: "请下载加密后的私钥",
  mywallet_create: "创建钱包账号",
  mywallet_open: "打开钱包账号",
  mywallet_open_create: "请打开或者创建钱包",
  mywallet_transfer_record: "转账记录",
  mywallet_display: "打开或者创建钱包查看转账记录",
  open_wallet_cannot_read: "你的浏览器不支持本地文件读取",
  footer_service: "客服支持",
  footr_reply: "客服会在24小时内回复",
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
  pleae_create_wallet: "请先在我的钱包中创建钱包账号",
  diskspace_remaining: "最大可用硬盘空间",
  memory_space: "内存空间",
  howsellDBC: "如何出售DBC",
  helpsell: {
    title: "如何出售DBC",
    "2": "1.从火币出售DBC（先将DBC换成比特币，然后将BTC换成人民币进入银行账户或者支付宝）",
    "3": "2.从库币出售DBC",
    "4": "从Gate.io出售DBC"
  },
  dbc_price_wallet: "DBC价格",
  dbc_price_usd: "美金",
  lessdbc: "DBC余额不足",
  list_gpu_count_tip: "当前机器的GPU型号和GPU总数",
  mywallet_open_new: "打开钱包账号",
  mnemonic: "助记词",
  errorPassword: "密码错误",
  ...enLocale,
  /**
   * hz 新增单词
   */
  startVir: "开始租用GPU整机",
  home_intr: "GPU租用按照天计费，机器租用到期之前也可以按天续租",
  result: '结果',
  verifyPassward: "请输入账户密码",
  DBCWallet: "DBC钱包",
  DBCBrowser: "DBC浏览器",
  DBCWiki: "DBC Wiki",
  responseTip: '提交过程大概需要20~40秒的时间，请稍等',
  // 审核机器
  audit:{
    // 抢单页面
    ordergrabbingMachine:'抢单机器列表',
    distributionMachine:'分配机器列表',
    myAudit:'我的审核列表',
    myOrder:'我的抢单列表',
    ogMachine_tips:'当有人开时抢单后，该订单时间开时倒计时，限制3小时结束，需在半小时内发送给验证人session信息给对应验证人，验证人有一小时验证时间。验证人在3小时以后才可提交原始信息',
    order:'编号',
    seeDetails:'等待接单中',
    seeDetails1:'等待问题描述',
    seeDetails2:'查看问题描述',
    seeDetails3:'提交验证结果Hash值',
    seeDetails4:'查看虚拟机信息',
    status:'状态',
    status1:'等待抢单',
    status2:'已被抢完',
    countdown:'订单倒计时',
    hasNum:'已抢单人数',
    start:'开时抢单',
    start1:'验证中',
    start2:'已结束',
    tipmsg:'抢单以后等待提名人发送相关信息后方可查看信息',
    tipmsg1:'抢单成功',
    tipmsg2:'抢单失败',
    tipmsg3:'机器发放成功，请前往我的机器列表',
    tipmsg4:'成为委员会后方可抢单',
    message:'错误描述',
    confirm: '运行虚拟机',
    hasError:'机器有问题',
    noError:'机器无问题',
    // 派单页面
    verification:'开始验证',
    verification1:'提交验证结果Hash值',
    verification2:'提交验证结果原始值',
    verification3:'查看虚拟机',
    verification4:'创建虚拟机',
    verification5:'订单已完结',
    mytime:'我的可验证时间段',
    verification1_time:'提交验证结果Hash值倒计时',
    verification2_time:'提交验证结果原始值倒计时',
    savemsg: '保存信息',
    savemsgtip: '提示：保存原始信息到本地，当页面提交原始值出错时，可去链上操作',
    verification_tips:'在验证的时间内必须提交结果Hash值',
    verification_tips1_1:'',
    verification_tips1_2:'',
    verification_tips1:'后12小时内提交内容包含原始值 或 三个验证人都已提交hash也可提交内容包含原始值',
    verification_tips2:'只有在验证时间内方可查看、登录虚拟机进行机器验证操作',
    confirmHash: '已提交Hash人数',
    // 我的审核
    machineStatus:'机器状态',
    machineStatus1:'验证中',
    machineStatus2:'已上线',
    machineStatus3:'租用中',
    machineStatus4:'闲置中',
    verificationTime: '已验证次数',
    today_profit:'今日收益',
    total_profit:'累计收益',
    all_profit:'总收益',
    all_machine:'机器总数',
    machineTips:'(提示:机器下架后，该机器收益停止)',
    myResult:'我的验证结果',
    finalResult:'最终验证结果',
    adopt:'通过',
    failed:'未通过',
    proportion:'验证比例',
    record:'历史收益信息',
    date:"日期",
    income:"收益(DBC)",
    machine_id: '机器ID',
    reporter_nonce: '报告人随机数',
    validator_nonce: '验证人自己的随机数',
    contentofreport: '报告内容',
    problem: '机器是否有问题',
    hasproblem:'有问题',
    noproblem:'没问题',
    isSupportY:'支持',
    isSupportN:'不支持',
    err_tip1:'钱包地址不能为空',
    err_tip2:'服务器异常，请稍后再试',
    coefficient:'地域系数',
    coefficient1:'系数',
    GPUmodel:'GPU型号',
    CC_num:'CUDA core数量',
    Memoryvalue:'显存值',
    GPUnumber:'GPU数量',
    CPUcores:'CPU核数',
    CPUmodel:'CPU型号',
    CPUfrequency:'CPU频率',
    Memory:'内存',
    Shd_space:'系统硬盘空间',
    Dhd_space:'数据硬盘空间',
    SGC_power:'单个GPU算力值(X100)',
    Vresults:'验证结果',
    bindEmail:'请先绑定邮箱信息',
    Op_Successful:'操作成功',
    Op_Failed:'操作失败',
    errormsg:'获取数据失败，请稍后再试！',
    // 验证GPU列表
    verify_msg: '创建中,请在5~10分钟后点击查看虚拟机按钮，查看创建结果',
    verify_msg1: '创建失败，请重试或直接拒绝该机器上线',
    verify_msg2: '查询虚拟机信息失败，请确认是否创建',
    verify_msg3: '创建虚拟机失败，请确认是否已创建或直接拒绝该机器上线',

    report_id: '订单ID',
    report_err: '举报原因',
    report_info: '租用后无法访问',
    report_info1: '其他故障',
    ogMachine_tips1:'当错误报告为 机器被租用后无法访问故障 时，验证规则改变为 在第一个验证人抢单之后，5 分钟内提交验证结果Hash值，所有抢单的委员会都提交了 Hash 或者 距离首次抢单5分钟 后才允许验证人提交原始信息，10 分钟内结束验证',
    
  },
  // 租用虚拟机
  virtual: {
    batch: '批量租用',
    choose:'全选',
    commit:'确认提交',
    batch_Mac: '租用虚拟机',
    useTime: '使用时长',
    Machine_status:'机器使用状态',
    GPU_Num:'GPU数量',
    All_Machine:'机器总数',
    Idle_Machine:'空闲机器数',
    All_Gpu:'GPU总数',
    Idle_Gpu: '空闲GPU数',
    Daily_Rent: '日租金',
    Hours_Rent: '单卡每小时租金',
    Machine_ID:'机器ID',
    Room_number:'数据中心编号',
    Machine_sta:'机器状态',
    Machine_onlineNum:'剩余空闲GPU数',
    All:'全部',
    Rented:'被租用',
    Idle:'空闲',
    GPU_memory:'GPU显存',
    GPU_type:'GPU型号',
    CPU_cores:'CPU内核数',
    CPU_frequency:'CPU频率',
    CPU_type:'CPU型号',
    Country:'国家',
    City:'城市',
    Cumulative_DBC_rent:'累计DBC租金数',
    Network_operators:'网络运营商',
    Online_time:'已上线时长',
    Memory_num:'内存数',
    System_hd:'系统硬盘',
    Data_hd:'数据硬盘',
    Bandwidth1:'上行带宽',
    Bandwidth2:'下行带宽',
    lable_two2:'算工名称',
    tip0:'请先选择要租用的机器',
    tip1:'温馨提示：当前机器最长可以租用60天，最短1天',
    tip2:'使用过程中机器出现问题，可以提交报告申诉，申诉成功可以获得dbc补偿',
    tip3:'租用过程会产生 10 DBC的租用费用，无论最后租用是否成功该费用不会退回',
    tip4:'下单成功，即将跳转我的机器页面',
    tip5:'下单失败，稍后DBC退回原账户',
    tip6:'获取钱包地址失败',
    tip7:'下单成功',
    tip8:'即将跳转我的机器页面',
    Machine_num:'机器数量',
    Max_disk_Num:"虚拟机最大可用硬盘空间",
    Max_Mem:"虚拟机最大可用内存",
    total:"总计",
    equivalent:"等值DBC数量",
    confirm: '确认支付',
    cancal: '取消',

    dedicated: '支持多IP'
  },
  // 订单列表
  myvirtual:{
    tip1:'在确认租用之前创建虚拟机，虚拟机创建成功后确认租用，超过倒计时没有租用，则订单自动取消',
    tip2:'虚拟机正在创建中...',
    tip3:'虚拟机创建成功',
    tip4: '提示：点击确认租用之前，请确保虚拟机已经创建成功',
    tip5: '确认重启虚拟机吗？',
    tip6: '温馨提示：每次续费最短1天时间',
    tip7: '可在6000-60000之间随意设置，如果同一个机器想要创建多个虚拟机，则不同虚拟机之间的开放端口不能重合，否则虚拟机会创建失败',
    tip8: '可在5600-5899之间设置,如果同一个机器想要创建多个虚拟机，则不同虚拟机之间的端口不能重合，否则虚拟机会创建失败',
    tip9: '可在5900-5999之间设置,如果同一个机器想要创建多个虚拟机，则不同虚拟机之间的VNC端口不能重合，否则虚拟机会创建失败',
    tip10: '且RDP端口不能与SSH端口相同',
    tip11: '操作系统需要与镜像系统保持一致，其中bios默认ubuntu为legacy, Windows为uefi',
    tip12: '范围为“224.0.0.0”至“239.255.255.255”,且两者之间需用英文的逗号隔开',
    tip13: '确认删除虚拟机吗？',
    tip14: '确认停止虚拟机吗？',
    tip15: '确认启动虚拟机吗？',
    tip16: '确认修改虚拟机？请先停止虚拟机运行',
    tip17: '温馨提示：最短租用为1个小时，切每次交易会扣除10个DBC的费用',
    tip18: '用户名密码输入不正确，请重新确认后提交',
    title: '我租用的机器',
    tower: '台',
    confirm_time: '确认租用倒计时',
    status1: '待确认租用',
    status2: '正在使用中',
    status3: '订单结束',
    status4: '订单取消',
    status5: '正在退币中，请稍后',
    create_status1: '创建中,请耐心等待，勿刷新页面',
    create_status2: '创建失败',
    time_left: '剩余时间',
    order_status1:'未支付',
    order_status2:'正在使用中',
    order_status3:'订单取消',
    order_status4:'订单中断',
    order_status5:'订单结束',
    Confirm_rental: '确认租用',
    rental_success: '确认租用成功！',
    rental_fails: '确认租用失败！',
    Confirm_create: '确认创建',
    Renew:'续费',
    renew_success: '续费成功',
    Build:'创建GPU虚拟机',
    SeeVirtual:'查看GPU虚拟机',
    Build_success:'GPU虚拟机创建中,点击查看按钮查看详情',
    Build_fails:'创建GPU虚拟机失败',
    virId: '虚拟机ID',
    reboot:'重启虚拟机',
    reboot_success:'重启成功',
    reboot_fails:'重启失败',
    delect:'删除虚拟机',
    delect_success:'删除成功',
    delect_fails:'删除失败',
    stop: '停止虚拟机',
    stop_success: '停止虚拟机成功',
    stop_fails: '停止虚拟机失败',
    start: '启动虚拟机',
    start_success: '启动虚拟机成功',
    start_fails: '启动虚拟机失败',
    reset:'重置密码',
    user:'用户名',
    user1: '请输入用户名',
    pass1:'新密码：',
    pass2:'再次确认：',
    pass3:'请输入密码',
    pass4:'请再次输入密码',
    pass5:'两次输入密码不一致',
    Confirm_edit: '确认修改',
    change:'修改虚拟机参数',
    edit_success: '修改成功',
    edit_fails:'修改失败',
    mirror_name: '镜像名',
    IP_address: '机器IP地址',
    user_name: '用户名',
    password: '登陆密码',
    ssh_port: 'SSH端口',
    rdp_port: 'RDP端口',
    operation: '操作系统',
    multicast: '组播地址',
    local_address:'内网IP地址',
    open_port_range: '开放端口范围',
    port_range: '端口范围',
    vnc_port: 'VNC端口',
    vir_mem: '虚拟机内存',
    vir_sys: '虚拟机系统盘',
    vir_data: '虚拟机数据盘',
    vir_gpu_num: '虚拟机GPU数量',
    vir_cpu_num: '虚拟机CPU核数',
    renew_time:'续租时长',
    balance:'当前账户DBC余额',
    max_set:'最大可以设置',
    order_details: '查看订单详情',
    details:'订单详情',
    refund:'退币',
    renewal_time: '续租时长',
    err_msg: '该机器未创建虚拟机',
    err_msg1: '获取数据失败，请稍后再试！',
    vir_status: '已停止',
    vir_status1: '创建中',
    vir_status2: '运行中',
    vir_status3: '启动中',
    vir_status4: '停止中',
    vir_status5: '重启中',
    vir_status6: '重置中',
    vir_status7: '启动失败',
    vir_status8: '重启失败',
    vir_status9: '休眠中',

    newTip1: '操作系统和镜像不能为空',
    newTip2: 'SSH端口号重复，请重新输入',
    newTip3: 'RDP端口号重复，请重新输入',
    newTip4: 'vnc端口号重复，请重新输入',
    newTip5: '开放端口范围重复，请重新输入',

    newTip6: '清空即为释放ip',
    label1: '释放ip',
    label2: '释放安全组',
    label3: '不使用安全组',
    label4: '不使用公网IP',
    publicIp: '公网IP',
    security: '当前应用安全组',
    securityPort: '安全组应用端口',
    vmdelectTime: '虚拟机删除倒计时',
    vmdelect: '虚拟机已删除',
    mac_address:'Mac地址',
    editDisk: '修改磁盘',
    driveletter: '盘符',
    diskSize: '大小',
    addDisk: '添加磁盘',
    chooseDisk: '选择磁盘目录',
    chooseDisk1: '增加磁盘大小',
    max_set_new:'最大可以新增至',
    addDiskTip: '如剩余磁盘容量不够，点击添加磁盘按钮可添加新的数据盘',
    addDisksuccess: '添加成功',
    addTip: '磁盘目录不能为空！',
    errTip: '确认修改磁盘大小？请先停止虚拟机运行',

    clearMem: '清理机器内存',
    clearMem_success: '清理成功',
    GpuFailed: 'GPU分配不足，请修改GPU数量后重新启动虚拟机',

    mac_err: '报告问题',
    mac_err_cancel: '取消报告',
    mac_err_submsg: '提交加密信息',
    mac_err_t: '举报机器问题',
    mac_err_label: '选择故障原因',
    mac_err_label1: '创建虚拟机异常',
    mac_err_label2: '硬件故障',
    mac_err_label3: '硬件信息不对',
    mac_err_label4: '故障信息详细描述',
    mac_err_msg1: '取消成功，解除质押DBC失败',
    mac_err_msg2: '取消失败',
    mac_err_msg3: '验证中，无法取消',
    mac_err_msg4: '举报成功',
    mac_err_msg5: '举报失败',
    mac_err_msg6: 'DBC退币失败，请联系客服处理',
    mac_err_msg7: 'DBC已退回原账户',
    mac_err_msg8: '取消成功，解除质押DBC成功',
    mac_err_msg9: '发送成功',
    mac_err_msg10: '发送失败',
    mac_err_msg11: '获取加密信息失败',
    mac_err_tip1: '注意：举报此故障需要质押20000DBC并支付10DBC的举报费用，且在机器租用到期前，如无人抢单，需手动取消举报，避免验证不及时受到处罚。',
    mac_err_tip2: '注意：举报此故障需要质押20000DBC并支付10DBC的举报费用，且在机器租用到期三小时前，如无人抢单，需手动取消举报，避免验证不及时受到处罚。当有人抢单时,需要在半小时内发送加密信息,否则将扣除1000质押币',
    mac_err_tip3: '未及时处理信息，举报惩罚中，扣除惩罚DBC后，惩罚状态结束(48~72小时以后)，退还剩余质押DBC',
    mac_err_tip4: '举报以处理完毕，质押剩余DBC预计48~72小时以后退还,若无退还，请联系客服处理'
  },
  // 单个虚拟机
  signleVir: {
    title: '我租用的虚拟机',
    orderId: "订单ID",
    machineId: '机器ID',
    remainingGPU:'剩余可用GPU数量',
    order_status1: '等待创建中',
    order_status2: '正在创建中(需等待1~3分钟，请勿操作页面)',
    order_status3: '正在使用中',
    order_status4: '租用已到期',
    order_status5: '创建失败，订单取消',
    order_status6: '重新租用重启中，请稍后',
    virStatus: '虚拟机状态',
    RentAgain:'再次租用',
    tip1: '最短续租时间为1个小时',
    tip2: '账户余额不足，请充值后在租用',
    tip3: '获取临时钱包地址失败',

    
    tip4: '创建失败，退币失败，请联系客服处理',
    tip5: '创建失败，DBC已退回原账户',
    tip6: '创建失败，DBC将在20分钟以内退回原账户',

    
    tip7: '续费失败，退币失败，请联系客服处理',
    tip8: '续费失败，DBC已退回原账户',
    tip9: '剩余可用GPU数量小于原订单GPU数量',
    
    vmdelectTime: '重租倒计时',
    vmdelect: '虚拟机已删除',

    createVmInfo: '创建虚拟机信息',
    loading: '机器租用创建中，请等待1~3分钟，不要刷新、关闭页面'
  },
  // 安全租
  security: {
    name: '安全组',
    desc: '{rule_num}条安全组规则应用到{vm_num}个虚拟机',
    number: '我的安全组数量',
    add: '新建安全组',
    table1: '安全组名字',
    table2: '创建时间',
    table3: '绑定虚拟机数量',
    table4: '规则数量',
    table5: '操作',
    editName: '修改名字',
    confirmName: '确认修改',
    cName_err: '修改失败',
    cName_err1: '已存在安全组名称',
    clone: '克隆安全组',
    rule: '对应规则',
    addrule: '添加新的安全组规则',
    editrule: '修改安全组规则',
    label1: '规则方向',
    label2: '协议',
    label3: '端口',
    label4: '授权对象',
    label5: '动作',
    label6: '策略',
    option1: '出方向',
    option2: '入方向',
    option3: 'TCP',
    option4: 'UDP',
    option5: 'ICMP',
    status1: '允许',
    status2: '拒绝',
    status3: '已生效',
    status4: '设置中',
    operate1: '编辑',
    operate2: '删除',
    operate3: '确认',
    addtip: '设置端口号或端口区间，端口区间需以中划线"-"进行链接',
    addtip1: '请选择规则方向',
    addtip2: '请选择协议',
    addtip3: '请输入端口',
    addtip4: '请选择授权对象',
    addtip5: '创建成功',
    addtip6: '创建失败',
    deleteSec: '删除安全组',
    deconfirm: '确认删除安全组？',
    deleteSec1: '删除安全组规则',
    deconfirm1: '确认删除该条安全组规则？',
    err_reason1: '安全组不存在',
    err_reason2: '克隆失败',
    err_reason3: '存在绑定的虚拟机，无法删除',
    err_reason4: '删除失败',
    err_reason5: '修改失败',
  },
  // 购买DBC
  buyDBC: {
    address: '钱包地址',
    amount: "购买金额",
    pay: "支付方式",
    finish: '完成购买',
    enterwallet: "请输入收取DBC的钱包地址",
    continue: '继续',
    support: "客服支持",
    reply: "客服会在24小时内回复",
    quantity: '对应的等值数量',
    seePrice: "点击查看价格：",
    enterAmount: "请输入金额",
    payNum: '需要支付金额',
    payBy: '请选择支付方式：',
    status1: "正在查询中...",
    status2: "DBC转账成功，到账大概需要几分钟，请到钱包地址中查看",
    status3: "支付成功，但DBC转账失败，请邮件联系support@dbctrade.io.我们会在24小时内帮您处理",
    status4: "支付失败，请邮件联系support@dbctrade.io.我们会在24小时内帮您处理",
    status5: "查询订单金额与转账金额不一致，请联系客服处理",
    title1: "重要提示",
    tip1: "平台是通过智能合约进行DBC转账，支付完成后，智能合约会自动将您购买的DBC打入到您指定的DBC地址.",
    tip2: "温馨提示：平台收取14%+0.3USD的费用,单次购买金额最多2000美元.如果需要开发票，请发邮件至右下方客服支持邮箱",
    tip3: "DBC价格随时随刻都在波动，请注意风险！",
    tip4: "DBC价格参考gate DBC/USDT交易对价格，",
    tip5: "DBC数量为0，请刷新页面后重新输入USD金额",
    tip6: "金额不能超过2000",
    tip7: "金额不能小于1",
    tip8: "输入金额不正确",
    tip9: "智能合约钱包余额不足，请重新输入购买金额",
    tip10: "智能合约钱包余额不足，联系客服处理",
  },
  // 操作报错原因
  err_reason:{
    // onlineCommittee
    NotInBookList: '订单不存在',
    AlreadySubmitHash: '已经提交过Hash',
    NotAllHashSubmited: '未提交所有Hash',
    TimeNotAllow: '不在允许时间内提交',
    NotSubmitHash: '未提交Hash',
    AlreadySubmitRaw: '已提交过原始数据',
    InfoNotFeatHash: '提交结果与Hash不一致',
    DuplicateHash: '重复Hash值',
    // maintainCommittee
    NotCommittee: '您还不是委员会成员',
    AlreadyBooked: '已抢单',
    OrderStatusNotFeat: '订单状态不允许',
    NotInBookedList: '订单不存在',
    NotOrderReporter: '非该订单报告人',
    NotOrderCommittee: '非该订单委员会',
    GetStakeAmountFailed: '获取质押金额失败',
    StakeFailed: '质押失败',
    OrderNotAllowCancel: '订单不允许取消',
    OrderNotAllowBook: '订单不允许预订',
    NotProperCommittee: '非正常委员会成员',
    NotEqualReporterSubmit: '跟报告人提交的Hash值不一致',
    NotEqualCommitteeSubmit: '跟委员会提交的Hash值不一致',
    ReduceTotalStakeFailed: '减少总质押失败',
    PayTxFeeFailed: '支付交易费用失败',
    NotNeedEncryptedInfo: '不需要加密信息',
    ExpiredReport: '过期报告',
    AlreadySubmitConfirmation: '已经提交确认',
    BalanceNotEnough: '余额不足',
    StakeNotEnough: '质押金额不足',
    BoxPubkeyIsNoneInFirstReport: 'BoxPubkeyIsNoneInFirstReport',
    NotReporter: '不是报告人',
    TimeNotAllowed: '不在允许时间范围内',
    SlashIdNotExist: '惩罚ID不存在',
    NotPendingReviewSlash: '惩罚未申请技术委员会审查',
    NotSlashed: '未被惩罚',
  },

  showAliPay: '1', // 是否显示支付宝支付 1 显示 0 不显示
  copySuccess: '复制成功'
}