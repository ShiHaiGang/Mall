import Vue from "vue";
import loading from "./loading/loading.vue";

let instance;
const Loading = Vue.extend(loading);

export default {
  /**
   * 加载中插件
   * @param  {String} 提示文字
   * Loading.open(); 打开
   * Loading.close(); 关闭
   */
  open(param) {
    if (!instance) {
      // 创建 instance 实例，并挂载到一个元素上。
      instance = new Loading({
        el: document.createElement("div")
      });
    }
    instance.text = typeof param === "undefined" ? instance.text : param;
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
      instance.visible = true;
    });
  },

  close() {
    if (instance) {
      instance.visible = false;
    }
  }
};
