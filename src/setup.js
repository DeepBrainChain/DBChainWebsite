//setup.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from './locales/CN'
import axios from 'axios'
import 'muse-ui/lib/styles/base.less'
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
  Dialog,
  Card,
  Upload,
  RadioGroup,
  Message,
  Alert,
  Rate,
  Select,
  Option,
  Input,
  Calendar,
  ButtonGroup,
  TimePicker,
  Form,
  FormItem,
  Autocomplete,
  Tooltip
} from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'
import {
  TextField,
  Icon
} from "muse-ui"
import 'muse-ui/lib/styles/theme.less'

Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale: 'cn', // 设置语言环境
  fallbackLocale: 'cn',
  messages: {
    cn
  } // 设置语言环境信息
})

Vue.use(DatePicker)
Vue.use(TimePicker)
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
Vue.use(RadioGroup)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(Upload)
Vue.use(Alert)
Vue.use(Rate)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Calendar)
Vue.use(ButtonGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Autocomplete)
Vue.use(Tooltip)
Vue.component(Message)

Vue.use(TextField)
Vue.use(Icon)

Vue.prototype.$message = Message

ElementLocale.i18n((key, value) => i18n.t(key, value))

const loadedLanguages = ['CN'] // 我们的预装默认语言

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import( /* webpackChunkName: "lang-[request]" */ `@/locales/${lang}`).then(msgs => {
        console.log(i18n.getLocaleMessage("cn"))
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
