import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Preview from './views/preview'

Vue.use(Router)

console.log(process.env.NODE_ENV)
const router = new Router({
  // base: process.env.NODE_ENV === 'production' ? '/DBC_GPU' : '/',
  base: process.env.NODE_ENV === 'production' ? '/' : '/',

  mode: 'history',
  routes: [{
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
      path: '/network',
      name: 'network',
      component: () => import('./views/network')
    },
    {
      path: '/gpu',
      name: 'gpu',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/gpu'),
      redirect: '/gpu/myWallet',
      children: [{
          meta: {
            menuIndex: 0
          },
          path: 'myWallet',
          component: () => import('./views/gpu/myWallet')
        },
        {
          meta: {
            menuIndex: 0
          },
          path: 'myWalletUnlock',
          component: () => import('./views/gpu/myWallet_unlock')
        },

        {
          meta: {
            menuIndex: 1
          },
          path: 'myMachine',
          component: () => import('./views/gpu/myMachine')
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'myMachine_cpu',
          component: () => import('./views/gpu/myMachine_cpu')
        },
        {
          meta: {
            menuIndex: 3
          },
          path: 'myMachine_stopped',
          component: () => import('./views/gpu/myMachine_stopped')
        },
        {
          meta: {
            menuIndex: 4
          },
          path: 'list',
          component: () => import('./views/gpu/list')
        },
        {
          meta: {
            menuIndex: 1
          },
          path: 'myMachineUnlock',
          component: () => import('./views/gpu/myMachine_unlock')
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'myMachineUnlockCPU',
          component: () => import('./views/gpu/myMachine_unlock_cpu')
        },
        {
          meta: {
            menuIndex: 3
          },
          path: 'myMachineUnlockStopped',
          component: () => import('./views/gpu/myMachine_unlock_stopped')
        }

      ]
    },
    {
      path: '/miner',
      name: 'miner',
      component: () => import('./views/miner'),
      redirect: '/miner/myMachine',
      children: [{
          meta: {
            menuIndex: 0
          },
          path: 'myWallet',
          component: () => import('./views/gpu/myWallet')
        }, {
          meta: {
            menuIndex: 0
          },
          path: 'myWalletUnlock',
          component: () => import('./views/gpu/myWallet_unlock')
        },

        {
          meta: {
            menuIndex: 1
          },
          path: 'myMachine',
          component: () => import('./views/miner/myMachine')
        },
        {
          meta: {
            menuIndex: 1
          },
          path: 'myMachineUnlock',
          component: () => import('./views/miner/myMachine_unlock')
        }
      ]
    },
    {
      path: '/continuePayDetail',
      name: 'continuePayDetail',

      component: () => import('./views/continuePayDetail')
    },
    {
      path: '/machineDetail',
      name: 'machineDetail',
      component: () => import('./views/machineDetail')
    },
    {
      path: '/createWallet/:type',
      name: 'createWallet',
      component: () => import('./views/createWallet/index.vue')
    },
    {
      path: '/openWallet/:type',
      name: 'openWallet',
      component: () => import('./views/openWallet/index.vue')
    },
    {
      path: '/howBuy',
      name: 'howBuy',
      component: () => import('./views/help/howBuy'),
    },
    {
      path: '/howSell',
      name: 'howSell',
      component: () => import('./views/help/howSell'),
    },
    {
      path: '/minerHome',
      name: 'minerHome',
      component: () => import('./views/minerHome')
    },
    {
      path: '/addMc',
      name: 'miner_addMc',
      component: () => import('./views/miner/addMachine')
    },
    {
      path: '/editMc',
      name: 'miner_editMc',
      component: () => import('./views/miner/addMachine')
    },
    {
      path: '/machineOrder',
      name: 'machineOrder',
      component: () => import('./views/machineOrder')
    },
    {
      name: 'trade',
      path: '/trade',
      component: () => import('./views/trade_io'),
      redirect: '/trade/home',
      children: [{
          path: 'home',
          component: () => import('./views/trade_io/trade')
        },
        {
          path: 'buy_1',
          component: () => import('./views/trade_io/buy_1')
        },
        {
          path: 'buy_2',
          component: () => import('./views/trade_io/buy_2')
        },
        {
          path: 'buy_3',
          component: () => import('./views/trade_io/buy_3')
        },
        {
          path: 'buy_4',
          component: () => import('./views/trade_io/buy_4')
        }
      ]
    },
  ]
})

/*router.beforeEach((to, from, next) => {

})*/

export default router
