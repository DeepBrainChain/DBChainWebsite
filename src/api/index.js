import axios from "@/utlis/axios";
// 本地环境
// const host = "http://localhost:8080";

// 聪图云转发后台（prod）
const host = "https://congtucloud.dbchain.ai";
// const host = "http://111.44.254.181:8032";
// 聪图云转发后台（test）
// const host = "http://111.44.254.181:8033";

//const host = 'http://13.124.237.200:8031'
//const host = "https://otherinfo.dbchain.ai";
// const host = "https://info.dbchain.ai";
//const host = "https://infotest.dbchain.ai";
//const host = 'http://116.85.24.172:8031'
//const host = "http://192.168.1.186:8080";
//const host = "http://192.168.31.241:8080";
//const host = "http://192.168.43.178:8080";
//const host = "http://192.168.225.22:8080";
const juheKey = "";
//user_name_platform: this.$t("website_name")
// 发送邮箱验证码
export const sendMail_rent = params => {
  return axios({
    method: "post",
    url: host + "/binding_email_rent/request_code",
    params
  });
};

// 绑定邮箱
export const bindMail_rent = params => {
  return axios({
    method: "post",
    url: host + "/binding_email_rent/request_binding",
    params
  });
};

//验证邮箱是否绑定ok
export const binding_is_ok = params => {
  return axios({
    method: "post",
    url: host + "/binding_email_rent/binding_is_ok",
    params
  });
};

//验证修改邮箱是否绑定ok
export const binding_is_ok_modify = params => {
  return axios({
    method: "post",
    url: host + "/binding_email_rent/binding_is_ok_modify",
    params
  });
};

// 查询绑定邮箱
export const queryBindMail_rent = params => {
  return axios({
    method: "post",
    url: host + "/binding_email_rent/query_email",
    params
  });
};

// 修改绑定邮箱
export const modifyBindMail_rent = params => {
  return axios({
    method: "post",
    url: host + "/binding_email_rent/request_binding_modify",
    params
  });
};

// 修改绑定邮箱验证码
export const modifySendMail_rent = params => {
  return axios({
    method: "post",
    url: host + "/binding_email_rent/request_code_modify",
    params
  });
};

// 查询机器列表
export const getMcList = params => {
  return axios({
    method: "post",
    url: host + "/query_all_machines",
    params
  });
};

// 根据类型查询机器列表
export const query_machines_by_machine_type = params => {
  return axios({
    method: "post",
    url: host + "/query_machines_by_machine_type",
    params
  });
};

// 试用-获取创建前的信息
export const try_place_order = params => {
  return axios({
    method: "post",
    url: host + "/try_rent/place_order",
    params
  });
};

// 试用-获取创建前的信息
export const try_place_order_new = params => {
  return axios({
    method: "post",
    url: host + "/try_rent/place_order_new",
    params
  });
};

// 获取订单前信息
export const place_order = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order",
    params
  });
};

// 获取订单前信息
export const place_order_gpu_new = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order_gpu_new",
    params
  });
};

export const get_max_disk_can_use = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_max_disk_can_use",
    params
  });
};

export const get_max_memory_can_use = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_max_memory_can_use",
    params
  });
};

// 获取硬盘质押数据
export const get_disk_deposit_list = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_disk_deposit_list",
    params
  });
};

// 获取内存质押数据
export const get_memory_deposit_list = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_memory_deposit_list",
    params
  });
};

// 获取订单前信息
export const place_order_cpu_to_gpu = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order_cpu_to_gpu",
    params
  });
};

// 获取订单前信息
export const place_order_gpu_to_cpu = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order_gpu_to_cpu",
    params
  });
};

// 获取订单前信息
export const place_order_cpu_to_gpu_new = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order_cpu_to_gpu_new",
    params
  });
};

// 获取订单前信息
export const place_order_gpu_to_cpu_new = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order_gpu_to_cpu_new",
    params
  });
};

// 获取订单前信息
export const place_order_cpu = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order_cpu",
    params
  });
};

// 获取订单前信息
export const place_order_cpu_new = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order_cpu_new",
    params
  });
};

