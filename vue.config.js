console.log(process.env.NODE_ENV)
// const proxyHost = 'http://13.124.237.200:8031
const proxyHost = 'http://116.85.24.172:8031'
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/DBC_GPU' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  pluginOptions: {
    i18n: {
      locale: 'cn',
      fallbackLocale: 'cn',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/css/variables.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/api/main_net': {
        target: 'https://api.neoscan.io',
        ws: true,
        changeOrigin: true
      },
      '/binding_email_rent': {
        target: proxyHost,
        ws: true,
        changeOrigin: true
      },
      'query_all_machines': {
        target: proxyHost,
        ws: true,
        changeOrigin: true
      },
      'rent': {
        target: proxyHost,
        ws: true,
        changeOrigin: true
      },
      'try_rent': {
        target: proxyHost,
        ws: true,
        changeOrigin: true
      },
      'query_machine_by_wallet': {
        target: proxyHost,
        ws: true,
        changeOrigin: true
      },
      'get_all_order': {
        target: proxyHost,
        ws: true,
        changeOrigin: true
      }
    }
  }
}
