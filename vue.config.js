console.log(process.env.NODE_ENV);
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/DBC_GPU' : '/',
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // configureWebpack: {
  //   devtool: "source-map",
  // },
  configureWebpack: config => {
    let optimization = {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 20000, // 依赖包超过20000bit将被单独打包
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                        return `npm.${packageName.replace('@', '')}`
                    }
                }
            }
        },

        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: false, // console
                        drop_debugger: false,
                        pure_funcs: ["console.log"] // 移除console
                    },
                    warnings: false,
                },
                sourceMap: false,//是否生成map文件
                parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
            })
        ],
    };
    //开启gzip
    config.plugins = [
        ...config.plugins,
        new CompressionPlugin({
            test: /\.js$|\.html$|.\css/, //匹配文件名
            threshold: 1024 * 10, //对超过10k的数据压缩
            deleteOriginalAssets: false //不删除源文件
        })
    ];
    
    Object.assign(config, {
        optimization
    })

  },
  pluginOptions: {
    i18n: {
      locale: "cn",
      fallbackLocale: "cn",
      localeDir: "locales",
      enableInSFC: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/css/variables.scss";'
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
      // "/binding_email_rent": {
      //   target: "https://info.dbchain.ai",
      //   ws: true,
      //   changeOrigin: true
      // },
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
      get_all_order_cpu: {
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
      },
      "/identifier": {
        target: "http://192.168.0.33:8080",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          // 路径重写
          "/identifier": "" // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
        }
      }
    }
  },
  lintOnSave: false
};