// 获取订单前信息
export const place_order_stop_to_cpu = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order_stop_to_cpu",
    params
  });
};

// 获取订单前信息
export const place_order_stop_to_gpu = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order_stop_to_gpu",
    params
  });
};

// 获取订单前信息
export const place_order_stop_to_cpu_new = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order_stop_to_cpu_new",
    params
  });
};

// 获取订单前信息
export const place_order_stop_to_gpu_new = params => {
  return axios({
    method: "post",
    url: host + "/rent/place_order_stop_to_gpu_new",
    params
  });
};

// 创建订单
export const create_order = params => {
  return axios({
    method: "post",
    url: host + "/rent/create_order",
    params
  });
};

// 支付前信息
export const can_rent_this_machine = params => {
  return axios({
    method: "post",
    url: host + "/rent/can_rent_this_machine",
    params
  });
};
//升级容器是否成功
export const update_container_is_ok = params => {
  return axios({
    method: "post",
    url: host + "/rent/update_container_is_ok",
    params
  });
};
// 支付后信息
export const pay = params => {
  return axios({
    method: "post",
    url: host + "/rent/pay",
    params
  });
};

// 开启或者关闭gpu 升级容器
export const pay_update = params => {
  return axios({
    method: "post",
    url: host + "/rent/pay_update",
    params
  });
};

//获取租用订单DBC价格
export const get_dbc_price = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_dbc_price",
    params
  });
};

//获取续租订单DBC价格
export const continue_pay_get_dbc_price = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/continue_pay_get_dbc_price",
    params
  });
};

//获取支付的dbc钱包地址
export const get_dbchain_address = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_dbchain_address",
    params
  });
};

// 获取租用订单计算后DBC的数量
export const get_pay_dbc_count = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_pay_dbc_count",
    params
  });
};

// 获取质押的DBC数量
export const get_deposit_dbc_count = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_deposit_dbc_count",
    params
  });
};

// 获取续租订单计算后DBC的数量
export const continue_pay_get_pay_dbc_count = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/continue_pay_get_pay_dbc_count",
    params
  });
};

// 计算容器创建时间
export const get_create_container_time = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_create_container_time",
    params
  });
};

// 获取我下过订单的机器
export const query_machine_by_wallet = params => {
  return axios({
    method: "post",
    url: host + "/query_machine_by_wallet",
    params
  });
};

// 获取订单信息
export const get_all_order = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_all_order",
    params
  });
};

// 获取订单信息
export const get_all_order_cpu = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_all_order_cpu",
    params
  });
};

// 获取订单信息
export const get_all_order_be_stopped = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_all_order_be_stopped",
    params
  });
};

// 获得取消订单的验证码
export const get_cancer_code = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_cancer_code",
    params
  });
};

// 取消订单
export const cancer_order = params => {
  return axios({
    method: "post",
    url: host + "/rent/cancer_order",
    params
  });
};

// 获得退租验证码
export const get_stop_code = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_stop_code",
    params
  });
};

// 退租
export const stop = params => {
  return axios({
    method: "post",
    url: host + "/rent/stop",
    params
  });
};

// 获得重启机器验证码
export const get_restart_code = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_restart_code",
    params
  });
};

// 重启机器
export const restart = params => {
  return axios({
    method: "post",
    url: host + "/rent/restart",
    params
  });
};

// 退币验证码
export const get_return_dbc_code = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_return_dbc_code",
    params
  });
};

// 退币
export const request_return_dbc = params => {
  return axios({
    method: "post",
    url: host + "/rent/request_return_dbc",
    params
  });
};
//获取续租订单前信息
export const continue_pay_place_order = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/continue_pay_place_order",
    params
  });
};
//创建续租订单
export const continue_pay_create_order = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/continue_pay_create_order",
    params
  });
};
//质押续租订单
export const continue_pay_deposit = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/continue_pay_deposit",
    params
  });
};

export const continue_pay_deposit_get_time_max = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/continue_pay_deposit_get_time_max",
    params
  });
};

//续租订单验证
export const continue_pay_voc_pay = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/continue_pay_voc_pay",
    params
  });
};

