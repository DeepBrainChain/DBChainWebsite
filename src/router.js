import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from "./congTuCloud/pages/home.vue";
import Login from "./congTuCloud/pages/login"
import Register from "./congTuCloud/pages/register"
import Preview from './views/preview'

Vue.use(Router)

//console.log(process.env.NODE_ENV)
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
      component: () => import('./views/network')
    },
    {
      path: '/gpu',
      name: 'gpu',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/gpu'),
      redirect: '/gpu/highStabilityAITrain',
      children: [{
          meta: {
            menuIndex: 0
          },
          path: 'list',
          component: () => import('./views/gpu/list')
        },

        {
          meta: {
            menuIndex: 1
          },
          path: 'highStabilityAITrain',
          component: () => import('./views/gpu/highStabilityAITrain')
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'aiInference',
          component: () => import('./views/gpu/aiInference')
        },
        {
          meta: {
            menuIndex: 3
          },
          path: 'hashCompute',
          component: () => import('./views/gpu/hashCompute')
        },
        {
          meta: {
            menuIndex: 4
          },
          path: 'superNodeCompute',
          component: () => import('./views/gpu/superNodeCompute')
        }
      ]
    },
    {
      path: '/miner',
      name: 'miner',
      component: () => import('./views/miner'),
      redirect: '/miner/myMinerMachine',
      children: [{
          meta: {
            menuIndex: 0
          },
          path: 'myMinerMachine',
          component: () => import('./views/miner/myMinerMachine')
        },
        {
          meta: {
            menuIndex: 0
          },
          path: 'myMinerMachine_unlock',
          component: () => import('./views/miner/myMinerMachine_unlock')
        }
      ]
    },
    {
      path: '/mymachine',
      name: 'mymachine',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/mymachine'),
      redirect: '/mymachine/myMachine',
      children: [{



          meta: {
            menuIndex: 0
          },
          path: 'myMachine',
          component: () => import('./views/mymachine/myMachine')
        },
        {
          meta: {
            menuIndex: 1
          },
          path: 'myMachine_cpu',
          component: () => import('./views/mymachine/myMachine_cpu')
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'myMachine_stopped',
          component: () => import('./views/mymachine/myMachine_stopped')
        },

        {
          meta: {
            menuIndex: 0
          },
          path: 'myMachineUnlock',
          component: () => import('./views/mymachine/myMachine_unlock')
        },
        {
          meta: {
            menuIndex: 1
          },
          path: 'myMachineUnlockCPU',
          component: () => import('./views/mymachine/myMachine_unlock_cpu')
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'myMachineUnlockStopped',
          component: () => import('./views/mymachine/myMachine_unlock_stopped')
        }

      ]
    },
    {
      path: '/mywallet',
      name: 'mywallet',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/mywallet'),
      redirect: '/mywallet/myWallet',
      children: [{
          meta: {
            menuIndex: 0
          },
          path: 'myWallet',
          component: () => import('./views/mywallet/myWallet')
        },
        {
          meta: {
            menuIndex: 0
          },
          path: 'myWalletUnlock',
          component: () => import('./views/mywallet/myWallet_unlock')
        }
      ]
    },
    {
      path: '/help',
      name: 'help',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/help'),
      redirect: '/help/aiHelp',
      children: [{
          meta: {
            menuIndex: 0
          },
          path: 'aiHelp',
          component: () => import('./views/help/aiHelp')
        },

        {
          meta: {
            menuIndex: 1
          },
          path: 'filecoinHelp',
          component: () => import('./views/help/filecoinHelp')
        },
        {
          meta: {
            menuIndex: 2
          },
          path: 'supernodeHelp',
          component: () => import('./views/help/supernodeHelp')
        }
      ]
    }, {
      path: '/miner',
      name: 'miner',
      component: () => import('./views/miner'),
      redirect: '/miner/myMinerMachine',
      children: [{
          meta: {
            menuIndex: 0
          },
          path: 'myMinerMachine',
          component: () => import('./views/miner/myMinerMachine')
        },
        {
          meta: {
            menuIndex: 0
          },
          path: 'myMinerMachine_unlock',
          component: () => import('./views/miner/myMinerMachine_unlock')
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

  ]
})

/*router.beforeEach((to, from, next) => {
})*/

export default router
