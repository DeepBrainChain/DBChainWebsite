console.log(process.env.NODE_ENV)
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/DBC_GPU' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data:'@import "@/assets/css/variables.scss";'
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
    }
  }
}