//续租订单获取退币验证码
export const continue_pay_return_dbc_code = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/continue_pay_return_dbc_code",
    params
  });
};

//续租退币接口
export const continue_pay_return_dbc = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/continue_pay_return_dbc",
    params
  });
};
//续租订单获取退币验证码
export const get_continue_pay_order_list = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/get_continue_pay_order_list",
    params
  });
};

// 续租取消订单获取验证码
export const continue_pay_cancer_order_code = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/continue_pay_cancer_order_code",
    params
  });
};

// 续租取消订单接口
export const continue_pay_cancer_order = params => {
  return axios({
    method: "post",
    url: host + "/rent_continue/continue_pay_cancer_order",
    params
  });
};

// 获取评价接口
export const get_evaluation_code = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_evaluation_code",
    params
  });
};

// 评价
export const evaluate_machine = params => {
  return axios({
    method: "post",
    url: host + "/rent/evaluate_machine",
    params
  });
};

// 修改评价内容
export const modify_evaluate_machine = params => {
  return axios({
    method: "post",
    url: host + "/rent/modify_evaluate_machine",
    params
  });
};

// 获得机器评价内容
export const query_evaluation_list_by_machine_id = params => {
  return axios({
    method: "post",
    url: host + "/rent/query_evaluation_list_by_machine_id",
    params
  });
};

// 获取出租机器验证码
export const get_rentout_code = params => {
  return axios({
    method: "post",
    url: host + "/rentout/get_rentout_code",
    params
  });
};

// 添加或者修改出租信息
export const add_or_modify = params => {
  return axios({
    method: "post",
    url: host + "/rentout/add_or_modify",
    params
  });
};

// 添加或者修改出租信息
export const add_or_modify_new = params => {
  return axios({
    method: "post",
    url: host + "/rentout/add_or_modify_new",
    params
  });
};

// 添加或者修改出租信息
export const add_or_modify_new2 = params => {
  return axios({
    method: "post",
    url: host + "/rentout/add_or_modify_new2",
    params
  });
};

// 获取国家列表
export const get_country_list = params => {
  return axios({
    method: "post",
    url: host + "/rentout/get_country_list",
    params
  });
};

// 验证矿工添加的机器是否可用
export const voc_machine = params => {
  return axios({
    method: "post",
    url: host + "/voc_machine",
    params
  });
};

// 从id查询机器信息
export const query_machine_by_id = params => {
  return axios({
    method: "post",
    url: host + "/query_machine_by_id",
    params
  });
};

// 获取机器被出租后的订单列表
export const rentout_get_machines_orders_list = params => {
  return axios({
    method: "post",
    url: host + "/rentout_get_machines_orders_list",
    params
  });
};

// 获取出租的机器列表
export const rentout_get_machines_list = params => {
  return axios({
    method: "post",
    url: host + "/rentout_get_machines_list",
    params
  });
};

// 机器id获取订单列表
export const rentout_get_orders_list_by_machine_id = params => {
  return axios({
    method: "post",
    url: host + "/rentout_get_orders_list_by_machine_id",
    params
  });
};

// 获得cpu容器付费模式情况下的内存
export const get_memory_cpu_payment = params => {
  return axios({
    method: "post",
    url: host + "/rent/get_memory_cpu_payment",
    params
  });
};

// 获得dbc的价格等信息
export const dbc_info = params => {
  return axios({
    method: "get",
    url: host + "/query/dbc_info",
    params
  });
};

// 获得用户钱包dbc余额
export const dbc_balance = params => {
  return axios({
    method: "get",
    url: host + "/query/dbc_balance",
    params
  });
};

// 获得用户钱包dbc余额
export const dbc_gas_balance = params => {
  return axios({
    method: "get",
    url: host + "/query/dbc_gas_balance",
    params
  });
};

// 重发邮件
export const send_email_repeat = params => {
  return axios({
    method: "get",
    url: host + "/rent/send_email_repeat",
    params
  });
};

