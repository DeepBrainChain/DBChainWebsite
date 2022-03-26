import axios from "@/utlis/axios";
import qs from 'qs'

// 聪图云转发后台（测试环境）
const host = "https://identifiertest.congtu.cloud";

// http://114.115.219.202:8090
// http://localhost:8090
// 审核机器新增

const nodeHost = 'http://114.115.219.202:8090'


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
    url: host + "/getGPU",
  });
};


/**
 * @description 保存抢单机器hash
 * @param {object} params {machine_id, gpu, ....}
 */
 export const Save_GrabbingHash = params => {
  return axios({
    method: "post",
    url: host + "/Save_GrabbingHash",
    params
  });
};

/**
 * @description  获取抢单机器hash提交原始值
 * @param {object} params {machine_id, gpu, ....}
 */
 export const GetGrabbingHash = params => {
  return axios({
    method: "post",
    url: host + "/GetGrabbingHash",
    params
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
 * @description 获取Gpu列表
 * @param {object} params {machine_id, gpu, ....}
 */
 export const GetGpu_Info = () => {
  return axios({
    method: "get",
    url: host + "/GetGpu_Info",
  });
};


/**
 * @description 获取单个Gpu详细信息
 * @param {object} params {machine_id, gpu, ....}
 */
 export const GetMachine_Details = (params) => {
  return axios({
    method: "get",
    url: host + "/GetMachine_Details",
    params
  });
};

/**
 * @description 获取单个Gpu下机器总和
 * @param {object} params {machine_id, gpu, ....}
 */
 export const Count_Details = (params) => {
  return axios({
    method: "get",
    url: host + "/Count_Details",
    params
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