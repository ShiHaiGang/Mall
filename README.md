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

# 借鉴及参考
  > [koa-nuxt-mall](https://github.com/FinGet/koa-nuxt-mall)

  > [Nuxt-phone](https://github.com/Sandop/Nuxt-phone)

  > [nuxt-maopingshou](https://github.com/MontageD/nuxt-maopingshou)

  > [nuxt-elm](https://github.com/EasyTuan/nuxt-elm)

  > [nuxt-bnhcp](https://github.com/github1586/nuxt-bnhcp)

  > [nuxt-ssr-demo](https://github.com/xuqiang521/nuxt-ssr-demo)

  > [element](https://element.eleme.cn/#/zh-CN)
