import enLocale from 'element-ui/lib/locale/lang/en'

export default {
  message: "hello i18n !!",
  $: '$',
  send: '发送',
  closeWallet: '关闭钱包',
  toAddress: 'TO ADDRESS',
  amount: 'AMOUNT',
  from: 'FROM',
  to: 'TO',
  value: 'VALUE',
  asset: 'ASSET',
  transfer: 'TRANSFER',
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
  enterPassword: 'Enter Password',
  newWallet: 'New Wallet',
  inputPsWarning: 'Password must be at least 8 characters long.',
  create: 'CREATE',
  continue: 'CONTINUE',
  dlEncryptedKey: 'DOWNLOAD ENCRYPTED KEY',
  finished: 'FINISHED',
  amountNoMore: '数量不能超过你自己的余额', // new
  noZero: '数量不能为0或以下', // new
  errAddr: '账户地址不正确',
  transferSuccess: '转账成功，请等待区块同步后查看',
  transferFail: '转账失败',
  confirmTrTitle: 'Confirm Transfer',
  confirmTrMsg: 'you are about to send <b>{amount}</b>DBC to address: <br> <b>{address}</b>',
  confirmTrWaring: 'Are you sure you want to do this?',
  lease: '租用',
  bind: '绑定',
  modify: '修改',
  scores: '分',
  back: '返回',
  reEdit: '重新编辑',
  heads: {
    logo: "DBChain",
    home: "HOME",
    gpu: "租用GPU",
    network: "DBC NETWORK",
    miner: "DBC MINER",
    talk: "DBC TALK",
    api: "DBC API",
    help: "HELP",
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
    notice_1: '请保管好私钥信息，私钥丢失将无法找回DBC资产，包括我们!',
    amount: '数量',
    howBuyDBC: '如何购买DBC',
    exchangeCash: '等值USD',
    showDeitailDBC: '查看dbc详细信息:',
    clickCoinmarktcap: '点击coinmarktcap',
    transfer: 'TRANSFER',
    myMachineTitle: '我租用的机器信息',
    pcs: '台',
    machineOnLine: '在线',
    machineOffLine: '机器离线',
    remainingTime: '剩余时间',
    reload: '续费',
    payDBCs: '支付的DBC总数',
    payPrice: '支付时DBC价格',
    actualPrice: '产生实际费用',
    currentRemaining: '剩余',
    userTime: '使用时间',
    storeTime: '存储使用时间',
    storeSpace: '存储空间',
    gpuCost: 'GPU费用',
    gpuBilling: 'GPU价格',
    gpuRemainTime: 'GPU使用剩余时间',
    storeCost: '存储费用',
    storeBilling: '存储价格',
    storeRemainTime: '存储使用剩余',
    reliable: '可靠性',
    machineLoginInfo: '机器登录信息',
    increaseHD: '增加硬盘空间',
    totalTime: '累计时长',
    storage: 'Storage',
    needHD: '需要硬盘空间',
    reloadTime: '续租时长',
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
      '所有',
      '闲置',
      '已被使用'
    ], // new
    cumulativeDuration: '累计使用时长', // new
    reliability: '历史可靠性', // new
    lengthOfAvailableTime: '可用时长', // new
    choseGpuCount: '选择GPU数量', // new
    bindMail: '绑定邮箱', // new
    bindMailInfo: '绑定的邮箱用来收取GPU的SSH账户登陆信息，<br>' +
      '租用GPU之前必须绑定邮箱',
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
      th_1: '收款钱包地址',
      th_2: '实际dbc成交数量',
      th_3: '使用中是否出现故障',
      th_4: 'dbc退款数量',
      th_5: '用户购买总时长',
      th_6: '实际使用时长',
      th_7: '用户评分'
    },
    userRate: '用户评价',
    mcTradeInfo: '机器交易信息',
    backDbcNum: '退回DBC数量为',
    rateMsg: '你想给他/她评几星',
  },
  msg: {
    dlg_0: '机器最长可以租用{time}时间，最短1个小时时间',
    dlg_1: 'DBChain平台收取 3%的服务费（不支持退款）',
    dlg_2: '1.续租机器退订，将收取实际产生费用的2倍，最多收取合约中所有DBC',
    dlg_3: '2.如果机器使用过程中出现中断，将最多额外退回7天机器已使用量的DBC。',
    dlg_4: '3.如果租用时间不超过7天，则全部退回',
    dlg_5: '1.确认支付后，DBC将打入深脑链的智能合约中，1小时以内退订机器只收取实际产生费用的20%，超过1小时主动退订机器，将收取实际费用的2倍，最多收取合约中所有DBC（此费用是深脑链智能合约收取，非dbchain平台收取）\n' +
      '<br>' +
      '2.如果机器使用过程中出现中断，将最多额外退回7天机器已使用量的DBC。<br>' +
      '如果租用时间不超过7天，则全部退回',
    dlg_6: '计算公式，已经支付DBC的总量- 实际产生的费用*2 <br>即为：',
    wallet_0: 'Save Your Keystore File',
    wallet_1: '' +
      '<b>Do not lose it!</b>' +
      'It cannot be recovered if you lose it.' +
      '<br>' +
      'Do not share it!' +
      'Your funds will be stolen if you use this file on a malicious phishing site.' +
      '<br>' +
      'Make a backup!' +
      'Secure it like the millions of dollars it may one day be worth.',
    wallet_2: 'Save Your Private Key',
    wallet_3: '<b>Do not lose it!</b>' +
      'It cannot be recovered if you lose it.<br>' +
      '<b>Do not share it!</b>' +
      'Your funds will be stolen if you use this file on a malicious phishing site.<br>' +
      '<b>Make a backup!</b>' +
      'Secure it like the millions of dollars it may one day be worth.',
    wallet_4: 'the privateKey may be wrong~!'
  },
  home: {
    intr_1: 'DBC  是区块链技术驱动的开源人工智能计算平台，分布在全球的GPU通过DBC网络连接在一起。\n' +
      '\n' +
      '            只要你的gpu有空闲，就可以加入到dbc网络赚取dbc token，享受token升值带来的更多收益。\n' +
      '\n' +
      '            只要gpu闲置1小时 以上就可以加入dbc网络获取收益',
    intr_2: '这里的GPU来自于全球各地，通过DBC分布式网络连接在一起，这里面没有中心化服务器，你的数据不会被窃取。',
    intr_3: '在这个DBC网络购买机器需要使用DBC Token进行支付。支付通过智能合约完成，没有任何第三方参与。',
    intr_4: 'DBC是区块链技术驱动的开源人工智能计算平台，分布在全球的GPU通过DBC网络连接在一起。',
    intr_5: '在DBC平台你可以找到最便宜的GPU。当你进行AI训练的时候，所有的数据都是加密保存和加密传输的',
    intr_6: 'gpu租用按照分钟计费，GPU使用过程中如果出现中断，数据和模型将会自动迁移到同等配置的机器继续训练。不影响训练体验',
    intr_7: '深脑链总共有40亿的代币用于挖矿，前3年每年产出5亿，3年后，每年产出2.5亿，并且以后每5年产出减半。',
    intr_8: '加入深脑链收益组成：挖矿收益+租金收益',
    start: '开始使用',
    github: 'GitHub',
    video: 'Video',
    startMiner: '开始挖矿'
  },
  help: {
    'title': '如何购买DBC',
    '1': '1.直接购买DBC，进入',
    '2': '2.从火币购买DBC',
    '3': '3.从库币购买DBC，',
    '4': '4.从Gate.io购买DBC',
    '5': '5.从其他支持DBC的钱包转账到钱包账号',
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
    rentMachine: '打开或者创建钱包租用机器',
    addMc_msg_1: [
      '安装DBC挖矿软件',
      '请根据操作手册进行安装.'
    ],
    addMc_msg_2: '安装完成后，会生成一个挖矿私钥，输入后才能在平台上绑定机器。',
    addMc_msg_3: '请输入挖矿私钥',
    addMc_msg_4: [
      '每个GPU定价',
      '存储每个GB定价'
    ],
    addMc_msg_5: '收入将会扣除8%的手续费（其中2%用于DBC共识节点奖励，6%会被燃烧掉）',
    addMc_msg_6: [
      '如果机器使用过程中出现中断，则将会把合约中质押的7天机器使用量的DBC扣除。 出租时间不超过7天，则',
      '按照实际使用时间全部扣除！'
    ],
    mc_msg_1: '如果机器使用过程中出现中断，则将会把合约中质押的7天机器使用量的DBC扣除。<br>出租时间不超过7天，则全部扣除'
  },
  mcList: {},
  ...enLocale
}
