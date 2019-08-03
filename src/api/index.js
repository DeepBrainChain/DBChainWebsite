import axios from '@/utlis/axios'
// const host = 'http://13.124.237.200:8031'
const host = ''

// 发送邮箱验证码
export const sendMail_rent = params => {
  return axios({
    method: 'post',
    url: host + '/binding_email_rent/request_code',
    params
  })
}

// 绑定邮箱
export const bindMail_rent = params => {
  return axios({
    method: 'post',
    url: host + '/binding_email_rent/request_binding',
    params
  })
}

// 查询绑定邮箱
export const queryBindMail_rent = params => {
  return axios({
    method: 'post',
    url: host + '/binding_email_rent/query_email',
    params
  })
}

// 修改绑定邮箱
export const modifyBindMail_rent = params => {
  return axios({
    method: 'post',
    url: host + '/binding_email_rent/request_binding_modify',
    params
  })
}

// 修改绑定邮箱验证码
export const modifySendMail_rent = params => {
  return axios({
    method: 'post',
    url: host + '/binding_email_rent/request_code_modify',
    params
  })
}

// 查询机器列表
export const getMcList = params => {
  return axios({
    method: 'post',
    url: host + '/query_all_machines',
    params
  })
}

// 试用-获取创建前的信息
export const try_place_order = params => {
  return axios({
    method: 'post',
    url: host + '/try_rent/place_order',
    params
  })
}

// 获取订单前信息
export const place_order = params => {
  return axios({
    method: 'post',
    url: host + '/rent/place_order',
    params
  })
}

// 创建订单
export const create_order = params => {
  return axios({
    method: 'post',
    url: host + '/rent/create_order',
    params
  })
}

// 支付前信息
export const can_rent_this_machine = params => {
  return axios({
    method: 'post',
    url: host + '/rent/can_rent_this_machine',
    params
  })
}

// 支付后信息
export const pay = params => {
  return axios({
    method: 'post',
    url: host + '/rent/pay',
    params
  })
}

//获取DBC价格
export const get_dbc_price = params => {
  return axios({
    method: 'post',
    url: host + '/rent/get_dbc_price',
    params
  })
}

// 获取我下过订单的机器
export const query_machine_by_wallet = params => {
  return axios({
    method: 'post',
    url: host + '/query_machine_by_wallet',
    params
  })
}

// 获取订单信息
export const get_all_order = params => {
  return axios({
    method: 'post',
    url: host + '/rent/get_all_order',
    params
  })
}

