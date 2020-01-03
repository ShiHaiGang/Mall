import axios from './axios'

/**
 * BaseApi.post 支持的配置
 * @param {string} url url
 * @param {object} body 请求参数
 */
export default {
  // 注册
  signup(params) {
    return axios.post({
      url: `/users/signup`,
      body: params
    })
  },
  // 登陆
  signin(params) {
    return axios.post({
      url: `/users/signin`,
      body: params
    })
  },
  // 验证
  verify(params) {
    return axios.post({
      url: `/users/verify`,
      body: params
    })
  },
  // 退出
  exit(params) {
    return axios.get({
      url: `/users/exit`,
      body: params
    })
  },
  // 获取用户信息
  getUser(params) {
    return axios.get({
      url: `/users/getUser`,
      body: params
    })
  },
  // 首页
  index(params) {
    return axios.get({
      url: `/index`,
      body: params,
      type: 'api'
    })
  },
  // 分类
  category(params) {
    return axios.get({
      url: `/category/listV2`,
      body: params,
      type: 'api'
    })
  },
  // 城市
  city(params) {
    return axios.get({
      url: `/city/list`,
      body: params,
      type: 'city'
    })
  },
  // 搜索
  search(params) {
    return axios.get({
      url: `/sug`,
      body: params,
      type: 'api'
    })
  }
}
