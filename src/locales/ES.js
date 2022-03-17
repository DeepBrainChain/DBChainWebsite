import enLocale from 'element-ui/lib/locale/lang/es'

export default {
  /* 关于webtype:
   ** 修改数值时，要把router.js文件开头引入的Home组件切换与此类型一致
   ** 如果是法币聪图云模式，要把根目录下public/index.html 中脚本的 websiteNameIsCongtuCloud变量 修改为true
   */
  webtype: "1",
  website_name: 'dbchain', //yousanai,  dbchain,aionego
  contain_new_wallet: "1",
  $: '$',
  send: 'Enviar',
  closeWallet: 'Cerrar Billetera',  
  toAddress: 'Dirigido a',
  amount: 'Cantidad',
  from: 'DESDE ',
  to: 'PARA',
  value: 'VALOR',
  transfer: 'TRANSFERIR',
  day: 'D',
  hour: 'H',
  password: 'Contraseña',
  tips: 'Recordatorio',
  total: 'Total',
  confirm: 'Confirmar',
  cancel: 'Cancelar',
  confirmPay: 'Confirmar Pago',
  enterPassword: 'Contraseña',
  newWallet: 'Nueva billetera',
  inputPsWarning: 'La contraseña debe contener al menos 8 letras.',
  create: 'CREAR',
  dlEncryptedKey: 'Clave DESCARGAR LA CLAVE CIFRADA',
  finished: 'FINALIZADO',
  amountNoMore: 'La cantidad de la transacción no puede ser mayor que el saldo de su cartera', // new
  noZero: 'La cantidad no puede ser menor o igual a 0', // new
  errAddr: 'La dirección de la cartera es incorrecta',
  transfer_ing: "Transfiriendo, por favor espere...",
  transferSuccess: 'Transacción exitosa, por favor espere y compruebe la actualización en bloquesblocks',
  transferFail: 'Transacción Fallida',
  confirmTrTitle: 'Confirmar Transferencia',
  confirmTrMsg: 'Usted está enviando <b>{amount}</b> DBC a esta dirección :<br> <b>{address}</b>',
  confirmTrWaring: '¿Está seguro?',
  bind: 'Bind Vincular',
  back: 'Regresar',
  open_wallet: 'Abrir Billetera',
  keystore_file: 'Keystore File',
  private_key: 'Clave Privada',
  select_wallet_file: 'Seleccionar archivo de Billetera',
  paste_key: 'Pegar o introducir la clave privada',
  enter_key: 'Introducir contraseña',
  continue: 'Continuar',
  unlock: 'Desbloquear',
  transfer_tips: "Puede transferir DBC a la otra parte ingresando la dirección de la billetera DBC de la otra parte en el área de dirección, después ingrese la cantidad de DBCs a transferir  y haga click en 'Enviar', en aproximadamente 10 a 30 segundos la otra parte recibirá el DBC ",
  dbc_price_wallet_tips: "Los precios del DBC fluctuan todo el tiempo, por favor tome en cuenta los riesgos al comprar DBC",
  dbcChange_tips: "DBC 24hours price change   24 horas cambio de precio DBC",
  heads: {
    home: 'Home',
    virtual: "Alquilar Máquina virtual GPU",
    gputype: "tipo gpu",
    area: "sala de máquinas",
    room: "sala de máquinas",
    mymachine: "Mi Maquina", 
    mywallet: "Mi Billetera",
    help: 'Ayuda',
    talk: 'Foro de desarrollador AI',
    audit:'Máquina de auditoría'
  },
  footer: {
    DBChain: 'DeepBrain Chain',
  },
  gpu: {
    myWallet: 'Mi Billetera',
    myMachine_gpuVirtual: "Mi máquina virtual GPU",
    myVerify_gpuVirtual: "Mi GPU de validación",
    walletAddress: ' Dirección de Billetera',
    notice_1: 'Por favor mantenga su clave a salvo, si una clave se pierde nadie puede recuperar los activos DBC por usted',
    amount: 'Cantidad',
    howBuyDBC: '¿Cómo comprar DBC?',
    exchangeCash: 'Valor del dólar',
    showDeitailDBC: 'Ver información del DBC:',
    clickCoinmarktcap: 'Clic para leer más',
    transfer: 'Transferir',
    rentMachine: 'Abrir o crear Cartera',
    payDBCs:'DBC total pagado',
    userTime: 'Tiempo transcurrido',
    payPrice: "Precio DBC cuando se paga",
    actualPrice: "incurriendo en costos reales",
    currentRemaining: "restante",
    gpuBilling: "Precio de la GPU cuando se paga",
    createWallet: "Crear una cuenta de billetera",
    openWallet: "Abrir cuenta de billetera"
  },
  msg: {
    wallet_0: 'Guarde su archivo con la clave privada en un lugar seguro, por ejemplo, anótelo y guárdelo en una caja fuerte.  Save your private key file in a safe place, such as writing it down and putting it in a safe.',
    wallet_1: '' +
      '<b>¡No la pierda!</b>' +
      'Si la pierde no puede ser recuperada' +
      '<br>' +
      'NO la comparta. No la envíe a nadie por WeChat, QQ, Facebook, Line, KakaoTalk, WhatsApp o cualquier otro software de comunicación' +
      '¡Si utiliza este documento en un sitio web malicioso de fraude electrónico, su activo será robado!' +
      '<br>' +
      '¡Debe tener un respaldo!' +
      'Trátelo como si algún día pudiera valer millones de dólares',
    wallet_2: 'Guarde su clave privada',
    wallet_3: '<b>No la pierda </b>' +
      'Si la pierde no puede ser recuperada<br>' +
      '<b> NO la comparta. No la envíe a nadie por WeChat, QQ, Facebook, Line, KakaoTalk, WhatsApp o cualquier otro software de comunicación </b>' +
      '¡Si utiliza este documento en un sitio web malicioso de fraude electrónico, su activo será robado!<br>' +
      '<b>¡Debe tener un respaldo!</b>' +
      ' Trátelo como si algún día pudiera valer millones de dólares',
      wallet_6: ' Debe recordar su contraseña, no la pierda, ' + ' necesita esta contraseña y el archivo de clave privada para desbloquear su cartera '
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
    ntr_1: 'Provee servicio de renta de GPU. ¡Únete a nosotros! … puede ayudar a su máquina a tener un acceso conveniente a la red de DBC help your machine very convenient access to the DBC network, obtener ingresos. \n' +	
      '\n' +
      ' Si su GPU alguna vez está inactiva, puede conectarla a la red DBC para ganar tokens DBC y disfrutar del beneficio de la apreciación de los tokens.\n ' +
      '\n' +
      ' Si su GPU alguna vez está inactiva durante más de una hora, puede conectarla a la red DBC para ganar tokens DBC.',
    intr_2: 'Nuestras GPU provienen de todo el mundo, conectadas a través de la red distribuida de DBC, no hay un servidor centralizado aquí, sus datos no serán robados.\n',
    intr_3: ' En la red DBC, necesita el token DBC para alquilar y usar GPU (s). Las GPU(s) tienen un precio en USD, cuanto mayor sea el precio de DBC, menos DBC necesitará para pagar.',
    intr_4: ' Comprometido a proporcionar a los usuarios servicios informáticos de GPU rentables, utilizando DBC TOKEN para la liquidación. DeepBrain Chain es una red informática de alto rendimiento infinitamente escalable. A través de nosotros, puede usar fácilmente el servidor GPU en DeepBrain Chain. Nosotros le brindamos servicios completos para satisfacer sus necesidades.',
    intr_5: ' En nuestra plataforma de nube puede encontrar una gran variedad de GPUs a un precio accesible.',
    intr_7: 'El DBC comenzará a extraerse a partir de 2020 y cada año se extraen 500 millones de DBCs, a partir del cuarto año, se extraen 250 millones cada año y la cantidad se reduce a la mitad cada 5 años a partir de entonces. Un total de 4 mil millones de DBC serán extraídos.',
    intr_8: ' Únase al combo de ingresos de DBC: recompensa de supernodos + recompensa de minería + recompensa de alquiler ',
    intr_snbt_4: ' se compromete a proporcionar a los usuarios servicios informáticos de inteligencia artificial rentables, inversión estratégica internacional de Hong Kong co., ltd. y el gobierno de ordos alcanzaron una cooperación estratégica en 2017, el establecimiento de ordos sanolbert technology co., ltd. apuesta por el campo de la cadena de bloques + inteligencia artificial. Construir un sistema ecológico industrial de circuito cerrado de "tres investigaciones, dos de producción y una plataforma", tomar la industria de big data como una oportunidad, basada en ordos industria de alta tecnología que planifica el parque industrial de computación en la nube, construir una plataforma industrial de supercomputación, con sabiduría y datos para impulsar el valor. Esbozar las posibilidades del futuro.',
    startMiner: ' Empezar a alquilar GPU'
  },
  help: {
    'title': '¿Cómo comprar DBC?',
    "3": "1.Compre DBC directamente con PayPal (se puede facturar)",
    '4': '2. Compre DBC en gate.io ',
    '5': '3. Transfiera DBC a su cuenta desde otras billeteras que admitan DBC, como',
    'reloadWallet': ' Deposite e ingrese a la cuenta de la billetera ',
    enter:'Ingresar'
  },
  list_total_rent_count: "Número total de alquileres",
  list_gpu_ram_size: "memoria GPU",
  list_cpu_numbers: "Número de núcleos de CPU",
  list_ram_size: "memoria de la máquina",
  list_inet_up: "Ancho de banda ascendente",
  list_inet_down: "Ancho de banda de enlace descendente",
  footer_friend: 'Enlaces útiles',
  wallet_box_adddress: 'Dirección de billetera: la dirección de su billetera también es su cuenta, cuando le da esta dirección a otra persona, la otra persona puede enviar el token DBC a su dirección.',
  wallet_box_keystore: ' Documento guardado de clave privada: el documento guardado de clave privada existe en un formulario de contraseña encriptada para guardar su clave privada, le sugerimos que siempre use su clave privada para desbloquear su billetera.',
  wallet_box_key: ' Su clave privada es la versión sin cifrar de su clave privada, esto significa que no se necesita contraseña. Si alguien encuentra su clave privada sin cifrar, puede acceder a su billetera sin contraseña. Por lo tanto, utilice siempre su clave privada cifrada.',
  creat_wallet_index_download: ' Descargue la clave privada cifrada',
  mywallet_create: ' Crear cuenta de billetera',
  mywallet_open: 'Abrir cuenta de billetera',
  mywallet_open_create: 'Abrir o crear una cuenta de billetera para alquilar máquinas',
  mywallet_transfer_record: 'Registro de la transacción',
  mywallet_display: 'Abrir o crear billetera para ver el registro de transacciones',
  open_wallet_cannot_read: ' Su navegador no admite la lectura de documentos locales ',
  footer_service: " Atención al cliente",
  footr_reply: " el servicio al cliente responderá dentro de las siguientes 24 horas",
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
  memory_space: "espacio_memoria",
  howsellDBC: "¿Cómo vender DBC?",
  helpsell: {
    title: "¿Cómo vender DBC?",
    "2": "1. Venda DBC desde de en Huobi (Primero venda DBC en Bitcoin, luego venda BTC por RMB para transferir a la cuenta bancaria o Alipay) Sell DBC from Huobi（Sell DBC into Bitcoin first, then sell BTC for RMB to transfer into bank account or or Alipay）",
    "3": "2. Vender DBC desde Kucoin Sell DBC from Kucoin",
    "4": "Vender DBC desde Gate.io ",
  },
  dbc_price_wallet: " Precio DBC ",
  dbc_price_usd: "US Dólar estadounidense ",
  lessdbc: "Saldo DBC insuficiente",
  list_gpu_count_tip: "Modelo de GPU y número total de GPU para la máquina actual",
  mywallet_open_new: "Abrir cuenta de billetera",
  mnemonic: "mnemotécnica",
  errorPassword: "contraseña incorrecta",
  ...enLocale,
  /**
   * hz 新增单词
   */
  startVir: " Comience a alquilar máquinas virtuales con GPU",
  home_intr: " El arrendamiento de GPU se factura diariamente y el arrendamiento de la máquina también se puede renovar diariamente antes de que caduque el arrendamiento de la máquina.",
  result: 'Resultado',
  verifyPassward: "Por favor ingrese la contraseña de la cuenta",
  DBCWallet: " Billetera DBC ",
  DBCBrowser: " Navegador DBC ",
  DBCWiki: "Wiki DBC",
  responseTip: 'El proceso de envío tarda entre 20 y 40 segundos, espere un momento.',
  // 审核机器
  audit:{
    // 抢单页面
    ordergrabbingMachine:'Lista de máquinas para tomar pedidos',
    distributionMachine: 'Asignar lista de máquinas',
    myAudit: 'Mi lista de reseñas',
    myOrder: 'Mi lista de pedidos',
    ogMachine_tips:' Cuando alguien abre inicia un pedido para tomar un pedido, el tiempo para el pedido comenzará una cuenta regresiva y QUE el límite finalizará en 3 horas. La información de la sesión debe enviarse al verificador dentro de media hora al verificador correspondiente, y el verificador tiene una hora para verificar. El validador puede enviar la información original después de 3 horas. Si se envía por adelantado, se deducirá como sanción el DBC equivalente a 100 RMB.',
    order:' Numeración ',
    seeDetails:'Esperando pedido',
    seeDetails1:'Esperando la descripción del problema ',
    seeDetails2: 'Ver descripción del problema',
    seeDetails3:' Envíe el valor Hash del resultado de la verificación ',
    seeDetails4: 'Ver información de la máquina virtual',
    status:'Estado',
    status1: 'Esperando pedido',
    status2: 'Ha sido robada  THE ORDERÇ', 
    countdown:'Cuenta regresiva de pedidos',
    hasNum: 'Número de personas que han tomado pedidos',
    start:'Realizar pedido al abrir Order when opening',
    start1:'Verificando',
    tipmsg:' Después de tomar el pedido, espere a que el candidato envíe la información relevante antes de ver la información',
    tipmsg1:'Pedido exitoso',
    tipmsg2:'Error al tomar un pedido',
    tipmsg3:'La máquina se emitió con éxito, vaya a mi lista de máquinas',
    tipmsg4:'Puedes tomar una orden después de convertirte en un comité   committee',
    message: 'descripción incorrecta',
    confirm: 'ejecutar máquina virtual',
    hasError:'Hay un problema con la máquina',
    noError:'No hay problema con la máquina',
    // 派单页面
    verification:'comenzar verificación',
    verification1:'Enviar el valor hash del resultado de la verificación',
    verification2:'Enviar el valor original del resultado de la verificación',
    verification3:'Ver máquinas virturales',
    verification4:'Crear máquina virtual',
    verification5:'Pedido completado',
    mytime:'mi período de tiempo verificable',
    verification1_time: 'Enviar la cuenta regresiva del valor hash del resultado de la verificación',
    verification2_time: 'Enviar el valor original del resultado de verificación de la cuenta regresiva',
    savemsg: 'Guardar información',
    savemsgtip: 'Consejo: guarde la información original en el local, cuando la página envíe el error de valor original, puede ir a la cadena para operar',
    verification_tips: 'El valor hash del resultado debe enviarse dentro del tiempo de verificación',
    verification_tips1_1: 'Envío dentro de las 12 horas posteriores',
    verification_tips1_2: 'contiene valor original',
    verification_tips1: 'O los tres validadores han enviado el hash o el envío contiene el valor original',
    verification_tips2: 'Solo dentro del tiempo de verificación puede ver e iniciar sesión en la máquina virtual para la verificación de la máquina.',
    confirmHash: 'El número de hashes que se han enviado',    
    // 我的审核
    machineStatus: 'Estado de la máquina',
    machineStatus1:'Verificando',
    machineStatus2: 'En línea',
    machineStatus3:'Alquilando',
    machineStatus4:'inactivo',
    verificationTime: 'Horas VECES verificadas',
    today_profit: 'Ganancias de hoy',
    total_profit: 'Ingresos acumulados',
    all_profit: 'Total de ingresos',
    all_machine: 'Número total de máquinas',
    machineTips:'(Consejos: después de sacar la máquina del estante, la ganancia de la máquina se detendrá)',    
    myResult: 'mi resultado de verificación',
    finalResult: 'Resultado de verificación final',
    adopt: 'pasar por  transferir',
    failed: 'No pasó',
    proportion: 'Relación de validación',
    record:'Historial de información de ganancias',
    date:"Date",
    income:"Earnings (DBC)",
    machine_id: 'Identificador de máquina',
    reporter_nonce: 'Número aleatorio del informe reporter random number',
    validator_nonce: "Número aleatorio propio del validador",
    contentofreport: 'Contenido del informe',
    problem: '¿Hay algún problema con la máquina?',
    hasproblem: 'tiene un problema',
    noproblem: 'No hay problema',
    isSupportY:'Suporte Apoyo (técnico)',
    isSupportN:'No (soporte)',
    err_tip1: 'La dirección de la billetera no puede estar vacía',
    err_tip2: 'Excepción de servidor, inténtalo de nuevo más tarde',
    coefficient: 'Coeficiente regional',
    coefficient1:'Coeficiente ',
    GPUmodel:'Modelo de GPU',
    CC_num: 'Número de núcleos CUDA',
    Memoryvalue: 'Valor de memoria',
    GPUnumber: 'Número de GPUs',
    CPUcores: 'Número de núcleos de CPU',
    CPUmodel:'Modelo de CPU',
    CPUfrequency: 'Frecuencia de la CPU',
    Memory:'Memoria RAM',
    Shd_space: 'Espacio en el disco duro del sistema',
    Dhd_space: 'Espacio de disco duro de datos',
    SGC_power: 'Valor de potencia informática de GPU única (X100)',
    Vresults: 'Resultados de la validación',
    bindEmail: 'Por favor, vincule primero la información de su correo electrónico',
    Op_Successful: 'Operación exitosa',
    Op_Failed: 'operación fallida',
    errormsg: 'Error al obtener los datos. Por favor inténtalo de nuevo más tarde',
    // 验证GPU列表
    verify_msg: 'Creando, por favor haga clic en el botón Ver Máquina Virtual después de 5 a 10 minutos para ver el resultado de la creación',
    verify_msg1: 'Error al crear, intente nuevamente por favor, o rechace que la máquina se conecte',
    verify_msg2: 'Error al consultar la información de la máquina virtual, por favor confirme si desea crear',
    verify_msg3: 'No se pudo crear una máquina virtual, por favor confirme si la máquina se ha creado o rechace directamente conectarse'
  },
  // 租用虚拟机
  virtual: {
    batch: 'Arrendamiento masivo',
    choose: 'seleccionar todo',
    commit: 'confirmar envío',
    batch_Mac: 'Alquilar máquina',
    useTime: 'Usar el tiempo', 
    Machine_status: 'Estado de uso de la máquina',
    GPU_Num: 'Número de GPUs',
    All_Machine:'Número total de máquinas',
    Idle_Machine:'Número de máquinas inactivas',
    All_Gpu:'Número total de GPUs',
    Idle_Gpu: 'Número de GPUs inactivos',
    Daily_Rent: 'Alquiler diario',
    Machine_ID:'machine Identificador de máquina',
    Room_number:'Número de cuarto',
    Machine_sta:'Estado de la máquina',
    All:'Todo',
    Rented:'Alquilada',
    Idle:'Activa',                 
    GPU_memory:'Memoria GPU',
    GPU_type:'Modelo GPU ',
    CPU_cores: 'Número de núcleos de CPU',
    CPU_frequency: 'Frecuencia de la CPU',
    CPU_type:'Modelo CPU ',
    Country:'País',
    City:'Ciudad',
    Cumulative_DBC_rent: 'Alquiler DBC acumulado',
    Network_operators: 'Operadores de red',
    Online_time: 'Tiempo en línea',
    Memory_num: 'Número de memoria',
    System_hd: 'Disco duro del sistema',
    Data_hd: 'disco duro de datos',
    Bandwidth1: 'Ancho de banda ascendente',
    Bandwidth2: 'Ancho de banda de enlace descendente',
    lable_two2: 'Nombre del operador',
    tip0: ' Primero seleccione la máquina a alquilar, por favor',
    tip1: 'Recordatorio: La máquina actual se puede alquilar por un máximo de 90 días y un mínimo de 1 día',
    tip2: 'Si hay un problema con la máquina durante el uso, puede enviar un informe y una apelación, y puede obtener una compensación de DBC si la apelación es exitosa.',
    tip3: 'El proceso de alquiler incurrirá en una tarifa de alquiler de 10 DBC, que no se reembolsará independientemente de si el alquiler final se realiza correctamente o no',
    tip4: 'El pedido es exitoso y será redirigido a la página de mi máquina',
    tip5: 'El pedido falló, DBC volverá a la cuenta original más tarde',
    tip6: 'Error al obtener la dirección de la billetera',
    tip7: 'pedido con éxito',
    tip8: 'A punto de saltar a la página de mi máquina',
    Machine_num:'Número de máquinas',
    Max_disk_Num: "Espacio máximo disponible en disco duro para una máquina virtual",
    Max_Mem: "Memoria máxima disponible de la máquina virtual",
    total:"Total",
    equivalent: "Cantidad DBC equivalente",
    confirm: 'Confirmar pago',
    cancal: 'Cancelar',
  },
  // 订单列表
  myvirtual:{
    tip1: 'Cree una máquina virtual antes de confirmar el arrendamiento. Una vez que la máquina virtual se haya creado correctamente, confirme la concesión. Si no hay arrendamiento después de la cuenta regresiva, el pedido se cancelará automáticamente.',
    tip2: 'La máquina virtual se está creando...',
    tip3:'Máquina virtual creada con éxito',
    tip4: 'Consejo: antes de hacer clic en Confirmar arrendamiento, asegúrese de que la máquina virtual se haya creado correctamente',
    tip5: '¿Está seguro de reiniciar la máquina virtual?',
    tip6: 'Recordatorio: El tiempo mínimo para cada renovación es de 1 día',
    tip7: 'Se puede establecer arbitrariamente entre 6000-60000. Si la misma máquina desea crear varias máquinas virtuales, los puertos abiertos entre diferentes máquinas virtuales no se pueden superponer, de lo contrario, la creación de la máquina virtual fallará.',
    tip8: 'Se puede configurar entre 5600-5899. Si la misma máquina quiere crear varias máquinas virtuales, los puertos entre diferentes máquinas virtuales no se pueden superponer, de lo contrario, la creación de la máquina virtual falla.',
    tip9: 'Se puede configurar entre 5900-5999. Si la misma máquina quiere crear varias máquinas virtuales, los puertos VNC entre diferentes máquinas virtuales no se pueden superponer, de lo contrario, la creación de la máquina virtual falla.',
    tip10: 'El puerto RDP no puede ser el mismo que el puerto SSH',
    tip11: 'El sistema operativo debe ser coherente con el sistema espejo, en el que BIOS tiene por defecto ubuntu como legado y Windows como uefi.',
    tip12: 'El rango es "224.0.0.0" a "239.255.255.255", y los dos deben estar separados por una coma en inglés',
    tip13: '¿Está seguro de que desea eliminar la máquina virtual?',
    tip14: '¿Estás seguro de que quieres detener la máquina virtual?',
    tip15: '¿Está seguro de que desea iniciar la máquina virtual?',
    title: 'mi máquina de alquiler',
    tower: 'Torre',
    confirm_time: 'Confirmar cuenta regresiva de alquiler',
    status1: 'Alquiler por confirmar',
    status2: 'En uso',
    status3: 'Fin del pedido',
    status4: 'Cancelar el pedido',
    status5: 'Reembolso, por favor espere',
    create_status1: 'Creando, haga clic en el botón Ver Máquina Virtual después de 5 a 10 minutos para ver el resultado de la creación',
    create_status2: 'Error al crear',
    time_left: 'Tiempo restante',
    order_status1:'no pagado',
    order_status2:'en uso',
    order_status3:'cancelar el pedido',
    order_status4:'interrupción de pedido',
    order_status5:'fin del pedido',
    Confirm_rental: 'Confirmar alquiler',
    rental_success: '¡Confirmar alquiler exitoso!',
    rental_fails: '¡Confirmar alquiler fallido!',
    Confirm_create: 'Confirmar creación',
    Renew:'Renovación',
    renew_success: 'Renovación exitosa',
    Build: 'Crear una máquina virtual GPU',
    SeeVirtual: 'Ver máquinas virtuales GPU',
    Build_success:'Cuando se crea la máquina virtual GPU, haga clic en el botón Ver para ver los detalles',
    Build_fails:'Error al crear la máquina virtual GPU',
    virId: 'Identificador de VM',
    reboot:'Reiniciar la máquina virtual',
    reboot_success: 'reiniciado con éxito',
    reboot_fails: 'reinicio fallido',
    delect:'Eliminar máquina virtual',
    delect_success:'eliminado con éxito',
    delect_fails:'no se pudo eliminar',
    stop: 'Detener máquina virtual',
    stop_success: 'Detener la máquina virtual con éxito',
    stop_fails: 'Error al detener la máquina virtual',
    start: 'Inicie la máquina virtual',
    start_success: 'Inicie la máquina virtual con éxito',
    start_fails: 'No se pudo iniciar la máquina virtual',
    reset:'Restablecer la contraseña',
    pass1:'Nueva contraseña:',
    pass2:'doble confirmación:',
    pass3:'Por favor, ingrese contraseña',
    pass4:'Por favor, introduzca la contraseña de nuevo',
    pass5:'Las contraseñas ingresadas dos veces no coinciden',
    change:'Modify virtual machine parameters',
    mirror_name: 'nombre del espejo',
    IP_address: 'dirección IP de la máquina',
    user_name: 'Nombre de usuario',
    password: 'contraseña de inicio de sesión',
    ssh_port: 'Puerto SSH ',
    rdp_port: 'Puerto RDP',
    operation:'Sistema operativo',
    multicast: 'dirección de multidifusión',
    local_address:'Dirección IP de intranet',
    open_port_range: 'rango de puerto abierto ABRIR Rango de puerto ?? open port range',
    port_range: 'Rango de puerto port range',
    vnc_port: 'Puerto VNC',
    vir_mem: 'memoria de máquina virtual',
    vir_sys: 'disco de sistema de máquina virtual',
    vir_data: 'disco de datos de máquina virtual',
    vir_gpu_num: 'El número de GPUs en la máquina virtual',
    vir_cpu_num: 'El número de núcleos de CPU de la máquina virtual',
    renew_time:'Tiempo de renovación de arrendamiento',
    balance: 'Saldo DBC de la cuenta corriente',
    max_set:'Se puede establecer el máximo',
    order_details: 'Ver detalles del pedido',
    details:' detalles del pedido ',
    refund: 'reembolso',
    renewal_time: 'Tiempo de renovación de arrendamiento',
    err_msg: 'No se creó ninguna máquina virtual para esta máquina',
    err_msg1: '¡Error al obtener los datos, inténtalo de nuevo más tarde!',
    vir_status: 'cerrado',
    vir_status1: 'creando',
    vir_status2: 'corriendo',
    vir_status3: 'a partir de',
    vir_status4: 'parada',
    vir_status5: 'reiniciando',
    vir_status6: 'restablecer',
    vir_status7: 'error de inicio',
    vir_status8: 'error de reinicio',
    vir_status9: 'pm_suspendido'
  },
  // 购买DBC
  buyDBC: {
    address: 'dirección de la billetera',
    amount: "cantidad de compra",
    pay: "Pagado por",
    finish: 'completar la compra',
    enterwallet: "Ingrese la dirección de la billetera para recibir DBC",
    continue: 'Seguir',
    support: "Atención al cliente",
    reply: "El servicio al cliente responderá dentro de las 24 horas.",
    quantity: 'cantidad correspondiente',
    seePrice: "Haga clic para ver el precio:",
    enterAmount: "Por favor ingrese la cantidad",
    payBy: 'Por favor seleccione modo de pago:',
    status1: "preguntando...",
    status2: "La transferencia DBC es exitosa. Tardará unos minutos en llegar a la cuenta. Verifique la dirección de la billetera.",
    status3: "El pago es exitoso, pero la transferencia DBC falla, envíe un correo electrónico a support@dbctrade.io. Te ayudaremos en 24 horas",
    status4: "El pago falló, envíe un correo electrónico a support@dbctrade.io. Te ayudaremos en 24 horas",
    status5: "Si el monto del pedido no coincide con el monto de la transferencia, comuníquese con el servicio al cliente",
    title1: "pista importante",
    tip1: "La plataforma transfiere DBC a través de contratos inteligentes. Una vez que se complete el pago, el contrato inteligente transferirá automáticamente el DBC que compró a la dirección de DBC que especifique.",
    tip2: "Recordatorio: la plataforma cobra una tarifa del 14 % + 0,3 USD, y el monto máximo de compra individual es de 2000 USD. Si necesita facturar, envíe un correo electrónico al buzón de soporte de servicio al cliente en la parte inferior derecha",
    tip3: "Los precios de DBC fluctúan todo el tiempo, ¡tenga en cuenta los riesgos!",
    tip4: "El precio de DBC se refiere al precio del par comercial de puerta DBC/USDT,",
    tip5: "El monto de DBC es 0, actualice la página y vuelva a ingresar el monto en USD",
    tip6: "La cantidad no puede exceder 2000",
    tip7: "La cantidad no puede ser inferior a 1",
    tip8: "Cantidad incorrecta ingresada",
    tip9: "El saldo de la billetera de contrato inteligente es insuficiente, vuelva a ingresar el monto de la compra",
    tip10: "La dirección de la billetera no puede estar vacía"
  },
  // 操作报错原因
  err_reason:{
    // onlineCommittee
    NotInBookList: 'el orden no existe',
    AlreadySubmitHash: 'Hash ha sido enviado',
    NotAllHashSubmited: 'No se enviaron todos los hashes',
    TimeNotAllow: 'Enviado dentro del tiempo permitido',
    NotSubmitHash: 'Hash no enviado',
    AlreadySubmitRaw: 'Datos sin procesar enviados',
    InfoNotFeatHash: 'El resultado del envío es inconsistente con Hash',
    DuplicateHash: 'Repetir valor Hash',
    // maintainCommittee
    NotCommittee: 'todavía no eres miembro del comité',
    AlreadyBooked: 'El pedido ha sido tomado',
    OrderStatusNotFeat: 'estado del pedido no permitido',
    NotInBookedList: 'el pedido no existe',
    NotOrderReporter: 'No es la persona que reporta el pedido',
    NotOrderCommittee: 'No es el MIEMBRO DEL comité de pedidos', 
    GetStakeAmountFailed: 'Error obtener el monto prometido (de la aportación)',
    StakeFailed: 'compromiso (aportación) fallido a',
    OrderNotAllowCancel: ' No está permitida cancelación del pedido',
    OrderNotAllowBook: 'El pedido no permite reservas',
    NotProperCommittee: 'miembros del comité no regulares',
    NotEqualReporterSubmit: 'Inconsistente con el valor Hash enviado por el reportero',
    NotEqualCommitteeSubmit: 'Inconsistente con el valor Hash enviado por el comité',
    ReduceTotalStakeFailed: 'Reducir las fallas totales de participación',
    PayTxFeeFailed: 'No se pudo pagar la tarifa de transacción',
    NotNeedEncryptedInfo: 'No se requiere información cifrada',
    ExpiredReport: 'Informe vencido',
    AlreadySubmitConfirmation: 'Se ha enviado la confirmación',
    BalanceNotEnough: 'Saldo insuficiente',
    StakeNotEnough: 'Cantidad de compromiso (aportación)  insuficiente',
    BoxPubkeyIsNoneInFirstReport: 'La clave BoxPub no es ninguna en el primer informe',
    NotReporter: 'No es el informe',
    TimeNotAllowed: 'no dentro del plazo permitido',
    SlashIdNotExist: 'El identificador de la penalización no existe',
    NotPendingReviewSlash: 'Penalización por no solicitar la revisión del comité técnico',
    NotSlashed: 'No castigado ',
  }
}