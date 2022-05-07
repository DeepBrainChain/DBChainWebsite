import enLocale from 'element-ui/lib/locale/lang/fr'

export default {
  /* 关于webtype:
   ** 修改数值时，要把router.js文件开头引入的Home组件切换与此类型一致
   ** 如果是法币聪图云模式，要把根目录下public/index.html 中脚本的 websiteNameIsCongtuCloud变量 修改为true
   */
  webtype: "1",
  website_name: 'dbchain', //yousanai,  dbchain,aionego
  contain_new_wallet: "1",
  $: '$',
  send: 'Envoyer',
  closeWallet: 'Fermer le portefeuille',
  toAddress: 'Destinataire',
  amount: 'Solde',
  from: 'DE ',
  to: 'À',
  value: 'VALEUR',
  transfer: 'TRANSFERT',
  day: 'J',
  hour: 'H',
  password: 'Mot de passe',
  tips: 'Rappel',
  total: 'Total',
  confirm: 'Confirmer',
  cancel: 'Annuler',
  confirmPay: 'Confirmer le paiement',
  enterPassword: 'Entrer le mot de passe',
  newWallet: 'Nouveau portefeuille',
  inputPsWarning: 'Le mot de passe doit comporter au moins 8 caractères.',
  create: 'CRÉER',
  dlEncryptedKey: 'TÉLÉCHARGER LA CLÉ CRYPTÉE',
  finished: 'TERMINÉ',
  amountNoMore: 'Le montant de la transaction ne peut pas être supérieur au solde de votre portefeuille', // new
  noZero: 'Le montant ne peut pas être inférieur ou égal à 0', // new
  errAddr: 'Adresse de portefeuille incorrecte',
  transfer_ing: "Transfert en cours, veuillez patienter...",
  transferSuccess: 'Transaction réussie, veuillez patienter et vérifier la mise à jour des blocs',
  transferFail: 'La transaction a échoué',
  confirmTrTitle: 'Confirmer le transfert',
  confirmTrMsg: 'Vous envoyez <b>{amount}</b> DBC à cette adresse :<br> <b>{address}</b>',
  confirmTrWaring: 'Êtes-vous sûr?',
  bind: 'Lier',
  back: 'Retour',
  open_wallet: 'Ouvrir le portefeuille',
  keystore_file: 'Fichier Keystore',
  private_key: 'Clé privée',
  select_wallet_file: 'Sélectionnez le fichier de portefeuille',
  paste_key: 'Coller ou entrer la clé privée',
  enter_key: 'Entrer le mot de passe',
  continue: 'Continuer',
  unlock: 'Ouvrir',
  transfer_tips: "Vous pouvez transférer des DBC à l'autre partie en entrant l'adresse du portefeuille DBC de l'autre partie dans la zone d'adresse, puis en entrant le nombre de DBC à transférer. Cliquez sur 'Envoyer', l'autre partie recevra les DBC dans un délais 10 à 30 secondes",
  dbc_price_wallet_tips: "Les prix du DBC fluctuent tout le temps, veuillez faire attention lors de l'achat de DBC",
  dbcChange_tips: "Changement du prix DBC les 24 dernières heures",
  heads: {
    home: 'Aceuille',
    virtual: "Location de la machine complète du GPU",
    virtual1: "Louer une machine virtuelle GPU",
    gputype: "Type de GPU",
    area: "zone géographique",
    room: "ID du centre de données",
    mymachine: "Ma Machine",
    mywallet: "Mon Portefeuille",
    help: 'Aide',
    talk: 'Forum développeurs IA',
    audit:'Audit Machine'
  },
  footer: {
    DBChain: 'DeepBrain Chain',
  },
  gpu: {
    myWallet: 'Mon Portefeuille',
    myMachine_gpuVirtual: "tout mon GPU",
    myMachine_gpuVirtual1: "ma machine virtuelle GPU",
    myVerify_gpuVirtual: "ma machine de vérification",
    walletAddress: 'Adresse du portefeuille',
    notice_1: "Veuillez conserver votre clé privée en lieu sûr, une fois qu'une clé privée est perdue, personne ne peut récupérer votre actif DBC pour vous !",
    amount: ' Montant',
    howBuyDBC: 'Comment acheter des DBC ?',
    exchangeCash: 'Valeur en USD',
    showDeitailDBC: 'Voir les informations DBC :',
    clickCoinmarktcap: 'Cliquez pour en savoir plus',
    transfer: 'Transfert',
    rentMachine: 'Ouvrir ou créer un portefeuille',
    payDBCs:'Total DBC payé',
    userTime: 'Temps écoulé',
    payPrice: "Prix DBC une fois payé",
    actualPrice: "engager des frais réels",
    currentRemaining: "restant",
    gpuBilling: "Prix ​​du GPU lorsqu'il est payé",
    createWallet: "Créer un compte portefeuille",
    openWallet: "Ouvrir un compte portefeuille"
  },
  msg: {
    wallet_0: "Enregistrez votre fichier de clé privée dans un endroit sûr, par exemple en l'écrivant et en le mettant en lieu sûr.",
    wallet_1: '' +
      '<b>À ne pas perdre !</b>' +
      'En cas de perte, il ne peut pas être récupéré' +
      '<br>' +
      "À ne pas partagez. Ne l'envoyez à personne sur WeChat, QQ, Facebook, Line, KakaoTalk, WhatsApp ou tout autre application de communication" +
      'Si vous utilisez ce document sur un site Web de phishing malveillant, votre actif sera volé!' +
      '<br>' +
      'Vous devez avoir une sauvegarde!' +
      'Prenez-en soin comme si un jour il pouvait valoir des millions de dollars',
    wallet_2: 'Enregistrez votre clé privée',
    wallet_3: '<b>À ne pas perdre</b>' +
      'En cas de perte, il ne peut pas être récupéré<br>' +
      "<b>À ne pas partagez. Ne l'envoyez à personne sur WeChat, QQ, Facebook, Line, KakaoTalk, WhatsApp ou tout autre application de communication</b>" +
      'Si vous utilisez ce document sur un site Web de phishing malveillant, votre actif sera volé!<br>' +
      '<b>Vous devez avoir une sauvegarde!</b>' +
      'Prenez-en soin comme si un jour il pouvait valoir des millions de dollars',
    wallet_6: 'Vous devez vous souvenir de votre mot de passe, ne le perdez pas, ' + 'Vous avez besoin de ce mot de passe et de votre fichier de clé privée pour déverrouiller le portefeuille'
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
    intr_1: ' fournit un service de location de GPU. rejoignez-nous ! peut aider votre machine à accéder très facilement au réseau DBC, à générer des revenus. \n' +
      '\n' +
      ' Si votre GPU est inactif, vous pouvez le connecter au réseau DBC pour gagner des jetons DBC et en profiter. \n ' +
      '\n' +
      " Si votre GPU est inactif pendant plus d'une heure, vous pouvez le connecter au réseau DBC pour gagner des jetons DBC.",
    intr_2: "Nos GPU viennent du monde entier, connectés via le réseau distribué DBC, il n'y a pas de serveur centralisé ici, vos données ne seront pas volées.\n",
    intr_3: ' Dans le réseau DBC, vous avez besoin du jeton DBC pour louer et utiliser des GPU. Les GPU sont facturés en USD, plus le prix de DBC est élevé, moins vous avez besoin de DBC pour payer.',
    intr_4: " s'engage à fournir aux utilisateurs des services de calcul GPU rentables, en utilisant DBC TOKEN pour le règlement. DeepBrain Chain est un réseau informatique haute performance évolutif à l'infini. Grâce à nous, vous pouvez facilement utiliser le serveur GPU dans DeepBrain Chain. Nous fournissons des services riches pour répondre à vos besoins.",
    intr_5: 'Dans notre plate-forme cloud, vous pouvez trouver une grande variété de GPU à un prix abordable.',
    intr_7: 'DBC commencera à exploiter à partir de 2020 et chaque année 500 millions de DBC sont extraits, à partir de la 4ème année, 250 millions sont extraits chaque année et le montant est divisé par deux tous les 5 ans à partir de là. Au total, 4 milliards de DBC seront extraits.',
    intr_8: 'Rejoignez le combo de revenus DBC : récompense des supernodes + récompense mining + récompense de location',
    intr_snbt_4: " s'engage à fournir aux utilisateurs des services informatiques d'intelligence artificielle rentables, Hong Kong Strategic International Investment Co., Ltd. et le gouvernement ordos ont conclu une coopération stratégique en 2017, la création d'ordos sanolbert technology co., ltd. s'engage dans le domaine de la blockchain + intelligence artificielle. Construire un système écologique industriel en boucle fermée" + '"trois recherches, deux productions et une plate-forme"'+", prendre l'industrie du big data comme une opportunité, basée sur le parc industriel de cloud computing de planification de l'industrie de haute technologie ordos, construire une plate-forme de super industrie informatique, avec sagesse et données pour stimuler la valeur. Décrivez les possibilités du futur.",
    startMiner: 'Commencer à louer un GPU'
  },
  help: {
    'title': 'Comment acheter des DBC',
    "3": "1. Acheter DBC directement avec PayPal (peut être facturé)",
    '4': '2. Acheter des DBC sur gate.io',
    '5': "3. Transférez des DBC sur votre compte à partir d'autres portefeuilles prenant en charge des DBC, tels que",
    reloadWallet: 'Déposer et entrer dans un compte portefeuille',
    enter:'Entrer'
  },
  list_total_rent_count: "Nombre total de locations",
  list_gpu_ram_size: "Mémoire GPU",
  list_cpu_numbers: "Nombre de cœurs de processeur",
  list_ram_size: "mémoire machine",
  list_inet_up: "Bande passante en amont",
  list_inet_down: "Bande passante descendante",
  footer_friend: 'Liens utiles',
  wallet_box_adddress: "Adresse de portefeuille : votre adresse de portefeuille est également votre compte, lorsque vous donnez cette adresse à une autre personne, l'autre personne peut envoyer un jeton DBC à votre adresse.",
  wallet_box_keystore: "Document enregistré par clé privée : le document enregistré par clé privée existe sous forme de mot de passe crypté pour enregistrer votre clé privée, nous vous suggérons de toujours utiliser votre clé privée pour déverrouiller votre portefeuille.",
  wallet_box_key: "Votre clé privée est la version non cryptée de votre clé privée, cela signifie qu'aucun mot de passe n'est nécessaire. Si quelqu'un trouve votre clé privée non chiffrée, il peut accéder à votre portefeuille sans mot de passe. Veuillez donc toujours utiliser votre clé privée cryptée.",
  creat_wallet_index_download: 'Veuillez télécharger la clé privée cryptée',
  mywallet_create: 'Créer un compte portefeuille',
  mywallet_open: 'Ouvrir un compte portefeuille',
  mywallet_open_create: 'Ouvrir ou créer un compte portefeuille pour louer des machines',
  mywallet_transfer_record: 'relevé des transactions',
  mywallet_display: "Ouvrir ou créer un portefeuille pour afficher l'enregistrement des transactions",
  open_wallet_cannot_read: 'Votre navigateur ne prend pas en charge la lecture du document local',
  footer_service: "Service client",
  footr_reply: "le service client vous répondra dans les 24 heures",
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
  pleae_create_wallet: "Veuillez d'abord créer un compte portefeuille dans Mon portefeuille",
  diskspace_remaining: "Espace disque libre maximum",
  memory_space: "espace mémoire",
  howsellDBC: "Comment vendre des DBC",
  helpsell: {
    title: "Comment vendre des DBC",
    "2": "1. Vendre des DBC depuis Huobi (Vendez d'abord des DBC en Bitcoin, puis vendez des BTC pour des RMB à transférer sur un compte bancaire ou Alipay)",
    "3": "2. Vendre des DBC depuis Kucoin",
    "4": "Vendre des DBC depuis Gate.io",
  },
  dbc_price_wallet: "Prix du DBC",
  dbc_price_usd: "USD",
  lessdbc: "Solde DBC insuffisant",
  list_gpu_count_tip: "Modèle de GPU et nombre total de GPU pour la machine actuelle",
  mywallet_open_new: "Ouvrir un compte portefeuille",
  mnemonic: "mnemonic",
  errorPassword: "mot de passe incorrecte",
  ...enLocale,
  /**
   * hz 新增单词
   */
  startVir: "Commencez à louer des machines virtuelles GPU",
  home_intr: "Le bail du GPU est facturé quotidiennement et le bail de la machine peut également être renouvelé quotidiennement avant l'expiration du bail de la machine.",
  result: 'resultat',
  verifyPassward: "Veuillez entrer le mot de passe du compte",
  DBCWallet: "Portefeuille DBC",
  DBCBrowser: "Navigateur DBC",
  DBCWiki: "Wiki DBC",
  responseTip: 'Le processus de soumission prend environ 20 à 40 secondes, veuillez patienter un instant',
  // 审核机器
  audit:{
    // 抢单页面
    ordergrabbingMachine:'Liste des commandes à saisir',
    distributionMachine:'Attribuer une liste de machines',
    myAudit:"Ma liste d'avis",
    myOrder:'Ma liste de commandes',
    ogMachine_tips:"Lorsque quelqu'un ouvre une commande pour saisir une commande, le temps de la commande compte à rebours et la limite se termine dans les heures 3. Les informations de session doivent être envoyées au vérificateur dans une demi-heure au vérificateur correspondant, et le vérificateur a une heure pour vérifier. Les validateurs ne peuvent soumettre les informations originales qu'après 3 heures",
    order:'Numérotation',
    seeDetails:'en attente de commande',
    seeDetails1:'en attente de la description du problème',
    seeDetails2:'Afficher la description du problème',
    seeDetails3:'Soumettre le résultat de la vérification de la valeur de hachage',
    seeDetails4:'Afficher les informations sur la machine virtuelle',
    status:'Etat',
    status1:'en attente de commande',
    status2:'a été volé',
    countdown:'Compte à rebours de la commande',
    hasNum:'Nombre de personnes ayant pris des commandes',
    start:"Commander à l'ouverture",
    start1:'Vérification',
    tipmsg:'Après avoir saisi la commande, attendez que le candidat envoie les informations pertinentes avant de visualiser les informations',
    tipmsg1:'Commande réussie',
    tipmsg2:"Échec de la saisie d'une commande",
    tipmsg3:'TLa machine est émise avec succès, veuillez consulter Ma liste de machines',
    tipmsg4:'Vous pouvez saisir une commande après être devenu un comité',
    message:'mauvaise description',
    confirm: 'lancer une machine virtuelle',
    hasError:'Il y a un problème avec la machine',
    noError:'Aucun problème avec la machine',
    // 派单页面
    verification:'commencer la vérification',
    verification1:'Soumettre le résultat de la vérification de la valeur de hachage',
    verification2:"Soumettre la valeur d'origine du résultat de la vérification",
    verification3:'Afficher les machines virtuelles',
    verification4:'Créer une machine virtuelle',
    verification5:'commande terminée',
    mytime:'ma période vérifiable',
    verification1_time:'Soumettre le résultat de la vérification Compte à rebours de la valeur de hachage',
    verification2_time:"Soumettez la valeur d'origine du compte à rebours du résultat de la vérification",
    savemsg: 'enregistrer les informations',
    savemsgtip: "Astuce : enregistrez les informations d'origine dans le local, lorsque la page soumet l'erreur de valeur d'origine, vous pouvez accéder à la chaîne pour opérer",
    verification_tips:'La valeur de hachage du résultat doit être soumise dans le délai de vérification',
    verification_tips1_1:'Envoi dans les 12 heures après',
    verification_tips1_2:"contient la valeur d'origine",
    verification_tips1:"Ou Les trois validateurs ont soumis le hachage ou l'envoi contient la valeur d'origine",
    verification_tips2:"Ce n'est que pendant le délai de vérification que vous pouvez afficher et vous connecter à la machine virtuelle pour la vérification de la machine.",
    confirmHash: 'Le nombre de hachages qui ont été soumis',
    // 我的审核
    machineStatus:'État de la machine',
    machineStatus1:'Vérification',
    machineStatus2:'en ligne',
    machineStatus3:'location',
    machineStatus3:'inactive',
    verificationTime: 'Horaires vérifiés',
    today_profit:"Gains aujourd'hui",
    total_profit:'Revenu cumulé',
    all_profit:'Revenu totaux',
    all_machine:'Nombre total de machines',
    machineTips:"(Conseils : une fois la machine retirée de l'étagère, le profit de la machine s'arrêtera)",
    myResult:'mon résultat de vérification',
    finalResult:'résultat de la vérification finale',
    adopt:'traverser',
    failed:"N'a pas passé",
    proportion:'Taux de validation',
    record:"Informations sur l'historique des bénéfices",
    date:"Date",
    income:"Gains (DBC)",
    machine_id: 'ID de la machine',
    reporter_nonce: 'Numéro aléatoire du rapporteur',
    validator_nonce: "Numéro aléatoire propre au validateur",
    contentofreport: 'Contenu du rapport',
    problem: 'Y a-t-il un problème avec la machine',
    hasproblem:'a un problème',
    noproblem:'aucun problème',
    isSupportY:'support',
    isSupportN:'pas de support',
    err_tip1:"L'adresse du portefeuille ne peut pas être vide",
    err_tip2:'Exception de serveur, veuillez réessayer plus tard',
    coefficient:'Coefficient régional',
    coefficient1:'coefficient',
    GPUmodel:'Modèle GPU',
    CC_num:'Nombre de cœurs CUDA',
    Memoryvalue:'valeur de la mémoire',
    GPUnumber:'Nombre de GPU',
    CPUcores:'Nombre de cœurs CPU',
    CPUmodel:'Modèle CPU',
    CPUfrequency:'Fréquence CPU',
    Memory:'RAM',
    Shd_space:'Espace disque dur système',
    Dhd_space:'Espace disque de données',
    SGC_power:"Valeur de puissance de calcul d'un seul GPU (X100)",
    Vresults:'Résultats de la validation',
    bindEmail:"Veuillez d'abord lier vos informations de messagerie (email)",
    Op_Successful:'Opération réussie',
    Op_Failed:"l'opération a échoué",
    errormsg:"Impossible d'obtenir les données, veuillez réessayer plus tard !",
    // 验证GPU列表
    verify_msg: 'Création, veuillez cliquer sur le bouton Afficher la machine virtuelle après 5 à 10 minutes pour afficher le résultat de la création',
    verify_msg1: 'Échec de la création, veuillez réessayer ou simplement refuser à la machine de se connecter',
    verify_msg2: 'Échec de la requête des informations sur la machine virtuelle, veuillez confirmer si vous souhaitez créer',
    verify_msg3: "Échec de la création d'une machine virtuelle, veuillez confirmer si la machine a été créée ou refuser directement d'aller en ligne"
  },
  // 租用虚拟机
  virtual: {
    batch: 'bail collectif',
    choose:'sélectionner tout',
    commit:"confirmer l'envoi",
    batch_Mac: 'louer une machine',
    useTime: 'temps utilisé',
    Machine_status:"état d'utilisation de la machine",
    GPU_Num:'Nombre de GPU',
    All_Machine:'Nombre total de machines',
    Idle_Machine:'nombre de machines inactives',
    All_Gpu:'Nombre total de GPU',
    Idle_Gpu: 'Nombre de GPU inactifs',
    Daily_Rent: 'location journalière',
    Machine_ID:'ID de la machine',
    Room_number:'Numéro de la room',
    Machine_sta:'État de la machine',
    Machine_onlineNum:'剩余空闲GPU数',
    All:'Tout',
    Rented:'loué',
    Idle:'Innactif',
    GPU_memory:'Mémoire GPU',
    GPU_type:'Modèle GPU',
    CPU_cores:'Nombre de cœurs CPU',
    CPU_frequency:'Fréquence CPU',
    CPU_type:'Modèle CPU',
    Country:'Pays',
    City:'Ville',
    Cumulative_DBC_rent:'Location DBC cumulé',
    Network_operators:'Opérateurs de réseau',
    Online_time:'Temps en ligne',
    Memory_num:'nombre de mémoire',
    System_hd:'disque dur système',
    Data_hd:'disque dur de données',
    Bandwidth1:'Bande passante en amont',
    Bandwidth2:'Bande passante descendante',
    lable_two2:"Nom de l'opérateur",
    tip0:"Veuillez d'abord sélectionner la machine à louer",
    tip1:'Rappel : La machine actuelle peut être louée pour un maximum de 90 jours et un minimum de 1 jour',
    tip2:"S'il y a un problème avec la machine pendant l'utilisation, vous pouvez soumettre un rapport et faire appel, et vous pouvez obtenir une compensation en DBC si l'appel est fructueux.",
    tip3:'Le processus de location entraînera des frais de location de 10 DBC, qui ne seront pas remboursés, que la location finale soit réussie ou non',
    tip4:'La commande est réussie et sera redirigée vers ma page machine',
    tip5:"La commande a échoué, le montant DBC reviendra ultérieurement au compte d'origine",
    tip6:"Impossible d'obtenir l'adresse du portefeuille",
    tip7:'Commande réussie',
    tip8:"Sur le point d'accéder à la page de ma machine",
    Machine_num:'Nombre de machines',
    Max_disk_Num:"Espace disque disponible maximum pour une machine virtuelle",
    Max_Mem:"Mémoire disponible maximale de la machine virtuelle",
    total:"Total",
    equivalent:"Quantité DBC équivalente",
    confirm: 'confirmer le paiement',
    cancal: 'Annuler',
  },
  // 订单列表
  myvirtual:{
    tip1:"Créez une machine virtuelle avant de confirmer le bail. Une fois la machine virtuelle créée avec succès, confirmez le bail. S'il n'y a pas de bail après le compte à rebours, la commande sera automatiquement annulée.",
    tip2:'La machine virtuelle est en cours de création...',
    tip3:'Machine virtuelle créée avec succès',
    tip4: 'Conseil : Avant de cliquer sur Confirmer le bail, assurez-vous que la machine virtuelle a été créée avec succès',
    tip5: 'Êtes-vous sûr de vouloir redémarrer la machine virtuelle ?',
    tip6: 'Rappel : Le délai minimum pour chaque renouvellement est de 1 jour',
    tip7: 'Il peut être défini arbitrairement entre 6000 et 60000. Si la même machine souhaite créer plusieurs machines virtuelles, les ports ouverts entre différentes machines virtuelles ne peuvent pas se chevaucher, sinon la création de la machine virtuelle échouera.',
    tip8: 'Il peut être réglé entre 5600 et 5899. Si la même machine souhaite créer plusieurs machines virtuelles, les ports entre différentes machines virtuelles ne peuvent pas se chevaucher, sinon la création de la machine virtuelle échoue.',
    tip9: 'Il peut être réglé entre 5900 et 5999. Si la même machine souhaite créer plusieurs machines virtuelles, les ports VNC entre différentes machines virtuelles ne peuvent pas se chevaucher, sinon la création de la machine virtuelle échoue.',
    tip10: 'Le port RDP ne peut pas être le même que le port SSH',
    tip11: "Le système d'exploitation doit être cohérent avec le système miroir, où le bios par défaut est ubuntu en tant qu'héritage et Windows en tant qu'uefi",
    tip12: 'La plage est "224.0.0.0" à "239.255.255.255", et les deux doivent être séparés par une virgule anglaise',
    tip13: 'Voulez-vous vraiment supprimer la machine virtuelle ?',
    tip14: 'Voulez-vous vraiment arrêter la machine virtuelle ?',
    tip15: 'Voulez-vous vraiment démarrer la machine virtuelle ?',
    tip16: "Êtes-vous sûr de vouloir modifier la machine virtuelle ? Veuillez d'abord arrêter la machine virtuelle",
    tip17: "Rappel : La machine actuelle peut être louée jusqu'à {hour} heures, et la durée la plus courte est de 1 heure",
    title: 'Ma machine de location',
    tower: 'Tour',
    confirm_time: 'Confirmer le compte à rebours de la location',
    status1: 'Location à confirmer',
    status2: "En cours d'utilisation",
    status3: 'Fin de la commande',
    status4: 'Annuler la commande',
    status5: 'Remboursement en cours, veuillez patienter',
    create_status1: 'Création, veuillez cliquer sur le bouton Afficher la machine virtuelle après 5 à 10 minutes pour afficher le résultat de la création',
    create_status2: 'Échec de la création',
    time_left: 'Temps restant',
    order_status1:'Non payé',
    order_status2:"En cours d'utilisation",
    order_status3:'Annuler la commande',
    order_status4:'Interruption de la commande',
    order_status5:'Fin de la commande',
    Confirm_rental: 'Confirmer la location',
    rental_success: 'Location confirmer avec succès !',
    rental_fails: 'La confirmation de la location a échoué !',
    Confirm_create: 'Confirmer la création',
    Renew:'Renouvellement',
    renew_success: 'Renouvellement réussi',
    Build:'Créer une machine virtuelle GPU',
    SeeVirtual:'Afficher les machines virtuelles GPU',
    Build_success:'Lorsque la machine virtuelle GPU est créée, cliquez sur le bouton Afficher pour afficher les détails',
    Build_fails:'Échec de la création de la machine virtuelle GPU',
    virId: 'ID de VM',
    reboot:'Redémarrez la VM',
    reboot_success:'Redémarrage avec succès',
    reboot_fails:'Le redémarrage a échoué',
    delect:'Supprimer la VM',
    delect_success:'supprimé avec succès',
    delect_fails:'impossible de supprimer',
    stop: 'Arrêter la VM',
    stop_success: 'Arrêtez la machine virtuelle avec succès',
    stop_fails: "Échec de l'arrêt de la machine virtuelle",
    start: 'Démarrer la VM',
    start_success: 'Démarrer la machine virtuelle avec succès',
    start_fails: 'Impossible de démarrer la machine virtuelle',
    reset:'Réinitialiser le mot de passe',
    pass1:'Nouveau mot de passe :',
    pass2:'vérifié et revérifié:',
    pass3:'Veuillez entrer le mot de passe',
    pass4:'Veuillez saisir à nouveau le mot de passe',
    pass5:'Les mots de passe entrés deux fois ne correspondent pas',
    Confirm_edit: 'Confirmez les modifications',
    change:'Modifier les paramètres de la machine virtuelle',
    edit_success: 'Modifié avec succès',
    edit_fails:'ne parvient pas à modifier',
    mirror_name: 'Nom du mirror',
    IP_address: "Adresse IP de l'ordinateur",
    user_name: "Nom d'utilisateur",
    password: 'Mot de passe de connexion',
    ssh_port: 'Port SSH',
    rdp_port: 'Port RDP',
    operation:'Système opérateur',
    multicast: 'adresse de multidiffusion',
    local_address:'Adresse IP intranet',
    open_port_range: 'plage de ports ouverts',
    port_range: 'plage de ports',
    vnc_port: 'Port VNC',
    vir_mem: 'mémoire de la machine virtuelle',
    vir_sys: 'disque système de la machine virtuelle',
    vir_data: 'disque de données de machine virtuelle',
    vir_gpu_num: 'Le nombre de GPU dans la machine virtuelle',
    vir_cpu_num: 'Le nombre de cœurs de processeur de machine virtuelle',
    renew_time:'Délai de renouvellement du bail',
    balance:'Solde du compte courant DBC',
    max_set:'Le maximum peut être réglé',
    order_details: 'Afficher les détails de la commande',
    details:'détails de la commande',
    refund:'remboursement',
    renewal_time: 'Délai de renouvellement du bail',
    err_msg: "Aucune machine virtuelle n'a été créée pour cette machine",
    err_msg1: "Impossible d'obtenir les données, veuillez réessayer plus tard !",
    vir_status: 'fermé',
    vir_status1: 'créer',
    vir_status2: 'fonctionnement',
    vir_status3: 'départ',
    vir_status4: 'arrêt',
    vir_status5: 'redémarrage',
    vir_status6: 'réinitialiser',
    vir_status7: 'erreur de démarrage',
    vir_status8: 'erreur de redémarrage',
    vir_status9: 'pm_suspendu',
    
    newTip1: "Le système d'exploitation et l'image ne peuvent pas être vides",
    newTip2: 'Numéro de port SSH en double, veuillez le saisir à nouveau',
    newTip3: 'Le numéro de port rdp est en double, veuillez le saisir à nouveau',
    newTip4: 'Numéro de port vnc en double, veuillez le saisir à nouveau',
    newTip5: 'Plage de ports ouverts en double, veuillez saisir à nouveau'
  },
  // 单个虚拟机
  signleVir: {
    title: 'ma machine virtuelle louée',
    orderId: "numéro de commande",
    machineId: 'ID de la machine',
    remainingGPU:'Nombre de GPU disponibles restants',
    order_status1: 'Création, veuillez patienter',
    order_status2: 'Pendant la déduction, veuillez ne pas utiliser la page',
    order_status3: 'utilisé',
    order_status4: 'Échec du transfert, veuillez relouer',
    order_status5: 'Le bail a expiré',
    order_status6: 'Échec de la création, veuillez relouer',
    virStatus: 'état de la machine virtuelle',
    tip1: "La durée minimale de renouvellement du bail est d'une heure et la plus longue est de {maxTime} heures",
    tip2: 'Solde de compte insuffisant, veuillez recharger et louer',
    tip3: "Échec de l'obtention de l'adresse de portefeuille temporaire"
  },
  // 购买DBC
  buyDBC: {
    address: 'adresse de portefeuille',
    amount: "Montant de l'achat",
    pay: "Payer par",
    finish: "terminer l'achat",
    enterwallet: "Veuillez entrer l'adresse du portefeuille pour recevoir DBC",
    continue: 'Continuez',
    support: "Service client",
    reply: "Le service client répondra dans les 24 heures",
    quantity: 'quantité correspondante',
    seePrice: "Cliquez pour voir le prix :",
    enterAmount: "Veuillez entrer le montant",
    payBy: 'Veuillez sélectionner le mode de paiement :',
    status1: "Curieux...",
    status2: "Le transfert DBC est réussi. Il faudra environ quelques minutes pour arriver au compte. Veuillez vérifier l'adresse du portefeuille.",
    status3: "Le paiement est réussi, mais le transfert DBC échoue, veuillez envoyer un e-mail à support@dbctrade.io. Nous vous aiderons dans les 24 heures",
    status4: "Le paiement a échoué, veuillez envoyer un e-mail à support@dbctrade.io. Nous vous aiderons dans les 24 heures",
    status5: "Si le montant de la commande est incompatible avec le montant du transfert, veuillez contacter le service client",
    title1: "indice important",
    tip1: "La plate-forme transfère DBC via des contrats intelligents. Une fois le paiement effectué, le contrat intelligent transférera automatiquement le DBC que vous avez acheté à l'adresse DBC que vous avez spécifiée.",
    tip2: "Rappel : la plateforme facture des frais de 14 % + 0,3 USD, et le montant maximum d'un achat unique est de 2 000 USD. Si vous avez besoin d'une facture, veuillez envoyer un e-mail à la boîte aux lettres du service client en bas à droite",
    tip3: "Les prix DBC fluctuent tout le temps, soyez conscient des risques !",
    tip4: "Le prix DBC fait référence au prix de la paire de trading gate DBC/USDT,",
    tip5: "Le montant DBC est 0, veuillez actualiser la page et saisir à nouveau le montant en USD",
    tip6: "Le montant ne peut pas dépasser 2000",
    tip7: "Le montant ne peut pas être inférieur à 1",
    tip8: "Montant saisi incorrect",
    tip9: "Le solde du portefeuille du contrat intelligent est insuffisant, veuillez saisir à nouveau le montant de l'achat",
    tip10: "L'adresse du portefeuille ne peut pas être vide"
  },
  // 操作报错原因
  err_reason:{
    // onlineCommittee
    NotInBookList: "la commande n'existe pas",
    AlreadySubmitHash: 'Le hachage a été soumis',
    NotAllHashSubmited: "Tous les hachages n'ont pas été soumis",
    TimeNotAllow: 'Soumis dans les délais impartis',
    NotSubmitHash: 'Hachage non soumis',
    AlreadySubmitRaw: 'Données brutes soumises',
    InfoNotFeatHash: 'Le résultat de la soumission est incohérent avec la hachage',
    DuplicateHash: 'Répéter la valeur de hachage',
    // maintainCommittee
    NotCommittee: "vous n'êtes pas encore membre du comité",
    AlreadyBooked: 'La commande a été saisie',
    OrderStatusNotFeat: 'état de la commande non autorisé',
    NotInBookedList: "la commande n'existe pas",
    NotOrderReporter: "Vous n'êtes pas la personne signalant la commande",
    NotOrderCommittee: "Vous êtes pas membre du comité d'ordre",
    GetStakeAmountFailed: "Impossible d'obtenir le montant de la contribution",
    StakeFailed: "Échec de l'engagement",
    OrderNotAllowCancel: "L'annulation de la commande n'est pas autorisée",
    OrderNotAllowBook: "La commande n'autorise pas les réservations",
    NotProperCommittee: 'membres non réguliers du comité',
    NotEqualReporterSubmit: 'Incohérent avec la valeur de hachage soumise par le déclarant',
    NotEqualCommitteeSubmit: 'Incohérent avec la valeur de hachage soumise par le comité',
    ReduceTotalStakeFailed: "Réduire le nombre total d'échecs de jalonnement",
    PayTxFeeFailed: 'Échec du paiement des frais de transaction',
    NotNeedEncryptedInfo: 'Aucune information cryptée requise',
    ExpiredReport: 'Rapport en retard',
    AlreadySubmitConfirmation: 'La confirmation a été soumise',
    BalanceNotEnough: 'Solde insuffisant',
    StakeNotEnough: 'Montant de la contribution insuffisant',
    BoxPubkeyIsNoneInFirstReport: 'BoxPubkeyIsNoneInFirstReport',
    NotReporter: "vous n'êtes pas le rapporteur",
    TimeNotAllowed: 'pas dans le délai imparti',
    SlashIdNotExist: "L'ID de pénalité n'existe pas",
    NotPendingReviewSlash: "Pénalité pour non-demande d'examen par le comité technique",
    NotSlashed: 'non puni',
  }
}
