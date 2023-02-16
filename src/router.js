import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
//import Home from "./congTuCloud/pages/home.vue";
import Login from "./congTuCloud/pages/login"
import Register from "./congTuCloud/pages/register"

Vue.use(Router)

//console.log(process.env.NODE_ENV)
const router = new Router({
  // base: process.env.NODE_ENV === 'production' ? '/DBC_GPU' : '/',
  base: process.env.NODE_ENV === 'production' ? '/' : '/',

  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/network',
      name: 'network',
      component: resolve => require(['./views/network'] , resolve)
    },
    // {
    //   path: '/virtual',
    //   name: 'virtual',
    //   component: resolve => require(['./views/virtual'] , resolve),
    // },
    {
      path: '/wholeVirtual',
      name: 'wholeVirtual',
      component: resolve => require(['./views/virtual'] , resolve),
    },
    {
      path: '/signleVirtual',
      name: 'signleVirtual',
      component: resolve => require(['./views/virtual/signleVirtual'] , resolve),
    },
    ,
    {
      path: '/loading',
      name: 'loading',
      component: resolve => require(['./views/virtual/loading'] , resolve),
    },
    // 审核机器
    {
      path: '/audit',
      name: 'audit',
      component: resolve => require(['./views/audit'] , resolve),
      redirect: '/audit/ordergrabbingMachine',
      children: [
        {
          meta: {
            menuIndex: 0
          },
          path: 'ordergrabbingMachine', //抢单机器列表
          component: resolve => require(['./views/audit/ordergrabbingMachine'] , resolve)
        },
        {
          meta: {
            menuIndex: 0
          },
          path: 'ordergrabbingMachine_unlock', //抢单机器列表
          component: resolve => require(['./views/audit/ordergrabbingMachine_unlock'] , resolve)
        },
        {
          meta: {
            menuIndex: 1
          },
          path: 'distributionMachine', // 分配机器列表
          component: resolve => require(['./views/audit/distributionMachine'] , resolve)
        },
        {
          meta: {
            menuIndex: 1
          },
          path: 'distributionMachine_unlock', // 分配机器列表
          component: resolve => require(['./views/audit/distributionMachine_unlock'] , resolve)
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'myAudit', // 我的审核列表
          component: resolve => require(['./views/audit/myAudit'] , resolve)
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'myAudit_unlock', // 我的审核列表
          component: resolve => require(['./views/audit/myAudit_unlock'] , resolve)
        },
        {
          meta: {
            menuIndex: 3
          },
          path: 'myOrder', // 我的抢单列表
          component: resolve => require(['./views/audit/myOrder'] , resolve)
        },
        {
          meta: {
            menuIndex: 3
          },
          path: 'myOrder_unlock', // 我的抢单列表
          component: resolve => require(['./views/audit/myOrder_unlock'] , resolve)
        }
      ]
    },
    // 我的机器
    {
      path: '/mymachine',
      name: 'mymachine',
      component: resolve => require(['./views/mymachine'] , resolve),
      redirect: '/mymachine/myMachine_gpuVirtual',
      children: [
        {
          meta: {
            menuIndex: 3
          },
          path: 'myMachine_gpuVirtual',
          component: resolve => require(['./views/mymachine/myMachine_gpuVirtual'] , resolve)
        },
        {
          meta: {
            menuIndex: 4
          },
          path: 'myVerify_gpuVirtual',
          component: resolve => require(['./views/mymachine/myVerify_gpuVirtual'] , resolve)
        },
        {
          meta: {
            menuIndex: 5
          },
          path: 'mySignle_gpuVirtual',
          component: resolve => require(['./views/mymachine/mySignle_GpuVirtual'] , resolve)
        },
        {
          meta: {
            menuIndex: 6
          },
          path: 'mySecurityGroup',
          component: resolve => require(['./views/mymachine/mySecurityGroup'] , resolve)
        },
        {
          meta: {
            menuIndex: 3
          },
          path: 'myMachineUnlockGpuVirtual',
          component: resolve => require(['./views/mymachine/myMachine_unlock_gpuVirtual'] , resolve)
        },
        {
          meta: {
            menuIndex: 5
          },
          path: 'mySignleUnlockGpuVirtual',
          component: resolve => require(['./views/mymachine/mySignle_unlock_GpuVirtual'] , resolve)
        },
        {
          meta: {
            menuIndex: 6
          },
          path: 'myUnlockSecurityGroup',
          component: resolve => require(['./views/mymachine/my_unlock_SecurityGroup'] , resolve)
        },
        {
          meta: {
            menuIndex: 6
          },
          path: 'myUnlockSGrule',
          component: resolve => require(['./views/mymachine/my_unlock_SGrule'] , resolve)
        },
      ]
    },
    {
      path: '/mywallet',
      name: 'mywallet',
      component: resolve => require(['./views/mywallet'] , resolve),
      redirect: '/mywallet/myWallet',
      children: [
        {
          meta: {
            menuIndex: 0
          },
          path: 'myWallet',
          component: resolve => require(['./views/mywallet/myWallet'] , resolve)
        }
      ]
    },
    {
      path: '/newWallet/createWallet',
      name: 'CreateWallet',
      component: resolve => require(['./views/newWallet/createWallet'] , resolve)
    },
    {
      path: '/newWallet/openWallet',
      name: 'OpenWallet',
      component: resolve => require(['./views/newWallet/openWallet'] , resolve)
    },
    {
      path: '/newWallet',
      name: 'newMyWallet',
      component: resolve => require(['./views/mywallet'] , resolve),
      children: [
        {
          
          meta: {
            menuIndex: 0
          },
          path: '/newWallet/myWalletUnlock',
          name: 'myWalletUnlockNew',
          component: resolve => require(['./views/newWallet/myWallet_unlock'] , resolve)
        }
      ]
    },
    // 购买DBC
    {
      name: 'trade',
      path: '/trade',
      component: resolve => require(['./views/trade_io'] , resolve),
      redirect: '/trade/buy_1',
      children: [
        {
          path: 'buy_1',
          component: resolve => require(['./views/trade_io/buy_1'] , resolve)
        },
        {
          path: 'buy_2',
          component: resolve => require(['./views/trade_io/buy_2'] , resolve)
        },
        {
          path: 'buy_3',
          component: resolve => require(['./views/trade_io/buy_3'] , resolve)
        },
        {
          path: 'buy_4',
          component: resolve => require(['./views/trade_io/buy_4'] , resolve)
        }
      ]
    },
    {
      path: '/howBuy',
      name: 'howBuy',
      component: resolve => require(['./views/help/howBuy'] , resolve),
    },
    {
      path: '/howSell',
      name: 'howSell',
      component: resolve => require(['./views/help/howSell'] , resolve),
    }
  ]
})

/*router.beforeEach((to, from, toStep2) => {
})*/

export default router
