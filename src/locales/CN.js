import enLocale from "element-ui/lib/locale/lang/zh-CN";

export default {
  /* 关于webtype:
   ** 修改数值时，要把router.js文件开头引入的Home组件切换与此类型一致
   ** 如果是法币聪图云模式，要把根目录下public/index.html 中脚本的 websiteNameIsCongtuCloud变量 修改为true
   */
  webtype: "1", //0:表示法币支付网站,1:表示dbc支付网站
  website_name: "dbchain", //yousanai , dbchain ,aionego,deepshare,panchuangai,sharegpu,yalecloud,52lm,dimi,mayi,windywinter,litaai,52cv,ainlp,1024lab,congTuCloud
  display_select_rent_platform: "0", //0：不显示机器出租的云平台选项，1:显示出租的云平台选项
  //alpha-dbchain/aichriscloud/deepbit/vnxmart/aiaicloud/snbt/heekmind/redstonewill/rocketai/aicv/\shareaiot\freegpu\boincplanet\topgpu\thinkotech
  //coolgpu\scclouds\nvidiaai\deligpu\longway\sharedgpu\aipower\cvstudy\gpuhub\district51\deepmind\transportation\planetc\sdnu\freegputop\tensorgpu
  //opengpu\aiyanxishe\codefate\changhe\dpool
  contain_new_wallet: "1", //0:不包含新钱包，1:包含新钱包
  message: "hello i18n !!",

  $: "$",
  RMB: "元",
  send: "发送",
  closeWallet: "关闭钱包",
  toAddress: "目标地址",
  amount: "数量",
  from: "源地址",
  to: "目标地址",
  value: "数量",
  asset: "资产名称",
  transfer: "转账记录Hash值",
  day: "天",
  hour: "小时",
  password: "密码",
  unsubscribe: "退租",
  subscribe: "订阅",
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
  transferSuccess: "转账成功，请等待区块同步后查看",
  transferFail: "转账失败",
  confirmTrTitle: "确认转账",
  confirmTrMsg: "你正在发送 <b>{amount}</b> DBC到此地址:<br> <b>{address}</b>",
  confirmTrWaring: "确定吗?",
  lease: "租用",
  bind: "绑定",
  modify: "修改",
  scores: "分",
  back: "返回",
  reEdit: "重新编辑",
  open_wallet: "打开钱包",
  access_wallet: "选择打开钱包的方式",
  keystore_file: "Keystore文件",
  private_key: "私钥",
  select_wallet_file: "选择钱包文件",
  paste_key: "粘贴或者输入私钥",
  enter_key: "输入密码",
  continue: "继续",
  unlock: "解锁",
  heads: {
    logo: "DBChain",
    home: "首页",
    gpu: "租用GPU",
    miner: "出租GPU",
    mymachine: "我的机器",
    mywallet: "我的钱包",
    myaccount: "我的账户",
    help: "帮助文档",
    talk: "AI开发者论坛",
    audit:'审核机器'
  },
  footer: {
    DBChain: "DeepBrain Chain",
    DBCMiner: "DBCMiner",
    DBCTalk: "DBCTalk",
    KuCoin: "KuCoin",
    DBCTrade: "DBCTrade",
    DBCloud: "DBCloud",
    HuobiPro: "Huobi Pro",
    GateIo: "Gate.io",
    zero: "人工智能围棋",
    neotracker: "NEOTracker",
    paddle: "飞桨平台",
    yikeweiqi: "奕客围棋",
    modelbase: "飞桨github",
    PaddleVideo: "飞桨模型库",
    models: "飞桨模型库"
  },
  gpu: {
    myWallet: "我的钱包",
    myMachine_gpu: "我的GPU容器", //2020 1.9
    myMachine_cpu: "我的CPU容器", //2020 1.9
    myMachine_stopped: "我的已停止容器", //2020 1.9
    machineList: "机器列表",
    walletAddress: "钱包地址",
    notice_1: "请保管好私钥信息，私钥丢失，任何人都将无法帮你找回DBC资产!",
    amount: "数量",
    howBuyDBC: "如何购买DBC",
    exchangeCash: "等值美元",
    showDeitailDBC: "查看dbc详细信息:",
    clickCoinmarktcap: "进入了解",
    transfer: "转账",
    myMachineTitle: "我的订单数",
    pcs: "台 机器",
    machineOnLine: "机器在线",
    machineOffLine: "机器离线",
    remainingTime: "剩余时间",
    reload: "续费",
    payDBCs: "支付的DBC总数",
    payPrice: "支付时DBC价格",
    actualPrice: "产生实际的费用",
    currentRemaining: "剩余",
    userTime: "已使用时间",

    gpuBilling: "支付时GPU价格",

    storage: "硬盘",

    DBCRemaining: "当前DBC余额",
    exchangeDBC: "等值DBC数量",
    machineRemaining: "当前机器可用",
    HDSpace: "硬盘空间",
    from: "从",
    addTo: "提到",
    originalPrice: "原来价格",
    currentPrice: "现在价格",
    rate: "评价",
    createWallet: "创建钱包账号",
    openWallet: "打开钱包账号",
    rentMachine: "请打开或者创建钱包",
    mcStatusTitle: "机器状态", // new
    idle_status: ["所有机器", "空闲机器", "被租机器"], // new

    dbc_version: ["全部", "0.3.7.2", "0.3.7.3"],
    have_ip: ["全部", "没有", "有"],
    cumulativeDuration: "累计出租时长", // new

    lengthOfAvailableTime: "最长可用时间", // new
    choseGpuCount: "请选择你想要租用的GPU数量", // new
    bindMail: "绑定邮箱", // new
    bindMailInfo: "绑定的邮箱用来收取机器的SSH账户登陆信息，<br>" +
      "租用GPU之前必须先到我的机器界面绑定邮箱",
    modifyMail: "修改邮箱",
    mailAddress: "邮箱地址",
    inputMail: "请输入邮箱地址",
    inputNewMail: "请输入新邮箱地址",
    receiveMail: "收邮件",
    receiveMailInfo: "点击收取邮件，并且按照邮件内容输入dbc数量完成验证",
    verifyDbc: "请输入要验证的DBC数量",
    attentionDecimal: "请注意输入小数点",
    startBind: "开始绑定",
    mcDetails: {
      th_1: "用户钱包地址",
      th_2: "实际dbc成交数量",
      th_3: "使用中是否出现故障",
      th_4: "租用GPU数量",
      th_5: "dbc退款数量",
      th_6: "用户购买总时长",
      th_7: "实际使用时长",
      th_8: "用户评分"
    },
    userRate: "用户评价",
    mcTradeInfo: "机器交易信息",
    backDbcNum: "退回DBC数量为",
    rateMsg: "你想给它评几星",
    common: "普通AI训练区",
    highStabilityAITrain: "高稳定AI训练区",
    aiInference: "AI推理区",
    hashCompute: "高性能并行计算区",
    superNodeCompute: "DBC超级节点算力区"
  },

  country: "国家",
  idle_status: "机器使用状态",
  total_time: "累计出租时间",
  total_rent_count: "出租总次数",
  error_rent_count: "中断次数",
  disk_GB_perhour_dollar: "",
  length_of_available_time: "最长可用时间",
  gpu_price_dollar: "单GPU每小时价格",
  gpu_count: "GPU数量",
  tensor_cores: "Tensor Cores",
  half_precision_tflops: "半精度浮点数",
  single_precision_tflops: "单精度浮点数",
  double_precision_tflops: "双精度浮点数",
  gpu_ram_size: "GPU显存",
  gpu_ram_bandwidth: "GPU显存带宽",
  pcie_bandwidth: "总线传输速度",
  cpu_numbers: "CPU内核数",
  ram_size: "内存大小",
  disk_bandwidth: "硬盘带宽",
  inet_up: "上行带宽",
  inet_down: "下行带宽",
  have_ip_title: "独立IP",
  onlines_tatus: "机器在线状态",
  disk_space: "硬盘空间",
  dbc_version_title: "DBC版本",

  msg: {
    dlg_0: "当前机器最长可以租用{time}，最短1个小时。 \n" +
      "容器使用完成后，可以提前退租，只会收取实际产生的费用，剩余费用将会退还到钱包中. " +
      "时间到期,容器会被停用,机器所有数据将会" +
      "被自动保留7天,如果您的钱包余额超过2000DBC,7天内任何时间可以继续启用容器,进行使用,容器停止超过7天将会被销毁.",

    dlg_5: "使用过程中机器出现中断，如果使用时间不超过144小时，则退回全部DBC \n" +
      "<br>" +
      "如果使用时间超过144小时，则退回144小时使用量的DBC",
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
    wallet_4: "私钥不正确！",
    wallet_5: "一定要记住密码！不能丢失，" + "你需要这个密码和你的私钥才能解锁钱包 ",
    // 新加
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
    intr_1: "提供GPU出租服务，加入我们，可以帮助您的机器非常方便的接入到深脑链网络中，获取收益。\n" +
      "\n" +
      "       只要你的GPU有空闲，就可以加入我们赚取DBC Token，同时可以享受Token升值带来的更多收益。\n" +
      "\n" +
      "      只要GPU闲置1小时以上就可以加入我们获取收益",
    intr_2: "这里的GPU来自于全球各地，通过DBC分布式网络连接在一起，这里面没有中心化服务器，你的数据不会被窃取。",
    intr_3: "在这个DBC网络购买机器需要使用DBC Token进行支付。GPU是按照美元定价，DBC价格越高需要的数量越少。",

    intr_4: "致力于为用户提供高性价比的人工智能算力服务，采用DBC TOKEN进行结算。深脑链是一个分布在全球的去中心化人工智能算力网络，通过我们您可以方便地使用深脑链网络中的机器，我们提供丰富的服务满足您的需求。",
    intr_5: "在我们的云平台中你可以找到便宜且类型多样的GPU。当你使用的时候，所有的数据都是加密传输的",
    intr_6: "GPU租用按照分钟计费，GPU使用过程中如果出现中断，将会最多补偿144小时的费用",
    intr_7: "深脑链从2020年开始每年产出5亿 DBC，3年后，每年产出2.5亿，并且以后每5年产出减半，总计有40亿",
    intr_8: "加入深脑链收益组成：超级节点收益+奖励收益+租金收益",
    intr_snbt_4: "致力于为用户提供高性价比的人工智能算力服务，2017年香港战略国际投资有限公司与鄂尔多斯政府达成战略合作，成立鄂尔多斯市赛诺伯特科技有限公司，致力于区块链+人工智能领域。构建“三研两产一平台”产业闭环生态体系“，以大数据产业为契机，以鄂尔多斯高新技术产业规划云计算产业园区为基础，打造超算力产业平台，以智慧与数据助力价值。勾勒未来无限可能。",
    start: "开始租用GPU",
    github: "GitHub",
    video: "视频",
    startMiner: "开始出租GPU"
  },
  help: {
    title: "如何购买DBC",
    "1": "1.直接用支付宝购买DBC(此平台可以开发票)，进入",
    "2": "2.从火币购买DBC",
    "3": "3.从库币购买DBC",
    "4": "4.从Gate.io购买DBC",
    "5": "5.从其他支持DBC的钱包转账到钱包账号，比如neotracker.io、O3Wallet",
    reloadWallet: "充值进入钱包账号"
  },
  miner: {
    addMc_Title: "请按照如下步骤添加机器：",
    addMc_editTitle: "重新编辑",
    addMc_setupApp: "安装软件",
    addMc_bind: "绑定机器",
    addMc_area: "选择时区",
    addMc_price: "定价",
    addMc_dbc: "输入验证码",
    addMc_mail: "点击此处从邮件获取验证码",
    addMc_date: "指定日期",
    addMc_week: "按照星期重复",
    period_1: "全天（所有时段）",
    period_2: "指定时间段",
    rent: "出租机器",
    rentMachine: "",
    addMc_msg_1: ["安装DBC软件", "请根据操作手册进行安装."],
    addMc_msg_2: "安装完成后，需要填入当前的钱包地址，然后才能在平台上绑定机器。",

    addMc_msg_4: ["每个GPU定价"],
    addMc_msg_5: "",

    addMc_msg_6: [
      "请保持机器不能断网、断电、掉卡，如果机器使用过程中出现中断，则将会把质押的144小时机器使用量的DBC扣除。 出租时间不超过144小时，则",
      "按照实际使用时间全部扣除！"
    ],
    mc_msg_1: "如果机器使用过程中出现中断，则将会把质押的144小时机器使用量的DBC扣除。<br>出租时间不超过144小时，则全部扣除"
  },
  mcList: {},
  my_machine_binding_email: "绑定的邮箱",
  my_machine_vocing: "正在验证中, 大概需要几分钟(若等待时间超过5分钟,请切换手机热点后刷新页面并且关闭VPN)",
  my_machine_isnormal_over: "订单已结束",
  my_machine_nonormal_over: "订单被中断",
  my_machine_order_cancer: "订单已取消",
  my_machine_order_rent_success: "正在使用中",
  my_machine_order_vocing_pay: "正在进行支付验证中，大概需要几分钟(若等待时间超过5分钟,请切换手机热点后刷新页面并且关闭VPN)",
  my_machine_order_pay_error: "验证失败，已经超过支付有效期",
  my_machine_order_return_dbc: "退币成功",
  my_machine_order_vocing_machine_success: "机器环境验证成功，请点击支付",

  my_machine_beused_time: "已使用时间",
  my_machine_hour: "h",
  my_machine_min: "分钟",
  my_machine_dbc_version: "DBC版本",
  my_machine_china: "中国",
  my_machine_idle_gpus: "空闲GPU数",
  my_machine_length_of_available_time: "最长可租用时间",
  my_machine_total_time_be_used: "累计出租时长",
  my_machine_total_rent_count: "出租总次数",

  list_country: "国家",
  list_dbc_version: "DBC版本",
  list_try: "试用",
  list_rentout_gpu: "租GPU容器", //2020 1 9
  list_rentout_cpu: "租CPU容器", //2020 1 9
  list_china: "中国",
  list_idle_gpus: "机器空闲GPU数",
  list_length_of_available_time: "最长可租用时间",
  list_total_time_be_used: "累计出租时长",
  list_total_rent_count: "出租总次数",
  list_error_rent_count: "中断次数",
  list_cuda_version: "最高支持CUDA版本",
  list_disk_space: "硬盘",
  list_cpu_type: "CPU型号",
  list_half_precision_tflops: "半精度浮点数",
  list_gpu_ram_size: "GPU显存",
  list_disk_bandwidth: "硬盘带宽",
  list_cpu_numbers: "CPU内核数",
  list_ram_size: "机器内存数",
  list_single_precision_tflops: "单精度浮点数",
  list_gpu_ram_bandwidth: "GPU显存带宽",
  list_inet_up: "上行带宽",
  list_double_precision_tflops: "双精度浮点数",
  list_pcie_bandwidth: "总线传输速度",
  list_inet_down: "下行带宽",
  list_os: "操作系统",
  list_all: "所有",
  list_create_order_success: "创建订单成功",

  myMachine_rent_success_msg: "机器租用成功，登陆信息已发送至您的邮箱，请查收并妥善保管",
  myMachine_is_pay_vocing: "支付确认中",
  myMachine_maybe_is_used: "机器可能已经被租用，请取消订单，重新租用其他机器",
  myMachine_is_vocing_machine: "正在验证机器环境是否可用，大概需要1-3分钟(若等待时间超过5分钟,请切换手机热点后刷新页面且关闭VPN)",
  myMachine_is_dbc_transfering: "正在DBC转账中(若20s后仍然正在转账中，请切换到手机热点后刷新页面且关闭VPN)",
  myMachine_is_dbc_transfering_congtu_cloud: "正在转账中(若20s后仍然正在转账中，请切换到手机热点后刷新页面且关闭VPN)",
  myMachine_is_paying: "正在支付中(若20s后仍然正在转账中，请切换到手机热点后刷新页面且关闭VPN)",
  myMachine_is_transfer_error: "DBC转账失败，请重新支付",
  myMachine_return_dbc: "退币",
  myMachine_confirm_pay: "继续支付",
  myMachine_concer_order: "取消订单",
  myMachine_no_double_pay: "注意不要重复支付，可以到我的钱包，转账记录中查看。如果已经支付，请点击我已支付",
  myMachine_please_confirm_pay: "请确认支付",
  myMachine_confirm: "确定",
  myMachine_cancer: "取消",
  myMachine_paid: "我已支付",
  myMachine_code_send: "验证码已发送至您的邮箱，请填写验证码",
  myMachine_cancer_order: "取消订单",

  footer_friend: "友情链接",

  dlg_bindMail_input_email: "请输入正确的邮箱地址",
  dlg_bindMail_binding_error: "绑定失败",
  dlg_bindMail_no_dbc: "钱包DBC余额不足，无法绑定邮箱，请进入我的钱包用支付宝充值最少1个DBC（不到0.1元）",

  dlg_lease_time: "使用时长",
  dlg_lease_wallet_balance: "当前钱包DBC余额",
  dlg_lease_create_order: "生成订单",

  dlg_rate_edit_evalute: "编辑评价",
  dlg_rate_please_input: "请输入内容",
  dlg_rate_please_code: "请输入验证码",
  dlg_rate_send_code: "发送验证码",

  dlg_reload_one: "第一项",
  dlg_reload_tow: "第二项",

  dlg_return_dbc: "退币",
  dlg_input_code: "输入邮件验证码",
  dlg_input_code_stop: "输入邮件验证码，退租后数据和环境会保留7天，可以在我的停止容器里面启动", // 2020.1.21

  dlg_get_code: "获取验证码",

  dlg_try: "试用",
  dlg_try_condition: "试用条件：当前钱包持有大于等于5000个DBC（新用户前3次试用没有此要求）", // 2020.1.12
  dlg_try_fee: "试用费用：低于1个DBC",
  dlg_try_time: "试用时间：15分钟，每个机器只能试用一次", // 2020.1.12
  dlg_try_gpu_count: "GPU 数量：0",
  dlg_try_confirm: "确认支付",
  dlg_try_msg: "支付成功后，机器登陆信息将会发送到您的邮箱中",

  drop_item_select: "请选择",
  drop_item_no_data: "无数据",

  wallet_box_adddress: "钱包地址:您的地址也可以称为您的帐户.当你把这个地址发给对方时,对方可以给您的钱包地址打DBC代币.",
  wallet_box_keystore: "密钥存储文件:密钥存储文件使用密码以加密形式存储您的私钥.建议始终使用密钥存储文件来解锁您的钱包.",
  wallet_box_key: "您的私钥这是您的私钥的未加密文本版本,意味着不需要密码.如果有人找到你的未加密的私钥,他们可以在没有密码的情况下访问你的钱包.因此,通常建议使用加密版本.",

  creat_wallet_index_download: "请下载加密后的私钥",

  mywallet_create: "创建钱包账号",
  mywallet_open: "打开钱包账号",
  mywallet_open_create: "请打开或者创建钱包",
  mywallet_transfer_record: "转账记录",
  mywallet_display: "打开或者创建钱包查看转账记录",

  machine_detail_many: "人参与评分，评分",
  machine_detail_no: "否",
  machine_detail_yes: "是",

  machine_order_rentout: "机器出租的订单信息",
  machine_order_evaluation: "用户评价",
  machine_order_is_over: "订单已结束",
  machine_order_is_nonormal_over: "订单被中断",
  machine_order_cancer: "订单已取消",
  machine_order_using: "正在使用中",
  machine_order_vocing_pay: "支付验证中",
  machine_order_vocing_failure: "验证失败，已经超过支付有效期",
  machine_order_return_dbc_success: "退币成功",
  machine_order_is_used_time: "已使用时间",
  machine_order_hour: "小时",
  machine_order_min: "分钟",

  add_machine_download: "打开操作手册",
  add_machine_input_time: "输入时间",
  add_machine_from: "从",
  add_machine_from_time: "小时以后开始出租",
  add_machine_to: "到",
  add_machine_to_time: "小时以后结束出租",
  add_machine_input_id: "请输入机器id",
  add_machine_machine_id: "机器id",
  add_machine_msg_tips: "当挖矿开始后(预计时间在9-10月份),深脑链全网每天固定有95.89万个DBC的额外在线奖励,会根据机器的综合性能指标进行自动奖励分配，但是参与挖矿需要每卡质押300-600美金左右等值的DBC", //9.15 21.27

  my_machine_miner_info: "我出租的机器信息",
  my_machine_miner_tips: "如果机器使用过程中出现中断，则将会把合约中质押的7天机器使用量的DBC扣除。出租时间不超过7天，则全部扣除",
  my_machine_miner_rentout: "出租机器",
  my_machine_miner_vocing: "正在验证中,大概需要几分钟",
  my_machine_miner_status: "机器状态",
  my_machine_miner_online: "在线",
  my_machine_miner_offline: "离线",
  my_machine_miner_can_beused_time: "可用时段",
  my_machine_before: "前",
  my_machine_after: "后",
  my_machine_start: "开始",
  my_machine_end: "小时后结束",
  my_machine_can_time: "可用时间",
  my_machine_edit: "重新编辑",

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

  list_start_rentout: "分钟后可租用", //9.17 19:33
  list_can_rentout: "用户现在可租用", //9.17 19:33
  my_gpu_count: "我租用的GPU数量", //9.17 19:33

  pay_over_time: "无法支付，已经超过10分钟有效期，订单将会在1分钟内自动取消", //9.29 00:26
  click_to_view: "点击查看",
  continue_pay: "续租",
  continue_pay_time: "续租时长",
  continue_pay_details: "订单详情",
  click_to_view_continue_pay: "查看续租订单详情",
  continue_pay_pay_success: "支付成功",
  continue_pay_success: "续租成功",
  continue_pay_order_is_over: "订单结束",

  restart_machine: "重启容器", //12.22

  cpu_mode_switch: "付费方式需要支付DBC才可以使用CPU容器。质押方式不需要实际花费DBC，只需要将质押DBC，就可以免费使用CPU容器，使用结束后，质押的DBC会全部退回。两种使用方式功能上没有任何区别。",
  payment: " 付费方式 ",
  deposit: " 质押方式 ",
  pleae_create_wallet: "请先在我的钱包中创建钱包账号",
  choseImages: "请选择环境框架",
  diskspace_dlg: "硬盘空间",
  diskspace_giving: "容器创建后，空间无法扩增，请注意硬盘空间充足，免费赠送",

  diskspace_giving_gpu: "每个GPU赠送",
  buy_diskspace: "额外购买硬盘空间",
  disk_hour: "G*h",
  disk_max: "最多可以购买",
  memory_dlg: "分配的内存空间",
  memory_every_gpu: "每个GPU分配内存数为",
  lease_gpu: "租用GPU容器",
  over_max_disk: "购买硬盘空间超限,增加GPU数量，可以增加最大硬盘空间",
  diskspace_remaining: "最大可用硬盘空间",
  memory_more: "购买的硬盘空间越大，分配的内存空间越多",
  open_cpu_to_gpu: "启用GPU",
  diskspace_cpu_data: "当前CPU容器已经使用的硬盘空间为",
  diskspace_gpu_data: "当前GPU容器已经使用的硬盘空间为：",
  diskspace_new_gpu: "启动GPU后容器剩余空间为",
  diskspace_every_cpu_can_buy: "每个GPU最多可以购买",
  myMachine_is_vocing_machine_update: "正在启动GPU(如果无法启动，可以联系support@dbchain.ai)，根据您容器已存储的数据大小，大概需要",
  myMachine_is_vocing_machine_update_congtu_cloud: "正在启动GPU(如果无法启动，可以联系support@congtu.cloud)，根据您容器已存储的数据大小，大概需要",
  container_is_closed_update: "在启动GPU的过程中,当前CPU容器会处于关闭状态,无法使用,启动完成后,可以重新登陆",
  rent_cpu_cotainer: "租用CPU容器",
  open_gpu_cpu_to_gpu: "启动GPU",
  deposit_tips1: "1.免费容器功能可以帮助在准备环境、传输数据的时候节省费用.当所有条件准备好过后,可以再付费启用gpu,进行训练或者推理",
  deposit_tips2: "2.质押功能不收取任何费用,但需要抵押DBC作为押金,当容器停止使用或者开启使用GPU后押金会自动退回",
  deposit_tips3: "3.押金会打到区块链智能合约中,可以通过钱包地址随时查看押金的状态,任何人无法动用押金",
  myMachine_rent_success_msg_update: "GPU启动成功，稍等3分钟，可以登陆使用",
  please_switch_cpu_mode: "请选择CPU容器使用方式",
  switch_diskspace: "选择硬盘空间",
  switch_memory: "选择内存空间",
  deposit_dbc_count: "需要质押的DBC数量",
  return_deposit_dbc: "使用过程中，如果机器发生中断，将会退回所有质押的DBC",
  deposit_time_tip: "当前机器最长可以选择使用{time}，最短1个小时.",
  stop_time_tip: "如果机器时间到期,容器会被停用.,机器所有数据将会" +
    "被自动保留7天,7天内任何时间可以继续启用容器,进行使用,但是启用的时候钱包DBC余额需要大于2000DBC,容器停止超过7天将会被销毁." +
    "机器使用完成后,可以提前退租,质押的DBC将会退还到钱包中.",
  deposit_dbcs_cpu: "质押的DBC总数",
  cpu_containers_list: "已创建CPU容器数",
  cpu_containers_can_use_memory_list: "CPU容器可分配内存",
  cpu_containers_can_use_disk_list: "CPU容器可分配硬盘",
  gpu_containers_can_use_memory_list: "GPU容器可分配内存",
  gpu_containers_can_use_disk_list: "GPU容器可分配硬盘",
  memory_space: "内存空间",
  howsellDBC: "如何出售DBC",
  helpsell: {
    title: "如何出售DBC",

    "2": "1.从火币出售DBC（先将DBC换成比特币，然后将BTC换成人民币进入银行账户或者支付宝）",
    "3": "2.从库币出售DBC",
    "4": "3.从Gate.io出售DBC"
  },
  dbc_price_wallet: "DBC价格",
  dbc_price_usd: "美金",
  stopGpu_mymachine: "停止GPU",
  stopgpu_please_switch_cpu_mode: "GPU停止后，GPU容器将会变成CPU容器。CPU容器有两种使用方式，付费方式需要支付DBC才可以使用CPU容器，质押方式不需要实际花费DBC，只需要质押DBC，就可以免费使用CPU容器，使用结束后，质押的DBC会全部退回.两种使用方式，功能完全一样。",
  stopgpu_to_cpu_payment: "停止GPU，切换到CPU容器",
  less_data_disk_10g: "可用硬盘空间不能小于10G",
  less_data_disk_1g: "可用硬盘空间不能小于1G",
  less_data_disk_over_max: "GPU容器数据过大，无法停止GPU",
  diskspace_new_cpu: "关闭GPU后，容器剩余空间为",
  myMachine_rent_success_msg_update_stop_gpu: "停止GPU成功，稍等3分钟，可以登陆使用",
  myMachine_is_vocing_machine_update_stop_gpu: "正在停止GPU(如果无法停止，可以联系support@dbchain.ai)，根据您容器已存储的数据大小，大概需要",
  myMachine_is_vocing_machine_update_stop_gpu_congtu_cloud: "正在停止GPU(如果无法停止，可以联系support@congtu.cloud)，根据您容器已存储的数据大小，大概需要",
  container_is_closed_update_stop_gpu: "在停止GPU的过程中,当前GPU容器会处于关闭状态,无法使用,启动完成后,可以重新登陆",
  open_gpu_stopped: "启动为GPU容器",
  open_cpu_stopped: "启动为CPU容器",
  container_id: "容器ID",
  stop_containers_number: "我的已停止容器数",
  remaining_time_length: "容器销毁时间倒计时",
  stopped_time_length: "容器已经停止的时间",
  image_data_stopped: "容器实际占用空间",
  container_isnormal_over: "容器已停止",
  dbc_vesion_error: "DBC版本号低于0.3.7.3.不支持容器启动功能",
  no_idle_gpus: "当前机器无空闲GPU",
  no_container: "当前机器CPU容器已满",
  stop_to_cpu_container: "启动为CPU容器",
  myMachine_is_vocing_machine_update_stop_to_open: "正在启动容器(如果无法启动，可以联系support@dbchain.ai)，根据您容器已存储的数据大小，大概需要",
  myMachine_is_vocing_machine_update_stop_to_open_congtu_cloud: "正在启动容器(如果无法启动，可以联系support@congtu.cloud)，根据您容器已存储的数据大小，大概需要",
  myMachine_rent_success_msg_update_stop_to_open: "容器启动成功，稍等3分钟，可以登陆使用",
  stop_to_gpu_container: "启动为GPU容器",
  user_defined: "自定义安装",
  cpu_container_instruaction: "温馨提示：先租用CPU容器，准备好环境和数据后，再切换成GPU容器，可以节省费用",
  diskspace_data_stop: "当前容器已经使用的硬盘空间为：",
  diskspace_new_cpu_stop: "容器启动后剩余空间为",
  myMachine_gpu_rentout: "我出租的机器",
  lessdbc: "DBC余额不足",
  transfer_error: "转账失败，请再次尝试",
  transfer_success: "转账成功",
  dbc_lack_of_balance: "DBC余额不足",
  please_confirm_pay: "请确认支付",
  stop_instruaction: "温馨提示：您钱包余额大于2000DBC，可以启用已经停止的容器，历史数据保存在里面",
  dbcnum_error: "输入数字不正确",
  your_country: "添加机器所处地理位置",
  stopgpu_tip_mymachine: "停止GPU后，会切换成CPU容器，所有数据都会被保存,并且可以继续使用",
  myMachine_rentout_success_msg: "验证成功，3分钟后机器可以对外出租",
  myMachine_rentout_error: "验证失败，机器无法上线，技术支持联系support@dbchain.ai",
  myMachine_is_vocing_machine_rentout: "正在验证机器是否可用，请耐心等待，大概需要5-10分钟",
  my_machine_miner_vocing_rentout: "验证中",
  my_machine_miner_vocing_error: "验证失败",
  stoprent_tip_mymachine: "退租后,数据会被继续保存7天，如果钱包余额大于2000DBC,可以在我的停止容器中启动后继续使用",
  list_gpu_count_tip: "当前机器的GPU型号和GPU总数",
  transfer_tips: "在目标地址中输入对方的DBC钱包地址，然后输入转账的DBC数量，点击发送，就可以把DBC转账到对方的DBC钱包中,大概10-30秒对方就可以收到DBC",
  dbc_price_wallet_tips: "DBC价格是随时波动的，购买DBC的时候请注意波动风险",
  dbcChange_tips: "DBC 24小时价格变化",
  dlg_bindMail_dbc_tip: "温馨提示:钱包中需要至少1个DBC才能绑定成功",
  dlg_bindMail_voc_failure: "验证失败，请重新获取验证吗，进行验证",
  restart_tip_mymachine: "如果容器无法连接，可以重启容器，进程会被杀死，数据不会丢失、环境不会被重置",
  send_email_error: "邮件发送失败，请再次点击发送",
  send_email_repeat: "重发邮件",
  diskspace_less_zero: "容器剩余可用空间不能小于0",

  myMachine_rentout_success_msg_mining: "验证成功，当前机器为挖矿机器，3分钟后机器可以在云算力平台上线", //2020 4.9

  month_discount: "包月折扣",
  quarter_discount: "包季折扣",
  year_discount: "包年折扣",
  rentout_machine_classification: "机器分区",
  rentout_machine_classification_tag: "普通AI训练区@高稳定AI训练区",
  rentout_machine_normal: "普通AI训练区",
  rentout_machine_high: "高稳定AI训练区",
  rentout_machine_type: "机器出租方式",
  rentout_machine_tag: "支持单卡出租@仅支持整租",
  rentout_machine_whole: "仅支持整租",
  rentout_machine_one_gpu: "支持单卡出租",
  rentout_machine_type_info: '如果希望机器可以同时在高性能并行计算区出租必须要选择"仅支持整租",同时需要质押DBC',
  high_stability_conditions0: "机器进入高稳定AI训练区，需满足条件:",
  high_stability_conditions1: "1) 累计稳定运行超过144小时",
  high_stability_conditions2: "2) 历史上没有中断记录，如果机器有一次中断记录，将会被自动分配到普通AI训练区",
  high_stability_conditions3: "3) 根据当前DBC实时价格每卡至少质押{dbc_count}DBC，质押数量没有最高限制，相同参数机器，质押的数量越高，用户租用的概率越大，当机器出现断网、断电、掉卡三种情况之一，按照正在使用的卡数补偿用户DBC，剩余的退回",
  high_stability_conditions4: "如果机器出问题时，质押的50%DBC用于补偿用户；如果机器出现问题后24小时内没有再次上架机器，另外的50%也将会被扣除",
  miner_confirmPay: "开始质押DBC",
  input_deposite_dbc_count: "输入每卡质押的DBC",
  deposite_dbc_count_total: "质押的DBC总数为",
  deposite_dbc_count: "每卡质押的DBC",
  compensation_dbc_count: "每卡补偿的DBC",
  my_machine_miner_close_status: "机器已下架",
  my_machine_will_close: "下架机器",
  miner_confirmPay_repeat: "继续支付验证",
  my_machine_order_vocing_pay_error: "支付验证失败，请再次支付验证",
  unkown_error: "未知错误，请再试一次",
  deposite_dbc_count_instruction: "如果当前机器在使用过程中机器本身出现断网、断电、掉卡的现象，除了会返回最多144小时的已使用DBC,还会每卡额外再补偿的DBC数量",
  week_discount_instruction: "选择包周租用机器，在租用成功后的24小时内可以随时退租，提前退租没有折扣优惠,超过24小时不能退租",
  month_discount_instruction: "选择包月租用机器，在租用成功后的48小时内可以随时退租，提前退租没有折扣优惠,超过48小时不能退租",
  quarter_discount_instruction: "选择包季度租用机器，在租用成功后的72小时内可以随时退租，提前退租没有折扣优惠,超过72小时不能退租",
  year_discount_instruction: "选择包年租用机器，在租用成功后的96小时内可以随时退租，提前退租没有折扣优惠,超过96小时不能退租",
  rentout_machine_whole_instruction: "只能同时租用当前机器的所有GPU",
  rentout_machine_one_gpu_instruction: "可以最少租用机器的1个GPU，也可以租用多GPU",
  sold_out_machine_confirm: "确定下架机器",
  please_sold_out_machine_confirm: "请确认是否下架机器",
  my_machine_will_putaway: "上架机器",
  success_connectivity_verification: "机器使用环境验证成功",
  sold_out_machine_tip: "只有在当前没有用户使用的时候才能下架机器，但是12小时内需要上架机器，否则会扣除质押的50%DBC。如果永久下架机器，需要最后一个用户使用结束超过8天，否则会扣除质押的50%DBC，机器下架48小时后，会退还质押的全部DBC.机器下架超过72小时后，当前机器将会从列表中删除",
  time_sold_out_machine: "机器已经下架的时间",
  operation_sold_out_machine_used_tip: "当前有用户正在使用，不能下架机器",
  time_sold_out_machine_tip2: "当前机器在用户使用的时候发生中断，请尽快上架机器",
  time_sold_out_machine_tip3: "请尽快上架机器，否则机器下架超过12小时将会被扣除DBC",
  time_sold_out_machine_tip4: "机器下架48小时后将会退回质押的DBC",
  accounting_area_info: "机器所在的出租区域",
  leaseback_anytime: "随时可退租",

  monthly: "包月",
  quarterly: "包季",
  yearly: "包年",
  whole_rent_machine_tip: "（当前机器只能整组）",
  disk_auto_machine_type: "分配的硬盘空间",
  miner_confirmPay_tip0: "质押DBC成功后，机器将会进入高稳定AI训练区",
  miner_confirmPay_tip1: "质押DBC成功后，机器将会进入高性能并行计算区",
  ai_help: "AI训练和推理帮助文档",
  filecoin_help: "高性能并行计算帮助文档",
  supernode_help: "DBC超级节点租用帮助文档",
  rent_machine_ai_help: "租用AI服务器帮助文档",
  use_machine_ai_help: "AI服务器使用手册",
  question_machine_ai_help: "常见问题汇总",
  rent_machine_filecoin_help: "租用高性能并行计算服务器帮助文档",
  use_machine_filecoin_help: "高性能并行计算API接口使用手册",
  rent_machine_dbc_help: "DBC超级节点租用帮助文档",
  use_machine_dbc_help: "启用DBC超级节点帮助文档",
  myMachine_confirm_pay_tip: "如果已经支付，请点击继续支付后，在弹框中点击我已支付；如果没有支付，请点击继续支付后，在弹框中点击确认支付",
  miner_confirmPay_tip3: "请点击开始质押DBC,质押DBC成功后，机器将会正式上线",
  gasamount: "GAS数量",
  what_gas: "什么是GAS",
  gas_info: "GAS是一种转账费用的单位，每进行一次DBC转账或者支付DBC购买机器，都需要消耗0.001个GAS，如果钱包GAS为0,则支付DBC购买机器会失败",
  how_get_gas: "怎样获取GAS",
  how_get_gas_info: "通过支付宝购买DBC，会自动获得一定数量的GAS",
  left_gasamount: "当前钱包GAS数量",
  zerogas: "当前钱包GAS为0,无法支付，请在支付宝购买100个DBC，会免费获得0.005个gas",
  zerogas_wallet: "当前钱包GAS为0,无法转账，请在支付宝购买100个DBC，会免费获得0.005个gas",
  congTuCloud: {
    header: {
      login: "登录",
      register: "注册",
      signOut: "退出账号"
    },
    page1: {
      title: ["聪图云", "聪图云", "聪图云"],
      describe: [
        "全球分布式GPU算力网络",
        "提供高性价比GPU算力",
        "高性能、高密度、低延时、低成本、全覆盖"
      ],
      buttonText: ["立即体验", "立即体验", "立即体验"]
    },
    page2: {
      title: "五大保障",
      describe: "拥有多维度全方位的支持",
      iconText: [
        "高性价比GPU资源",
        "高密度低延时",
        "在线编程调试",
        "丰富的训练数据支持",
        "安全稳定可靠"
      ]
    },
    page3: {
      text: ["支持", "12", "种主流框架"]
    },
    page4: {
      title: "支持主流数据集",
      describe: "常用数据集无需上传，聪图云为用户提供了现成的主流深度学习数据集，供用户快速访问和使用。",
      options: ["图像数据集", "自然语言处理数据集", "KAGGLE", "天池"],
      chart1: {
        title: "图像数据集",
        col1: ["PASCAL VOC", "Labelme", "COCO"],
        col2: ["SUN", "Caltech", "Corel5k"],
        col3: ["3D_Segmentation", "ImageNet"]
      },
      chart2: {
        title: "自然语言处理数据集",
        col1: ["dbpedia", "amazonreviews", "youtube8m"],
        col2: [
          "imdb-sentiments",
          "UCI-spambase",
          "stanford-question-answering"
        ],
        col3: ["beethoven", "videos_and_music"]
      },
      chart3: {
        title: "KAGGLE",
        col1: ["MNIST", "VOC2012"],
        col2: ["IMDB reviews", "Sentiment140"],
        col3: ["Google Books Ngrams", "Jeopardy"]
      },
      chart4: {
        title: "天池",
        col1: [
          "ChnSentiCorp_htl_all",
          "weibo_senti_100k",
          "SIGHAN Bakeoff 2005"
        ],
        col2: ["ez_douban", "BERT", "ELMO"],
        col3: ["NLTK Corpora", "ClueWeb11 FACC"]
      }
    },
    page5: {
      title: "兼容第三方工具",
      iconText: [
        "Jupyter",
        "PyCharm",
        "Xshell",
        "VS Code",
        "Spyder",
        "PuTTY",
        "VNC"
      ]
    },
    page6: {
      iconText: "在线编辑调试",
      title: "支持在线编辑调试",
      describe: "平台内置调试工具，可在线编辑代码、调试任务，一键启动，免去开发环境配置。"
    },
    page7: {
      title: "合作的客户",
      describe: "各大高校师生和企业都在使用聪图云"
    },
    footer: {
      aboutUs: "关于我们",
      company: "聪图人工智能科技（上海）有限公司",
      copyright: "2019-2021 © All Rights Reserved",
      record: "",

      recruit: "人才招募",
      HREmail: "HR邮箱: hr@congtu.cloud",
      HRWechat: "",

      contactUs: "联系我们",
      comEmail: "技术支持邮箱: support@congtu.cloud",
      comWechat: "公司微信: CongTuCloud",

      wechat: "微信公众号"
    }
  },
  rentout_machine_ai_platform_select: "请选择在哪些云平台出租此机器",
  rentout_machine_platform_tag: "在所有云平台出租机器@只在本平台出租机器",
  rentout_machine_ai_platform_select_info: "基于DBC网络的云平台全球有数十家，如果选择在所有云平台出租机器，则这些云平台的用户都可以看到您的机器并且能够租用，如果选择只在本云平台出租机器，则只有本平台的用户可以看到和租用",
  // 注册页面文本
  register: {
    title: "注册账号",
    buttonText: "注册",
    inputAccountTips: "请输入邮箱号",
    inputCodeTips: "验证码",
    codeTextTips: {
      sendCode: "发送验证码",
      sendCodeAgainPre: "再次发送(",
      sendCodeAgainNext: "s)"
    },
    inputPwdTips: "设置新密码",
    inputPwdAgainTips: "再次输入密码",
    tipsText: {
      registering: "正在注册，请稍后…",
      signingIn: "正在登录…",
      pwdError: "密码不一致，请检查密码后重试！",
      registerCodeError: "验证码不能为空！",
      sendingCode: "正在发送验证码…"
    },
    clickRegister: "点击注册"
  },
  // 登录页面文本
  login: {
    title: "聪图云",
    inputAccountTips: "请输入邮箱号",
    inputPwdTips: "请输入密码",
    buttonText: "登录",
    tipsText: {
      signingIn: "正在登录…",
      jumping: "，正在跳转到网盘首页…"
    },
    forgetPwd: "忘记密码?",
  },

  mywallet_open_old: "打开旧钱包账号",
  mywallet_open_new: "打开新钱包账号",

  // 新加
  mnemonic: "助记词",
  errorPassword: "密码错误",
  mywallet_create_new: "创建新钱包账号",
  ...enLocale,


  /**
   * hz 新增单词
   */
  result: '结果',
  verifyPassward: "请输入账户密码",
  audit:{
    // 抢单页面
    ordergrabbingMachine:'抢单机器列表',
    distributionMachine:'分配机器列表',
    myAudit:'我的审核列表',
    myOrder:'我的抢单列表',
    ogMachine_tips:'当有人开时抢单后，该订单时间开时倒计时，限制3小时结束，需在半小时内发送给验证人session信息给对应验证人，验证人有一小时验证时间。   验证人在3小时以后才可提交原始信息，如提前提交，需扣除100RMB等值的DBC作为惩罚',
    order:'编号',
    seeDetails:'等待接单中',
    seeDetails1:'等待问题描述',
    seeDetails2:'查看问题描述',
    status:'状态',
    status1:'等待抢单',
    status2:'已被抢完',
    hasNum:'已抢单人数',
    start:'开时抢单',
    start1:'已抢单',
    tipmsg:'抢单以后等待提名人发送相关信息后方可查看信息',
    tipmsg1:'抢单成功',
    tipmsg2:'抢单失败',
    message:'错误描述',
    confirm: '运行虚拟机',
    hasError:'机器有问题',
    noError:'机器无问题',
    // 派单页面
    verification:'开始验证',
    verification1:'提交验证结果Hash值',
    verification2:'提交验证结果原始值',
    tipmsg3:'机器发放成功，请前往我的机器列表',
    mytime:'我的可验证时间段',
    verification_tips:'在验证的时间内必须提交结果',
    verification_tips1:'36小时后才能够提交，提交内容包含原始值',
    // 我的审核
    machineStatus:'机器状态',
    machineStatus1:'验证中',
    machineStatus2:'已上线',
    machineStatus3:'租用中',
    machineStatus3:'闲置中',
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
  }

};
