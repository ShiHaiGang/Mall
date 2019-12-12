<!-- HTML -->
<template>
  <div id="app">
    <!-- header -->
    <!-- <Header :title="title" :iconLift="iconLift" :iconRight="iconRight" /> -->
    <!-- content -->
    <!-- <section class="center"> -->
    <transition name="fade">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
    <!-- </section> -->
    <!-- footer -->
    <Footer />
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Header from "components/header.vue";
import Footer from "components/footer.vue";

export default {
  data() {
    return {
      title: "会员购",
      iconLift: false,
      iconRight: false
    };
  },
  props: [],
  watch: {
    // $route(to, from) {
    //   switch (true) {
    //     // 分类
    //     case to.path.includes("category"):
    //       this.title = "";
    //       this.iconLift = true;
    //       break;
    //     // 购物车
    //     case to.path.includes("cart"):
    //       this.title = "购物车";
    //       this.iconLift = true;
    //       break;
    //     // 订单
    //     case to.path.includes("order"):
    //       this.title = "订单";
    //       this.iconLift = true;
    //       break;
    //     // 会员购
    //     default:
    //       this.title = "会员购";
    //       this.iconLift = false;
    //       break;
    //   }
    // }
  },
  components: {
    Header,
    Footer
  }
};
</script>

<!-- SCSS -->
<style lang="scss">
@import "./style/index";

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
}
.fade-enter,
.fade-leave-active {
  transform: translate3d(100%, 0, 0);
}
#app {
  width: 100vw;
  height: 100vh;
}
.content {
  position: absolute;
  padding-top: 50px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow: hidden;
  overflow-y: scroll;
  // background-color: #f4f4f4;
}
</style>
