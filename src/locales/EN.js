import enLocale from 'element-ui/lib/locale/lang/en'

export default {
  message: "hello i18n !!",
  $:'￥',
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
  unsubscribe: '退订',
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
  confirmTrWaring:'Are you sure you want to do this?',
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
    machineOnLine: '机器在线',
    machineOffLine: '机器离线',
    remainingTime: '剩余时间',
    reload: '续费',
    payDBCs: '支付到合约中DBC数量',
    payPrice: '支付时价格',
    actualPrice: '实际产生费用',
    currentRemaining: '当前剩余',
    userTime: '使用时间',
    storeTime: '存储使用时间',
    gpuCost: 'GPU费用',
    gpuBilling: 'GPU计费',
    gpuRemainTime: 'GPU使用剩余时间',
    storeCost: '存储费用',
    storeBilling: '存储计费',
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
    rentMachine: 'Open or create a wallet to 租用机'
  },
  msg: {
    dlg_0: '机器最长可以租用90天时间，最短1个小时时间',
    dlg_1: 'DBChain平台收取 3%的服务费（不支持退款）',
    dlg_2: '1.续租机器退订，将收取实际产生费用的2倍，最多收取合约中所有DBC',
    dlg_3: '2.如果机器使用过程中出现中断，将最多额外退回7天机器已使用量的DBC。',
    dlg_4: '3.如果租用时间不超过7天，则全部退回',
    wallet_0: 'Save Your Keystore File' ,
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
    wallet_3 : '<b>Do not lose it!</b>' +
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
    '3': '3.从库币购买DBC，' ,
    '4': '4.从Gate.io购买DBC',
    '5': '5.从其他支持DBC的钱包转账到钱包账号',
    'reloadWallet': '充值进入钱包账号',
  },
  ...enLocale
}
