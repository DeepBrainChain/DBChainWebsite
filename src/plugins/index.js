import {loadLanguageAsync} from '../setup'
import cookie from 'js-cookie'

export default function install(Vue, options) {

  Vue.prototype.$loadLanguageAsync = loadLanguageAsync
  Vue.prototype.$isSupportFileApi = function () {
    if (window.File && window.FileList && window.FileReader && window.Blob) {
      return true;
    }
    return false;
  }
  Vue.prototype.$getAddressFromCookie = function () {
    return cookie.get('address') || false
  }
  Vue.prototype.$isCn = function () {
    var language = (navigator.browserLanguage || navigator.language).toLowerCase();
    if (language.indexOf('zh') > -1) {
      return true
    } else if (language.indexOf('en') > -1) {
      // 英文
      return false
    } else {
      // 其他
      return false
    }
  }
  Vue.prototype.$thousandsNum = function (s) {
    let numInt = s.toString().split('.')[0]
    let numDym = s.toString().split('.')[1] || '0'
    const intStr = numInt.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    const dymStr = numDym * 1 !== 0 ? `.${numDym}` : ''
    return intStr + dymStr
  }
}
