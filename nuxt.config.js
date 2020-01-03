module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'referrer', content: 'no-referrer' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src:
          'https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/style/index'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/toast'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true // Can be also an object with default options
  },
  /*
   ** Proxy module configuration
   ** See https://zh.nuxtjs.org/faq/http-proxy
   */
  proxy: {
    '/api': {
      target: 'https://mall.bilibili.com/mall-c-search/home',
      pathRewrite: { '^/api': '' }
    },
    '/city': {
      target: 'https://show.bilibili.com/api/ticket',
      pathRewrite: { '^/city': '' }
    }
  },
  /**
   * Toast
   * See https://github.com/nuxt-community/modules/tree/master/packages/toast
   */
  toast: {
    position: 'top-center',
    duration: 2000
  },
  /*
   ** Router module configuration
   ** See https://zh.nuxtjs.org/api/configuration-router
   */
  router: {
    routeNameSplitter: '/',
    extendRoutes(routes, resolve) {
      routes.push({
        path: '',
        redirect: '/home'
      })
    }
  },
  /*
   ** Build configuration
   */
  build: {
    // See https://zh.nuxtjs.org/faq/postcss-plugins
    postcss: {
      // 添加插件名称作为键，参数作为值
      // 使用npm或yarn安装它们
      plugins: {
        // 通过传递 false 来禁用插件
        // 'postcss-url': false,
        // 'postcss-nested': {},
        // 'postcss-responsive-type': {},
        // 'postcss-hexrgba': {},
        // 'postcss-px2rem': { remUnit: 75 } // 转换基本单位
      },
      preset: {
        // 更改postcss-preset-env 设置
        autoprefixer: {
          grid: true
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      const path = require('path')

      if (ctx.isDev || ctx.isClient) {
        // 添加 alias 配置
        Object.assign(config.resolve.alias, {
          utils: path.resolve(__dirname, 'utils')
        })
      }
    }
  }
}
