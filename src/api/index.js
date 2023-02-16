import axios from "@/utlis/axios";

// 'https://nodejs.dbchain.ai'
// 'http://82.157.50.32:8090'
// http://localhost:8090
// 审核机器新增

const nodeHost = 'https://nodejs.dbchain.ai'


// 获得dbc的价格等信息
export const dbc_info = params => {
  return axios({
    method: "get",
    url: "https://dbchaininfo.congtu.cloud/query/dbc_info",
    params
  });
};

// 获取新钱包当前人的订单列表
export const get_address_abstracts1 = data => {
  return axios({
    method: "post",
    url: 'https://dbc.webapi.subscan.io/api/scan/transfers',
    data: data
  });
};
// 获取新钱包余额   
export const getsearch = data => {
  return axios({
    method: "post",
    url: 'https://dbc.webapi.subscan.io/api/v2/scan/search',
    data: data
  });
};


/**
 * @description 获取Gpu列表
 * @param 
 */
 export const getgpuType = () => {
  return axios({
    method: "get",
    url: nodeHost + `/api/select/getgpuType`,
  });
};

/**
 * @description 获取单个Gpu详细信息
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getlistByGpu = (data) => {
  return axios({
    method: "post",
    url: nodeHost + "/api/select/getlistByGpu",
    data: data
  });
};

/**
 * @description 获取已有的地区列表
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getCity = () => {
  return axios({
    method: "get",
    url: nodeHost + "/api/select/getCity",
  });
};

/**
 * @description 通过地区获取机器列表
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getlistByCity = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/select/getlistByCity",
    data: data
  });
};

/**
 * @description 获取已有的机房编号列表
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getRoomnum = () => {
  return axios({
    method: "get",
    url: nodeHost + "/api/select/getRoomnum",
  });
};

/**
 * @description 通过机房编号获取机器列表
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getlistByRoom = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/select/getlistByRoom",
    data: data
  });
};

/**
 * @description 获取待审核列表
 * @param wallet 钱包地址
 */
export const getMachineList = params => {
  return axios({
    method: "get",
    url: nodeHost + "/api/audit/getAuditList",
    params
  });
};

/**
 * @description 查询Gpu信息
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getGPUList = () => {
  return axios({
    method: "get",
    url: nodeHost + "/api/audit/getGpuList",
  });
};

/**
 * @description 保存派单列表hash
 * @param {object} params {machine_id, gpu, ....}
 */
 export const Save_ResultHash = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/audit/saveAuditHash",
    data: data
  });
};


/**
 * @description 获取派单机器hash
 * @param {object} params {machine_id, gpu, ....}
 */
export const GetResultHash = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/audit/getAuditHash",
    data: data
  });
};


/**
 * @description 保存抢单机器hash
 * @param {object} params {machine_id, gpu, ....}
 */
 export const saveOrderHash = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/audit/saveOrderHash",
    data
  });
};

/**
 * @description  获取抢单机器hash提交原始值
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getOrderHash = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/audit/getOrderHash",
    data
  });
};



/**
 * @description 获取地域系数
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getCoefficient = params => {
  return axios({
    method: "get",
    url: nodeHost + "/api/audit/getCoefficient",
    params
  });
};


/**
 * @description 我的验证Gpu虚拟机列表
 * @param {object} params {machine_id, gpu, ....}
 */
 export const VerifierMachine = params => {
  return axios({
    method: "get",
    url: nodeHost + "/api/audit/getVerifyGPUList",
    params
  });
};


/**
 * @description 我的验证Gpu虚拟机-创建虚拟机
 * @param {object} params {machine_id, gpu, ....}
 */
 export const Verifier_CreateVM = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/audit/createVerifyVir",
    data: data
  });
};

/**
 * @description 我的验证Gpu虚拟机-重启虚拟机
 * @param {object} params {machine_id, gpu, ....}
 */
 export const Restart = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/audit/restartVerifyVir",
    data: data
  });
};

/**
 * @description 我的验证Gpu虚拟机-查看虚拟机
 * @param {object} params {machine_id, gpu, ....}
 */
 export const Tasks = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/audit/getVerifyVir",
    data: data
  });
};


/**
 * @description 获取租用虚拟机加价百分比
 * @param {object} data {machine_id, gpu, ....}
 */
 export const getPercentage = data => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/getPercentage',
    data: data
  });
};


/**
 * @description 获取支付钱包地址和四位随机数
 * @param {object} data {machine_id, gpu, ....}
 */
 export const CreateWallet = data => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/getWallet',
    data: data
  });
};

/**
 * @description 添加订单信息
 * @param {object} data {machine_id, gpu, ....}
 */
 export const createVirOrder = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/createVirOrder',
    data: data
  });
};


