import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Vconsole from 'vconsole'
import {
  i18n
} from './setup'
import plugins from './plugins'
import './assets/css/normalize.scss'
import './assets/css/common.scss'
import './assets/css/main.scss'
import { getHref } from "@/utlis";
// import {sync} from "vuex-router-sync"
// import i18n from './i18n'
// new Vconsole()
Vue.config.productionTip = false
Vue.use(plugins)

import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)
// const unsync = sync(store, router)

// unsync()
router.beforeEach((to, from, next) => {
    if (to.meta?.title) {
      document.title = to.meta.title
    }
    store.commit("setMenuName", getHref(to.matched[0]?to.matched[0].path:to.path));
    next()
  }
)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
