import axios from "axios";
import config from "./config";

// 接口环境
var BaseUrl = process.env.NODE_ENV === "production" ? config.prod : config.deve;

/**
 * POST接口封装
 * [head]
 * appId:       应用ID
 * version:     应用版本号
 */

export default {
  post(param = {}) {
    var head = {
      appId: param.head.appId || "1",
      version: param.head.version || "1.0.0"
    };
    return axios.post(`${BaseUrl.api}${param.url}`, {
      head: head || {},
      body: param.body || {}
      //   ...param.body
    });
  }
};
