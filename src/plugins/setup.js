//setup.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '../locales/EN'
import axios from 'axios'
import {
  DatePicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Button,
  Container,
  Aside,
  Main,
  Slider,
  Radio,
  Dialog
} from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale: 'en', // 设置语言环境
  fallbackLocale: 'en',
  messages: {
    en
  }// 设置语言环境信息
})

// Vue.use(Button)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Slider)
Vue.use(Radio)
Vue.use(Dialog)
ElementLocale.i18n((key, value) => i18n.t(key, value))

const loadedLanguages = ['en'] // 我们的预装默认语言

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/locales/${lang}`).then(msgs => {
        console.log(i18n.getLocaleMessage("en"))
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
