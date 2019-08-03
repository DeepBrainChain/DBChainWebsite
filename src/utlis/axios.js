import axios from 'axios'
// import Cookies from "js-cookie";

const instance = axios.create()
instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(res => {
  return res.data
}, error => {
  if (error.response.status === 401) { // 检测未登录统一进行跳转登录页
    location.href = '/manager/login'
  }
  return Promise.reject(error)
})

export default instance