/**
 * @description 获取机器信息
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getMachineInfo = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/rentMachine/getMachineInfo",
    data: data
  });
};

/**
 * @description 确认支付成功
 * @param {object} data {machine_id, gpu, ....}
 */
 export const rentmachine = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/rentmachine',
    data: data
  });
};
/**
 * @description 获取订单信息
 * @param {object} data {machine_id, gpu, ....}
 */
 export const get_Virtual = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/getVirtual',
    data: data
  });
};

/**
 * @description 创建查询网络
 * @param {object} data {machine_id, gpu, ....}
 */
 export const createNetwork = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/createNetwork',
    data: data
  });
};

/**
 * @description 查询ip信息
 * @param {object} data {machine_id, gpu, ....}
 */
 export const searchRoomIp = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/searchRoomIp',
    data: data
  });
};

/**
 * @description 创建虚拟机
 * @param {object} data {machine_id, gpu, ....}
 */
 export const Create_VMS = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/createVirTask',
    data: data
  });
};


/**
 * @description 定时查询虚拟机
 * @param {object} data {machine_id, gpu, ....}
 */
 export const timedQueryTask = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/timedQueryTask',
    data: data
  });
};
/**
 * @description 查询虚拟机
 * @param {object} data {machine_id, gpu, ....}
 */
 export const VMS_details = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/getVirTask',
    data: data
  });
};


/**
 * @description 删除虚拟机
 * @param {object} data {machine_id, gpu, ....}
 */
 export const deleteVir = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/deleteVir',
    data: data
  });
};

/**
 * @description 停止虚拟机
 * @param {object} data {machine_id, gpu, ....}
 */
 export const stopVir = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/stopVir',
    data: data
  });
};

/**
 * @description 启动虚拟机
 * @param {object} data {machine_id, gpu, ....}
 */
 export const startVir = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/startVir',
    data: data
  });
};

/**
 * @description 确认租用虚拟机
 * @param {object} data {machine_id, gpu, ....}
 */
 export const ConFirm_Rent = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/confirmRent',
    data: data
  });
};

/**
 * @description 续费
 * @param {object} data {machine_id, gpu, ....}
 */
 export const Renew_Rent = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/renewRent',
    data: data
  });
};

/**
 * @description 重启虚拟机
 * @param {object} data {machine_id, gpu, ....}
 */
 export const VMS_restart = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/restartVir',
    data: data
  });
};

/**
 * @description 修改虚拟机
 * @param {object} data {machine_id, gpu, ....}
 */
 export const editVir = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/editVir',
    data: data
  });
};

/**
 * @description 修改密码
 * @param {object} data {machine_id, gpu, ....}
 */
 export const editpasswd = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/editpasswd',
    data: data
  });
};

/**
 * @description 新增磁盘
 * @param {object} data {machine_id, gpu, ....}
 */
 export const addVMDisk = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/addDisk',
    data: data
  });
};

/**
 * @description 新增磁盘
 * @param {object} data {machine_id, gpu, ....}
 */
 export const editDisk = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/editDisk',
    data: data
  });
};

/**
 * @description 清楚机器内存
 * @param {object} data {machine_id, id}
 */
 export const clearMem = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/rentMachine/clearMem',
    data: data
  });
};

/**
 * @description reportErr 用户报错
 * @param {object} params {machine_id, gpu, ....}
 */
 export const reportErr = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/rentMachine/reportErr",
    data: data
  });
}

/**
 * @description reportCancel 用户取消举报
 * @param {object} params {machine_id, gpu, ....}
 */
 export const reportCancel = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/rentMachine/reportCancel",
    data: data
  });
}

/**
 * @description reportCancel 用户取消举报
 * @param {object} params {machine_id, gpu, ....}
 */
 export const reportFinish = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/rentMachine/reportFinish",
    data: data
  });
}

/**
 * @description reportCancel 用户提交加密信息
 * @param {object} params {machine_id, gpu, ....}
 */
 export const reportSubmitMsg = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/rentMachine/reportSubmitMsg",
    data: data
  });
}

/**
 * @description reportCancel 举报退币
 * @param {object} params {machine_id, gpu, ....}
 */
 export const reportRefund = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/rentMachine/reportRefund",
    data: data
  });
}


/**
 * @description 获取机器中是否包含ip
 * @param {object} params {machine_id, gpu, ....}
 */

 export const getMacIp = params => {
  return axios({
    method: "get",
    url: nodeHost + '/api/select/getMacIp',
    params
  });
};




/**
 * @description 获取累计收益信息
 * @param {object} params {machine_id, gpu, ....}
 */

export const searchMachine = params => {
  return axios({
    method: "get",
    url: nodeHost + '/api/select/searchMachine',
    params
  });
};

/**
 * @description 提交审核结果后修改派单状态
 * @param {object} data {machine_id, gpu, ....}
 */

export const changeStatus = data => {
  return axios({
    method: "post",
    url: nodeHost + '/api/audit/changeStatus',
    data: data
  });
};

