const Fs = require('fs')
const Path = require('path')
const Koa = require('koa')
const Consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

/* ------------------ 自定义中间件 ------------------ */
const Session = require('koa-generic-session')
const BodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const Redis = require('koa-redis')
const Json = require('koa-json')
// 用户验证
const Passport = require('./utils/passport')
const Config = require('./dbs/config')
// 路由
const router = Fs.readdirSync(Path.join(__dirname, './router'))
// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:

/* ------------------ 自定义中间件 end ------------------ */

const app = new Koa()

/* ------------------ 自定义配置 ------------------ */
app.keys = ['keys', 'keykeys']
app.use(
  Session({
    key: 'Token',
    prefix: 'Token:uid',
    maxAge: 1000 /** (number) maxAge in ms (default is 1 days)，cookie的过期时间 */,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: true /** cookie是否只有服务器端可以访问 (boolean) httpOnly or not (default true) */,
    signed: true /** (boolean) signed or not (default true) */,
    store: new Redis() // 将session存入redis 不传options 默认就是连接127.0.0.1:6379
  })
)

// 配置 bodyParser
app.use(
  BodyParser({
    extendTypes: ['json', 'form', 'text']
  })
)

// 配置 json
app.use(Json())

// 链接数据库
mongoose.set('debug', true)
const uri = Config.dbs
mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection.on('disconnected', () => {
  // 中断从新连接
  mongoose.connect()
})
mongoose.connection.on('error', (err) => {
  // 输出一下错误信息
  // eslint-disable-next-line
  console.error(err)
})
mongoose.connection.on('open', () => {
  // 处理一些一步操作
  // eslint-disable-next-line
  console.log('\x1B[36m> MongoDB Server OK... \x1B[39m')
  // eslint-disable-next-line
  console.log('\x1B[46m> Listening at ' + uri + '\x1B[49m')
})
// 验证是否登陆
app.use(Passport.initialize())
app.use(Passport.session())
/* ------------------ 自定义配置 end ------------------ */

// Import and Set Nuxt.js options
// eslint-disable-next-line import/order
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // router file
  router
    // 过滤出.js文件
    .filter((file) => file.endsWith('.js'))
    // 处理每个js文件
    .forEach((file) => {
      const fileName = require(Path.join(__dirname, './router', file))
      app.use(fileName.routes(), fileName.allowedMethods())
    })

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  Consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
