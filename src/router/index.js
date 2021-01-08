/*
 * @Author: your name
 * @Date: 2020-12-15 11:44:55
 * @LastEditTime: 2021-01-08 15:52:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \home-page\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home.vue'
import WinWechatTip from '@/pages/tips/windowsWechatTip.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/windows_wechat_tip',
      name: 'WinWechatTip',
      component: WinWechatTip
    }
  ]
})
