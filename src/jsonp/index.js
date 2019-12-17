import axios from "./axios";

/**
 * BaseApi.post 支持的配置
 * @param {string} url url
 * @param {object} body 请求参数
 */
export default {
  //首页
  index(params) {
    return axios.get({
      url: `/index`,
      body: params
    });
  },
  //分类
  category(params) {
    return axios.get({
      url: `/category/listV2`,
      body: params
    });
  },
  //城市
  city(params) {
    return axios.get({
      url: `/city/list`,
      body: params,
      city: true
    });
  }
};
