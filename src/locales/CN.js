import enLocale from 'element-ui/lib/locale/lang/en'

export default {
  message: "hello i18n !!",
  $: '$',
  send: '发送',
  closeWallet: '关闭钱包',
  toAddress: '目标地址',
  amount: '数量',
  from: '源地址',
  to: '目标地址',
  value: '数量',
  asset: '资产名称',
  transfer: '转账记录Hash值',
  day: '天',
  hour: '小时',
  password: '密码',
  unsubscribe: '退租',
  subscribe: '订阅',
  tips: '温馨提示',
  total: '总计',
  confirm: '确定',
  cancel: '取消',
  confirmPay: '确认支付',
  enterPassword: '请输入密码',
  newWallet: '新的钱包',
  inputPsWarning: '密码至少需要8个字符',
  create: '创建',
  dlEncryptedKey: '下载加密后的私钥',
  finished: '完成',
  amountNoMore: '转账数量不能超过您的钱包的余额', // new
  noZero: '数量不能小于等于零', // new
  errAddr: '钱包地址不正确',
  transferSuccess: '转账成功，请等待区块同步后查看',
  transferFail: '转账失败',
  confirmTrTitle: '确认转账',
  confirmTrMsg: '你正在发送 <b>{amount}</b> DBC到此地址:<br> <b>{address}</b>',
  confirmTrWaring: '确定吗?',
  lease: '租用',
  bind: '绑定',
  modify: '修改',
  scores: '分',
  back: '返回',
  reEdit: '重新编辑',
  open_wallet: '打开钱包',
  access_wallet: '选择打开钱包的方式',
  keystore_file: 'Keystore文件',
  private_key: '私钥',
  select_wallet_file: '选择钱包文件',
  paste_key: '粘贴或者输入私钥',
  enter_key: '输入密码',
  continue: '继续',
  unlock: '解锁',

  heads: {
    logo: "DBCTrade",
    home: "首页",
    gpu: "租用GPU",
    // network: "DBC NETWORK",
    miner: "GPU出租",
    talk: "AI开发者论坛",
    // api: "DBC API",
    //help: "帮助",
  },
  footer: {
    DBChain: "DeepBrain Chain",
    DBCMiner: "DBCMiner",
    DBCTalk: "DBCTalk",
    KuCoin: "KuCoin",
    DBCTrade: "DBCTrade",
    DBCloud: "DBCloud",
    HuobiPro: "Huobi Pro",
    GateIo: "Gate.io"
  },
  gpu: {
    myWallet: '我的钱包',
    myMachine: '我的机器',
    machineList: '机器列表',
    walletAddress: '钱包地址',
    notice_1: '请保管好私钥信息，私钥丢失，任何人都将无法帮你找回DBC资产!',
    amount: '数量',
    howBuyDBC: '如何购买DBC',
    exchangeCash: '等值美元',
    showDeitailDBC: '查看dbc详细信息:',
    clickCoinmarktcap: '进入了解',
    transfer: '转账',
    myMachineTitle: '我租用的机器',
    pcs: '台 机器',
    machineOnLine: '机器在线',
    machineOffLine: '机器离线',
    remainingTime: '剩余时间',
    reload: '续费',
    payDBCs: '支付的DBC总数',
    payPrice: '支付时DBC价格',
    actualPrice: '产生实际的费用',
    currentRemaining: '剩余',
    userTime: '已使用时间',
    //storeTime: '存储使用时间',
    //storeSpace: '存储空间',
    //gpuCost: 'GPU费用',
    gpuBilling: '支付时GPU价格',
    //gpuRemainTime: 'GPU使用剩余时间',
    //storeCost: '存储费用',
    //storeBilling: '存储价格',
    //storeRemainTime: '存储使用剩余',
    //reliable: '可靠性',
    // machineLoginInfo: '机器登录信息',
    // increaseHD: '增加硬盘空间',
    //totalTime: '累计时长',
    storage: '硬盘',
    //needHD: '需要硬盘空间',
    //reloadTime: '续租时长',
    DBCRemaining: '当前DBC余额',
    exchangeDBC: '等值DBC数量',
    machineRemaining: '当前机器可用',
    HDSpace: '硬盘空间',
    from: '从',
    addTo: '提到',
    originalPrice: '原来价格',
    currentPrice: '现在价格',
    rate: '评价',
    createWallet: '创建钱包账号',
    openWallet: '打开钱包账号',
    rentMachine: '打开或者创建钱包租用机器',
    mcStatusTitle: '机器状态', // new
    mcStatus: [
      '所有机器',
      '空闲机器',
      '被租机器'
    ], // new

    dbc_version: [
      '全部',
      'V0.3.7.2'
    ],
    have_ip: [
      '全部',
      '没有',
      '有'
    ],
    cumulativeDuration: '累计出租时长', // new
    // reliability: '历史可靠性', // new
    lengthOfAvailableTime: '最长可用时间', // new
    choseGpuCount: '选择GPU数量', // new
    bindMail: '绑定邮箱', // new
    bindMailInfo: '绑定的邮箱用来收取GPU的SSH账户登陆信息，<br>' +
      '租用GPU之前必须先到我的机器界面绑定邮箱',
    modifyMail: '修改邮箱',
    mailAddress: '邮箱地址',
    inputMail: '请输入邮箱地址',
    inputNewMail: '请输入新邮箱地址',
    receiveMail: '收邮件',
    receiveMailInfo: '点击收取邮件，并且按照邮件内容输入dbc数量完成验证',
    verifyDbc: '请输入要验证的DBC数量',
    attentionDecimal: '请注意输入小数点',
    startBind: '开始绑定',
    mcDetails: {
      th_1: '用户钱包地址',
      th_2: '实际dbc成交数量',
      th_3: '使用中是否出现故障',
      th_4: '租用GPU数量',
      th_5: 'dbc退款数量',
      th_6: '用户购买总时长',
      th_7: '实际使用时长',
      th_8: '用户评分'
    },
    userRate: '用户评价',
    mcTradeInfo: '机器交易信息',
    backDbcNum: '退回DBC数量为',
    rateMsg: '你想给它评几星',
  },

  county: '国家',
  idle_status: '机器使用状态',
  total_time: '累计出租时间',
  total_rent_count: '出租总次数',
  error_rent_count: '中断次数',
  disk_GB_perhour_dollar: '',
  length_of_available_time: '最长可用时间',
  gpu_price_dollar: '单GPU每小时价格',
  gpu_count: 'GPU数量',
  tensor_cores: 'Tensor Cores',
  half_precision_tflops: '半精度浮点数',
  single_precision_tflops: '单精度浮点数',
  double_precision_tflops: '双精度浮点数',
  gpu_ram_size: 'GPU显存',
  gpu_ram_bandwidth: 'GPU显存带宽',
  pcie_bandwidth: '总线传输速度',
  cpu_numbers: 'CPU内核数',
  ram_size: '内存大小',
  disk_bandwidth: '硬盘带宽',
  inet_up: '上行带宽',
  inet_down: '下行带宽',
  have_ip_title: '独立IP',
  onlines_tatus: '机器在线状态',
  disk_space: '硬盘空间',
  dbc_version_title: 'DBC版本',

  msg: {
    dlg_0: '当前机器最长可以租用{time}，最短1个小时',
    //dlg_1: 'DBChain平台收取 3%的服务费（不支持退款）',
    // dlg_2: '1.续租机器退订，将收取实际产生费用的2倍，最多收取合约中所有DBC',
    // dlg_3: '2.如果机器使用过程中出现中断，将最多额外退回7天机器已使用量的DBC。',
    // dlg_4: '3.如果租用时间不超过7天，则全部退回',
    dlg_5: '使用过程中机器出现中断，如果使用时间不超过144小时，则退回全部DBC \n' +
      '<br>' + '如果使用时间超过144小时，则退回144小时使用量的DBC',
    wallet_0: '存储你的私钥文件，将文件保存到安全的地方。比如手动抄写下来，放到保险箱',
    wallet_1: '' +
      '<b>千万不要丢失它!</b>' +
      '如果丢失将无法恢复' +
      '<br>' +
      '也不要分享它！不要在微信、QQ、Facebook、Line、KakaoTalk、WhatsApp等社交软件互相传输' +
      '如果您在恶意钓鱼网站上使用此文件，您的资金将被窃取！' +
      '<br>' +
      '一定要备份！' +
      '就像它有一天可能价值数百万美元一样',
    wallet_2: '保存你的私钥',
    wallet_3: '<b>千万不要丢失它！</b>' +
      '如果丢失将无法恢复<br>' +
      '<b>也不要分享它！不要在微信、QQ、Facebook、Line、KakaoTalk、WhatsApp等社交软件互相传输</b>' +
      '如果您在恶意钓鱼网站上使用此文件，您的资金将被窃取！<br>' +
      '<b>一定要备份</b>' +
      '就像它有一天可能价值数百万美元一样',
    wallet_4: '私钥不正确！',
    wallet_5: '一定要记住密码！不能丢失，' +
      '你需要这个密码和你的私钥才能解锁钱包 '
  },
  home: {
    intr_1: 'DBC是区块链技术驱动的人工智能算力网络，它将分布在全球的GPU通过区块链技术连接在一起。\n' +
      '\n' +
      '            只要你的gpu有空闲，就可以加入到dbc网络赚取dbc token，享受token升值带来的更多收益。\n' +
      '\n' +
      '            只要gpu闲置1小时以上就可以加入dbc网络获取收益',
    intr_2: '这里的GPU来自于全球各地，通过DBC分布式网络连接在一起，这里面没有中心化服务器，你的数据不会被窃取。',
    intr_3: '在这个DBC网络购买机器需要使用DBC Token进行支付。GPU是按照美元定价，DBC价格越高需要的数量越少。',
    intr_4: 'DBC是区块链技术驱动的人工智能算力网络，它将分布在全球的GPU通过区块链技术连接在一起。',
    intr_5: '在DBC网络中你可以找到便宜且类型多样的GPU。当你使用的时候，所有的数据都是加密传输的',
    intr_6: 'GPU租用按照分钟计费，GPU使用过程中如果出现中断，将会最多补偿144小时的费用',
    intr_7: '深脑链从2020年开始每年挖矿产出5亿，3年后，每年产出2.5亿，并且以后每5年产出减半，总计有40亿',
    intr_8: '加入深脑链收益组成：超级节点收益+挖矿收益+租金收益',
    start: '开始租用GPU',
    github: 'GitHub',
    video: '视频',
    startMiner: '开始出租GPU'
  },
  help: {
    'title': '如何购买DBC',
    '1': '1.直接购买DBC，进入',
    // '1': '1.从DBCTrade购买DBC',
    '2': '2.从火币购买DBC',
    '3': '3.从库币购买DBC',
    '4': '4.从Gate.io购买DBC',
    '5': '5.从其他支持DBC的钱包转账到钱包账号，比如neotracker.io、O3Wallet',
    'reloadWallet': '充值进入钱包账号',
  },
  miner: {
    addMc_Title: '请按照如下步骤添加机器：',
    addMc_editTitle: '重新编辑',
    addMc_setupApp: '安装软件',
    addMc_bind: '绑定机器',
    addMc_area: '选择时区',
    addMc_price: '定价',
    addMc_dbc: '输入验证码',
    addMc_mail: '点击此处从邮件获取验证码',
    addMc_date: '指定日期',
    addMc_week: '按照星期重复',
    period_1: '全天（所有时段）',
    period_2: '指定时间段',
    rent: '出租机器',
    rentMachine: '打开或者创建钱包出租机器',
    addMc_msg_1: [
      '安装DBC软件',
      '请根据操作手册进行安装.'
    ],
    addMc_msg_2: '安装完成后，需要填入当前的钱包地址，然后才能在平台上绑定机器。',
    //addMc_msg_3: '请输入挖矿私钥',
    addMc_msg_4: [
      '每个GPU定价',
      //'存储每个GB定价'
    ],
    addMc_msg_5: '收入将会被扣除8%的费用（其中4%用于DBC的共识节点奖励，4%会被燃烧掉），当前DBChain平台不收取任何费用',
    addMc_msg_6: [
      '请保持机器不能断网、断电，如果机器使用过程中出现中断，则将会把质押的144小时机器使用量的DBC扣除。 出租时间不超过144小时，则',
      '按照实际使用时间全部扣除！'
    ],
    mc_msg_1: '如果机器使用过程中出现中断，则将会把质押的144小时机器使用量的DBC扣除。<br>出租时间不超过144小时，则全部扣除'
  },
  mcList: {},
  ...enLocale
}
