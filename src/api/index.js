import axios from "@/utlis/axios";
//const host = 'http://13.124.237.200:8031'
//const host = "https://otherinfo.dbchain.ai";
const host = "https://info.dbchain.ai";
//const host = 'http://116.85.24.172:8031'
//const host = "http://192.168.1.186:8080";
//const host = "http://192.168.31.241:8080";
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

// 试用-获取创建前的信息
export const try_place_order = params => {
  return axios({
    method: "post",
    url: host + "/try_rent/place_order",
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

// 支付后信息
export const pay = params => {
  return axios({
    method: "post",
    url: host + "/rent/pay",
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
