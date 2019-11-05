/**
 * 环境接口地址配置
 * deve 开发接口
 * prod 生产接口
 */

export default {
  deve: {
    api: "https://test.xxxx.com/api",
    socket: "wss://test.xyztree.com/socket"
  },
  prod: {
    api: "https://api.xxxx.com",
    socket: "wss://api.xxxx.com/socket"
  }
};
