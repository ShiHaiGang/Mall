import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  // base: "process.env.BASE_URL",
  routes: [
    {
      path: "",
      // 地址为空时跳转home页面
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/category",
      name: "category",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "category" */ "./views/Category.vue")
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import(/* webpackChunkName: "cart" */ "./views/Cart.vue")
    },
    {
      path: "/order",
      name: "order",
      component: () =>
        import(/* webpackChunkName: "order" */ "./views/Order.vue")
    },
    {
      path: "/address",
      name: "address",
      component: () =>
        import(/* webpackChunkName: "address" */ "./components/address.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/login.vue")
    }
  ]
});
