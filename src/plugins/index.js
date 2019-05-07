import {loadLanguageAsync,i18n} from './setup'

export default function install (Vue, options) {
  Vue.prototype.$loadLanguageAsync = loadLanguageAsync
}
