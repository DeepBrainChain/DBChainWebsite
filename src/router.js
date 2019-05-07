import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  base: '/DBC_GPU',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/gpu',
      name: 'gpu',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/gpu/index.vue'),
      children: [
        {
          path: 'myWallet',
          component: () => import('./views/gpu/myWallet')
        },
        {
          path: 'machine',
          component: () => import('./views/gpu/machine')
        }
      ]
    },
    {
      name: 'createWallet',
      path: '/createWallet',
      component: () => import('./views/createWallet/index.vue')
    },
    {
      name: 'openWallet',
      path: '/openWallet',
      component: () => import('./views/openWallet/index.vue')
    },
    {
      name: 'trade',
      path: '/trade',
      component: () => import('./views/trade_io'),
      redirect: '/trade/home',
      children: [
        {
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
        }
      ]
    }
  ]
})
