console.log(process.env.NODE_ENV)
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/DBC_GPU' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  configureWebpack: {
    devtool: 'source-map'
  },
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
        target: 'http://116.85.24.172:8031',
        ws: true,
        changeOrigin: true
      },
      'query_all_machines': {
        target: 'http://116.85.24.172:8031',
        ws: true,
        changeOrigin: true
      },
      'rent': {
        target: 'http://116.85.24.172:8031',
        ws: true,
        changeOrigin: true
      },
      'try_rent': {
        target: 'http://116.85.24.172:8031',
        ws: true,
        changeOrigin: true
      },
      'query_machine_by_wallet': {
        target: 'http://116.85.24.172:8031',
        ws: true,
        changeOrigin: true
      },
      'get_all_order': {
        target: 'http://116.85.24.172:8031',
        ws: true,
        changeOrigin: true
      },
      '/rentout': {
        target: 'http://116.85.24.172:8031',
        ws: true,
        changeOrigin: true
      },
      'query_machine_by_id': {
        target: 'http://116.85.24.172:8031',
        ws: true,
        changeOrigin: true
      },
      'onebox': {
        target: 'http://op.juhe.cn/',
        ws: true,
        changeOrigin: true
      },
    }
  }
}
