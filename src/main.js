import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fastclick from "fastclick";

Vue.config.productionTip = false;
fastclick.attach(document.body);

// 全局的导航守卫
router.beforeEach((to, from, next) => {
  /* 必须调用 `next` */
  next();
});

router.beforeResolve((to, from, next) => {
  /* 必须调用 `next` */
  next();
});

router.afterEach((to, from) => {});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
