import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import {
  i18n
} from './setup'
import plugins from './plugins'
import './assets/css/normalize.scss'
import './assets/css/common.scss'
import './assets/css/main.scss'
// import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(plugins)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
