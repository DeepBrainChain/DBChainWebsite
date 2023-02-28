import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { i18n } from './setup'
import plugins from './plugins'
import VueClipboard from 'vue-clipboard2'
import VueWechatTitle from 'vue-wechat-title'
import './assets/css/normalize.scss'
import './assets/css/common.scss'
import './assets/css/main.scss'
Vue.config.productionTip = false
Vue.use(plugins)
Vue.use(VueClipboard)
Vue.use(VueWechatTitle)
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  }

)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
