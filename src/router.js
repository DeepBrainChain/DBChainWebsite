import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
//import Home from "./congTuCloud/pages/home.vue";
import Login from "./congTuCloud/pages/login"
import Register from "./congTuCloud/pages/register"
import Preview from './views/preview'

Vue.use(Router)

//console.log(process.env.NODE_ENV)
const router = new Router({
  // base: process.env.NODE_ENV === 'production' ? '/DBC_GPU' : '/',
  base: process.env.NODE_ENV === 'production' ? '/' : '/',

  mode: 'history',
  routes: [
    {
      path: '/preview',
      name: ' preview',
      component: Preview
    },
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
    {
      path: '/gpu',
      name: 'gpu',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['./views/gpu'] , resolve),
      redirect: '/gpu/highStabilityAITrain',
      children: [
        {
          meta: {
            menuIndex: 0
          },
          path: 'list',
          component: resolve => require(['./views/gpu/list'] , resolve)
        },
        {
          meta: {
            menuIndex: 1
          },
          path: 'highStabilityAITrain',
          component: resolve => require(['./views/gpu/highStabilityAITrain'] , resolve)
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'aiInference',
          component: resolve => require(['./views/gpu/aiInference'] , resolve)
        },
        {
          meta: {
            menuIndex: 3
          },
          path: 'hashCompute',
          component: resolve => require(['./views/gpu/hashCompute'] , resolve)
        },
        {
          meta: {
            menuIndex: 4
          },
          path: 'superNodeCompute',
          component: resolve => require(['./views/gpu/superNodeCompute'] , resolve)
        }
      ]
    },
    {
      path: '/virtual',
      name: 'virtual',
      component: resolve => require(['./views/virtual'] , resolve),
    },
    {
      path: '/miner',
      name: 'miner',
      component: resolve => require(['./views/miner'] , resolve),
      redirect: '/miner/myMinerMachine',
      children: [
        {
          name: 'myMinerMachine',
          meta: {
            menuIndex: 0
          },
          path: 'myMinerMachine',
          component: resolve => require(['./views/miner/myMinerMachine'] , resolve)
        },
        {
          name: 'myMinerMachine_unlock',
          meta: {
            menuIndex: 0
          },
          path: 'myMinerMachine_unlock',
          component: resolve => require(['./views/miner/myMinerMachine_unlock'] , resolve)
        }
      ]
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


    {
      path: '/mymachine',
      name: 'mymachine',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['./views/mymachine'] , resolve),
      redirect: '/mymachine/myMachine',
      children: [{
          meta: {
            menuIndex: 0
          },
          path: 'myMachine',
          component: resolve => require(['./views/mymachine/myMachine'] , resolve)
        },
        {
          meta: {
            menuIndex: 1
          },
          path: 'myMachine_cpu',
          component: resolve => require(['./views/mymachine/myMachine_cpu'] , resolve)
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'myMachine_stopped',
          component: resolve => require(['./views/mymachine/myMachine_stopped'] , resolve)
        },
        {
          meta: {
            menuIndex: 3
          },
          path: 'myMachine_gpuVirtual',
          component: resolve => require(['./views/mymachine/myMachine_gpuVirtual'] , resolve)
        },
        {
          meta: {
            menuIndex: 0
          },
          path: 'myMachineUnlock',
          component: resolve => require(['./views/mymachine/myMachine_unlock'] , resolve)
        },
        {
          meta: {
            menuIndex: 1
          },
          path: 'myMachineUnlockCPU',
          component: resolve => require(['./views/mymachine/myMachine_unlock_cpu'] , resolve)
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'myMachineUnlockStopped',
          component: resolve => require(['./views/mymachine/myMachine_unlock_stopped'] , resolve)
        },
        {
          meta: {
            menuIndex: 3
          },
          path: 'myMachineUnlockGpuVirtual',
          component: resolve => require(['./views/mymachine/myMachine_unlock_gpuVirtual'] , resolve)
        },
      ]
    },
    {
      path: '/mywallet',
      name: 'mywallet',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['./views/mywallet'] , resolve),
      redirect: '/mywallet/myWallet',
      children: [
        {
          meta: {
            menuIndex: 0
          },
          path: 'myWallet',
          component: resolve => require(['./views/mywallet/myWallet'] , resolve)
        },
        {
          meta: {
            menuIndex: 0
          },
          path: 'myWalletUnlock',
          component: resolve => require(['./views/mywallet/myWallet_unlock'] , resolve)
        }
      ]
    },
    {
      path: '/help',
      name: 'help',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['./views/help'] , resolve),
      redirect: '/help/aiHelp',
      children: [{
          meta: {
            menuIndex: 0
          },
          path: 'aiHelp',
          component: resolve => require(['./views/help/aiHelp'] , resolve)
        },

        {
          meta: {
            menuIndex: 1
          },
          path: 'filecoinHelp',
          component: resolve => require(['./views/help/filecoinHelp'] , resolve)
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'supernodeHelp',
          component: resolve => require(['./views/help/supernodeHelp'] , resolve)
        }
      ]
    },
    /*{
      path: '/miner',
      name: 'miner',
      component: resolve => require(['./views/miner'] , resolve),
      redirect: '/miner/myMinerMachine',
      children: [{
          meta: {
            menuIndex: 0
          },
          path: 'myMinerMachine',
          component: resolve => require(['./views/miner/myMinerMachine'] , resolve)
        },
        {
          meta: {
            menuIndex: 0
          },
          path: 'myMinerMachine_unlock',
          component: resolve => require(['./views/miner/myMinerMachine_unlock'] , resolve)
        }
      ]
    },*/
    {
      path: '/continuePayDetail',
      name: 'continuePayDetail',

      component: resolve => require(['./views/continuePayDetail'] , resolve)
    },
    {
      path: '/machineDetail',
      name: 'machineDetail',
      component: resolve => require(['./views/machineDetail'] , resolve)
    },
    {
      path: '/createWallet/:type',
      name: 'createWallet',
      component: resolve => require(['./views/createWallet/index.vue'] , resolve)
    },
    {
      path: '/openWallet/:type',
      name: 'openWallet',
      component: resolve => require(['./views/openWallet/index.vue'] , resolve)
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
    },
    {
      path: '/minerHome',
      name: 'minerHome',
      component: resolve => require(['./views/minerHome'] , resolve)
    },
    {
      path: '/addMc',
      name: 'miner_addMc',
      component: resolve => require(['./views/miner/addMachine'] , resolve)
    },
    {
      path: '/editMc',
      name: 'miner_editMc',
      component: resolve => require(['./views/miner/addMachine'] , resolve)
    },
    {
      path: '/machineOrder',
      name: 'machineOrder',
      component: resolve => require(['./views/machineOrder'] , resolve)
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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
    }
  ]
})

/*router.beforeEach((to, from, toStep2) => {
})*/

export default router
