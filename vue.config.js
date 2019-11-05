const path = require("path");
const isProd = process.env.NODE_ENV === "production";
const lastVersion = new Date().getTime();

const webpackConfig = {
  build: {
    openCDN: true,
    dnsPrefetch: ["https://www.baidu.com"],
    cdn: {
      css: ["https://cdn.jsdelivr.net/npm/vant@1.5/lib/index.css"],
      js: [
        "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
        "https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js",
        "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
        "https://cdn.bootcss.com/axios/0.18.0/axios.min.js"
      ]
    },
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      axios: "axios",
      "vue-router": "VueRouter"
    },
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ["js", "css"]
  },
  dev: {
    port: 8080,
    autoOpenBrowser: true,
    proxy: {
      // '/api': 'http://localhost:3000'
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: webpackConfig.build.productionSourceMap,
  lintOnSave: isProd, // 关闭开发 eslint 报错
  devServer: {
    open: webpackConfig.dev.autoOpenBrowser,
    port: webpackConfig.dev.port,
    proxy: webpackConfig.dev.proxy,
    overlay: {
      // 关闭报错提示
      warnings: false,
      errors: false
    }
  },
  css: {
    sourceMap: webpackConfig.dev.cssSourceMap,
    extract: !isProd
      ? false
      : {
          filename: `css/[name].${lastVersion}.[contenthash].css`
        }
  },
  // 配合 webpack > 链式操作
  configureWebpack: config => {
    if (isProd) {
      const task = require("./task");
      task.run(lastVersion);

      if (webpackConfig.build.openCDN) {
        config.externals = webpackConfig.build.externals;
      }

      if (webpackConfig.build.productionGzip) {
        const CompressionWebpackPlugin = require("compression-webpack-plugin");

        config.plugins.push(
          new CompressionWebpackPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: new RegExp(
              "\\.(" +
                webpackConfig.build.productionGzipExtensions.join("|") +
                ")$"
            ),
            threshold: 10240,
            minRatio: 0.8
          })
        );
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("public", resolve("src/public"))
      .set("plugins", resolve("src/plugins"));

    if (isProd) {
      // 删除懒加载模块
      config.plugins.delete("prefetch").delete("preload");
      // 清除警告
      config.performance.set("hints", false);
      // 将版本号写入环境变量
      config.plugin("define").tap(args => {
        args[0]["app_build_version"] = JSON.stringify(lastVersion);
        return args;
      });
      // js 增加版本号
      config.output
        .set("filename", `js/[name].${lastVersion}.[chunkhash].js`)
        .set("chunkFilename", `js/[id].${lastVersion}.[chunkhash].js`);

      if (webpackConfig.build.openCDN) {
        config.plugin("html").tap(args => {
          // 添加 CDN
          args[0].cdn = webpackConfig.build.cdn;
          // DNS 预加载
          args[0].dnsPrefetch = webpackConfig.build.dnsPrefetch;
          return args;
        });
      }
    }
  }
};
