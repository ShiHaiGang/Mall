<!-- HTML -->
<template>
  <div id="app">
    <!-- header -->
    <Header />
    <!-- content -->
    <section class="center">
      <transition name="fade">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </section>
    <!-- footer -->
    <Footer />
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Header from "components/header.vue";
import Footer from "components/footer.vue";

export default {
  props: [],
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
.center {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #f4f4f4;
}
</style>