// 机器id获取订单列表
export const get_gate_dbc_price = dbc => {
  return axios({
    method: "get",
    url: `https://gateio.life/api2/1/ticker/${dbc}`
  });
};
// 验证矿工质押的dbc
export const vocing_deposite_dbc = params => {
  return axios({
    method: "post",
    url: host + "/rentout/vocing_deposite_dbc",
    params
  });
};

// 清除矿工质押验证错误标识位
export const vocing_deposite_dbc_repeat = params => {
  return axios({
    method: "post",
    url: host + "/rentout/vocing_deposite_dbc_repeat",
    params
  });
};

// 获取下架机器验证码
export const get_sold_out_machine_code = params => {
  return axios({
    method: "post",
    url: host + "/rentout/get_sold_out_machine_code",
    params
  });
};

// 下架机器
export const sold_out_machine = params => {
  return axios({
    method: "post",
    url: host + "/rentout/sold_out_machine",
    params
  });
};

// 获取需要质押的dbc数量
export const dbc_deposite_count = params => {
  return axios({
    method: "get",
    url: host + "/query/dbc_deposite_count",
    params
  });
};

// 获取需要质押的dbc数量
export const dbc_deposite_count_new = params => {
  return axios({
    method: "get",
    url: host + "/query/dbc_deposite_count_new",
    params
  });
};

// 获取当前人的订单列表
export const get_address_abstracts = ({
  address,
  page
}) => {
  return axios({
    method: "get",
    url: `https://api.neoscan.io/api/main_net/v1/get_address_abstracts/${address}/${page}`
  });
};

// 获取汇率接口
export const exchangeUSDToCNY = (from, to) => {
  return axios({
    method: "get",
    url: `http://op.juhe.cn/onebox/exchange/currency?key=${juheKey}&from=USD&to=CNY`
  });
};


// **********************************************  聪图云接口   **********************************************
/**
 * 获取邮箱验证码
 * @description 获取邮箱验证码
 * @param {object} params {email, language}
 */
export const get_register_code = params => {
  return axios({
    method: "post",
    url: host + "/cloud_disk/get_register_code",
    params
  });
};

/**
 * 注册账号
 * @description 注册账号
 * @param {object} params {email, pwd, code, language}
 */
export const register = params => {
  return axios({
    method: "post",
    url: host + "/cloud_disk/register_email",
    params
  });
};

/**
 * 登录账号
 * @description 登录账号
 * @param {object} params {email, pwd, language}
 */
export const login = params => {
  return axios({
    method: "post",
    url: host + "/cloud_disk/login_email",
    params
  });
};

/**
 * 找回密码
 * @description 找回密码
 * @param {object} params {email, language}
 */
export const retrieve_pwd = params => {
  return axios({
    method: "post",
    url: host + "/cloud_disk/retrieve_password",
    params
  });
};

/**
 * 重置密码
 * @description 重置密码
 * @param {object} params {email, pwd, cid, language}
 */
// export const reset_pwd = params => {
//     return axios({
//         method: "post",
//         url: host + "/cloud_disk/login_email",
//         params
//     });
// };

/**
 * 添加支付宝支付订单
 * @description 添加支付宝支付订单
 * @param {object} params {response,order_id,count}
 */
export const create_order_congtu = params => {
  return axios({
    method: "post",
    url: host + "/pay/create_order_congtu",
    params
  });
};

/**
 * 获取支付宝支付状态
 * @description 获取支付宝支付状态
 * @param {object} params {order_id,language}
 */
export const get_pay_status = params => {
  return axios({
    method: "post",
    url: host + "/gpu_order/get_pay_status",
    params
  });
};

/**
 * 获取dbc转账后返回的验证码
 * @description 获取dbc转账后返回的验证码
 * @param {object} params {order_id,language}
 */
export const get_dbc_res_code = params => {
  return axios({
    method: "post",
    url: host + "/gpu_order/get_dbc_res_code",
    params
  });
};

/**
 * 获取订单号列表
 * @description 获取订单号列表
 * @param {object} params {email,language}
 */
export const get_order_id_list = params => {
  return axios({
    method: "post",
    url: host + "/gpu_order/get_order_id_list",
    params
  });
};
