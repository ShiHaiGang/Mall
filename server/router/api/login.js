const Router = require('koa-router')
const router = new Router()

// router.prefix('/login')

router.get('/', (ctx) => {
  ctx.body = 'login'
})

router.get('/quickLogin', (ctx) => {
  ctx.body = 'quickLogin'
})

module.exports = router