/**
 * @description 法币购买dbc
 * @param {object} data {machine_id, gpu, ....}
 */

 export const confirmPayment = params => {
  return axios({
    method: "get",
    url: nodeHost + '/api/paypal/confirmPayment',
    params
  });
};

/**
 * @description 创建订单
 * @param {object} data {machine_id, gpu, ....}
 */

 export const createBuyOd = data => {
  return axios({
    method: "post",
    url: nodeHost + '/api/paypal/createOrder',
    data: data
  });
};

/**
 * @description 获取支付宝订单内容
 * @param {object} data {machine_id, gpu, ....}
 */

 export const createPayByAli = data => {
  return axios({
    method: "post",
    url: nodeHost + '/api/paypal/createPayByAli',
    data: data
  });
};

/**
 * @description 校验是否支付成功
 * @param {object} data {machine_id, gpu, ....}
 */

 export const checkPayByAli = data => {
  return axios({
    method: "post",
    url: nodeHost + '/api/paypal/checkPayByAli',
    data: data
  });
};

// 租用单个虚拟机
/**
 * @description 获取Gpu列表
 * @param 
 */

 export const getsignlegpuType = data => {
  return axios({
    method: "get",
    url: nodeHost + '/api/selectsignle/getgpuType'
  });
};


/**
 * @description 获取单个Gpu详细信息
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getsignlelistByGpu = (data) => {
  return axios({
    method: "post",
    url: nodeHost + "/api/selectsignle/getlistByGpu",
    data: data
  });
};


/**
 * @description 获取已有的地区列表
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getsignleCity = (perams) => {
  return axios({
    method: "get",
    url: nodeHost + '/api/selectsignle/getCity'
  });
};

/**
 * @description 通过地区获取机器列表
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getsignlelistByCity = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/selectsignle/getlistByCity",
    data: data
  });
};

/**
 * @description 获取已有的机房编号列表
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getsignleRoomnum = (perams) => {
  return axios({
    method: "get",
    url: nodeHost + '/api/selectsignle/getRoomnum'
  });
};

/**
 * @description 通过机房编号获取机器列表
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getsignlelistByRoom = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/selectsignle/getlistByRoom",
    data: data
  });
};

/**
 * @description 获取机器信息
 * @param {object} params {machine_id, gpu, ....}
 */
 export const getsignleMachineInfo = data => {
  return axios({
    method: "post",
    url: nodeHost + "/api/selectsignle/getMachineInfo",
    data: data
  });
};


// 单个虚拟机-查询已有端口
export const getPort = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/getPort',
    data: data
  });
};

// 单个虚拟机创建临时钱包 
export const createSignleWallet = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/createSignleWallet',
    data: data
  });
};

// 单个虚拟机-创建单个虚拟的订单信息
export const createSignleVirOrder = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/createSignleVirOrder',
    data: data
  });
};

// 单个虚拟机-创建单个虚拟机
export const createSignleVir = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/createSignleVir',
    data: data
  });
};


// 单个虚拟机-查询单个虚拟的订单信息
export const getSignleVirtual = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/getSignleVirtual',
    data: data
  });
};

// 单个虚拟机-定时查询虚拟机 
export const timedQuerySignleTask = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/timedQuerySignleTask',
    data: data
  });
};

// 确认租用虚拟机 
export const VirconfirmRent = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/confirmRent',
    data: data
  });
};

// 修改虚拟机订单状态
export const changeSignleVirStatus = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/changeSignleVirStatus',
    data: data
  });
};

// 单个虚拟机-停止虚拟机
export const stopSignleVir = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/stopSignleVir',
    data: data
  });
};

// 单个虚拟机-启动虚拟机 
export const startSignleVir = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/startSignleVir',
    data: data
  });
};

// 单个虚拟机-重启虚拟机 
export const restartSignleVir = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/restartSignleVir',
    data: data
  });
};

// 单个虚拟机-续费
export const renewRentSignle = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/renewRentSignle',
    data: data
  });
};


// 单个虚拟机-续费
export const rentagain = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/signlerent/rentagain',
    data: data
  });
};

// 创建规则 
export const createSecurity = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/security/createSecurity',
    data: data
  });
};

// 查询 
export const getSecurity = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/security/getSecurity',
    data: data
  });
};

// 修改名称
export const changeName = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/security/changeName',
    data: data
  });
};

// 删除安全组
export const deleteSG = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/security/deleteSG',
    data: data
  });
};

// 克隆安全组
export const cloneSG = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/security/cloneSG',
    data: data
  });
};

// 删除安全组规则
export const deleteSGRule = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/security/deleteSGRule',
    data: data
  });
};

// 修改安全组规则
export const editSGRule = (data) => {
  return axios({
    method: "post",
    url: nodeHost + '/api/security/editSGRule',
    data: data
  });
};