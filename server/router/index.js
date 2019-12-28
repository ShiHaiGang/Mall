// 文件系统
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

const router = new Router()

// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
const files = fs.readdirSync(path.join(__dirname, './api'))

files
  // 过滤出.js文件
  .filter((file) => file.endsWith('.js'))
  // 处理每个js文件
  .forEach((file) => {
    const fileName = file.substr(0, file.length - 3)
    const fileEntity = require(path.join(__dirname, './api', file))
    if (fileName !== 'index') {
      router.use(
        `/${fileName}`,
        fileEntity.routes(),
        fileEntity.allowedMethods()
      )
    }
  })

module.exports = router
