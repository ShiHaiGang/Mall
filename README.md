# Nuxt-SSR

> My groundbreaking Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm run install

# mongodb
$ brew services start mongodb
$ brew services stop mongodb

# mongodb
$ brew services start redis
$ brew services stop redis

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

| Plugin | README |
| ------ | ------ |
| @nuxtjs/axios | ------ |
| @nuxtjs/proxy | ------ |
| @nuxtjs/toast | ------ |
| koa-bodyparser | ------ |
| koa-router | ------ |
| koa-json | ------ |
| koa-generic-session | ------ |
| koa-redis | ------ |
| koa-passport | ------ |
| passport-local | ------ |
| node-sass | ------ |
| sass-loader | ------ |
| mongoose | ------ |
| ------ | ------ |
| better-scroll | ------ |
| hammerjs | ------ |
| crypto-js | ------ |

```sh
  npm i @nuxtjs/proxy -D

  npm install -D node-sass sass-loader
```

# 目录结构
  ```
  Nuxt
  ├─ nuxt.config.js
  ├─ package-lock.json
  ├─ package.json
  ├─ pages
  │    ├─ README.md
  │    ├─ home.vue
  │    └─ index.vue
  ├─ plugins
  │    ├─ README.md
  │    ├─ axios.js
  │    └─ element-ui.js
  ├─ server
  │    ├─ .DS_Store
  │    ├─ dbs
  │    │    ├─ .DS_Store
  │    │    ├─ config.js
  │    │    └─ models
  │    ├─ index.js
  │    └─ routes
  │           ├─ .DS_Store
  │           └─ users.js
  ├─ static
  │    ├─ README.md
  │    └─ favicon.ico
  └─ store
        └─ README.md
  ```

`Nuxt` 扩展了Vue的生命周期，大概如下：
```js
export default {
  middleware () {}, //服务端
  validate () {}, // 服务端
  asyncData () {}, //服务端
  fetch () {}, // store数据加载
  beforeCreate () {  // 服务端和客户端都会执行,
  created () { // 服务端和客户端都会执行,
  beforeMount () {}, 
  mounted () {} // 客户端
}
```

`asyncData` 该方法是Nuxt最大的一个卖点，服务端渲染的能力就在这里，首次渲染时务必使用该方法。
asyncData会传进一个context参数，通过该参数可以获得一些信息，如：
```js
export default {
  asyncData (ctx) {
    ctx.app // 根实例
    ctx.route // 路由实例
    ctx.params  //路由参数
    ctx.query  // 路由问号后面的参数
    ctx.error   // 错误处理方法
  }
}
```

`ansycData` 的 `promise` 并发应用
```js
async asyncData(context) {
  const [a, b, c] = await Promise.all([
    axios.post(),
    axios.post(),
    axios.post()
  ])

  return {
    alist: a.data.XXX
    blist: b.data.XXX
    clist: c.data.XXX
  }
}
```

# 借鉴及参考
  > [koa-nuxt-mall](https://github.com/FinGet/koa-nuxt-mall)

  > [Nuxt-phone](https://github.com/Sandop/Nuxt-phone)

  > [nuxt-maopingshou](https://github.com/MontageD/nuxt-maopingshou)

  > [nuxt-elm](https://github.com/EasyTuan/nuxt-elm)

  > [nuxt-bnhcp](https://github.com/github1586/nuxt-bnhcp)

  > [nuxt-ssr-demo](https://github.com/xuqiang521/nuxt-ssr-demo)

  > [element](https://element.eleme.cn/#/zh-CN)
