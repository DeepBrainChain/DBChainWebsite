console.log(process.env.NODE_ENV)
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/DBC_GPU/' : '/',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
