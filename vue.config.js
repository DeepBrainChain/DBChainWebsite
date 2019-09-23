console.log(process.env.NODE_ENV);
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/DBC_GPU' : '/',
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  configureWebpack: {
    devtool: "source-map"
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "cn",
      localeDir: "locales",
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
    //  https: true,
    port: 9999,
    proxy: {
      "/api/main_net": {
        target: "https://api.neoscan.io",
        ws: true,
        changeOrigin: true
      },
      "/binding_email_rent": {
        target: "https://info.dbchain.ai",
        ws: true,
        changeOrigin: true
      },
      query_all_machines: {
        target: "https://info.dbchain.ai",
        ws: true,
        changeOrigin: true
      },
      rent: {
        target: "https://info.dbchain.ai",
        ws: true,
        changeOrigin: true
      },
      try_rent: {
        target: "https://info.dbchain.ai",
        ws: true,
        changeOrigin: true
      },
      query_machine_by_wallet: {
        target: "https://info.dbchain.ai",
        ws: true,
        changeOrigin: true
      },
      get_all_order: {
        target: "https://info.dbchain.ai",
        ws: true,
        changeOrigin: true
      },
      "/rentout": {
        target: "https://info.dbchain.ai",
        ws: true,
        changeOrigin: true
      },
      query_machine_by_id: {
        target: "https://info.dbchain.ai",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
