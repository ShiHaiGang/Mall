const Nodemailer = require('nodemailer')
const Router = require('koa-router')
const Redis = require('koa-redis')

const Email = require('../dbs/config')
const User = require('../dbs/models/users')
const Passport = require('../utils/passport')

const router = new Router()
const store = new Redis().client

// 添加 users 前缀
router.prefix('/users')

// 注册
router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body

  // 防止验证码无限有效
  if (code) {
    const saveCode = await store.hget(`nodemailer: ${username}`, 'code')
    const saveExpire = await store.hget(`nodemailer: ${username}`, 'expire')

    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请从新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }

  // 判断用户信息
  const user = await User.find({ username })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '该用户，已被注册'
    }
    return false
  }
  // 创建用户
  const nuser = await User.create({ username, password, email })
  // 检查是否成功写入数据库
  if (nuser) {
    ctx.body = {
      code: 200,
      msg: '注册成功',
      data: { username, email }
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '注册失败'
    }
  }
})

// 登陆
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: 'err'
      }
    } else if (user) {
      ctx.body = {
        code: 200 || status,
        msg: '登陆成功',
        data: { user }
      }
      // Passport中间件带的ctx.login (登陆动作)
      return ctx.login(user)
    } else {
      ctx.body = {
        code: 0,
        msg: '登陆成功',
        data: { info }
      }
    }
  })(ctx, next)
})

// 验证码
router.post('/verify', async (ctx, next) => {
  const { username, email } = ctx.request.body
  const saveExpire = await store.hget(`nodemailer: ${username}`, 'expire')

  if (!username) {
    ctx.body = {
      code: -1,
      msg: '请输入昵称'
    }
    return false
  }

  if (!email) {
    ctx.body = {
      code: -1,
      msg: '请输入邮箱'
    }
    return false
  }

  // 过期时间是否存在 时间超出了过期时间（限制恶意刷接口）
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }

  // create reusable transporter object using the default SMTP transport
  const transporter = Nodemailer.createTransport({
    host: Email.smtp.host,
    port: Email.smtp.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: Email.smtp.user, // generated ethereal user
      pass: Email.smtp.pass // generated ethereal password
    }
  })

  const info = {
    from: `'认证邮件' <${Email.smtp.user}>`, // sender address
    to: email, // list of receivers
    subject: '《高仿 bilibili 商城》注册码', // Subject line
    // text: 'Hello world?', // plain text body
    html: `您在《高仿 bilibili 商城》注册码，您的邀请码是${Email.smtp.code()}` // html body
  }

  // send mail with defined transport object
  await transporter.sendMail(info, (err, info) => {
    if (err) {
      // eslint-disable-next-line no-console
      return console.log(err)
    } else {
      store.hmset(
        `nodemail:${Email.smtp.user}`,
        'code',
        Email.smtp.code(),
        'expire',
        Email.smtp.expire(),
        'email',
        Email.smtp.email
      )
    }
  })

  ctx.body = {
    code: 0,
    msg: '验证码以发送，有效期1分钟'
  }
})

// 退出
router.get('/exit', async (ctx, next) => {
  await ctx.logout() // 注销
  // isAuthenticated 检测是否登陆状态
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 200,
      msg: '退出登陆'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '退出失败'
    }
  }
})

// 获取用户
router.get('/getUser', async (ctx, next) => {
  // isAuthenticated 判断用户是否登录，Passport内置的
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      code: 200,
      data: { username, email }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '无法获取'
    }
  }
})

module.exports = router
