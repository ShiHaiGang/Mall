<!-- HTML -->
<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
    <!-- footer -->
    <Footer />
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Footer from "components/footer.vue";

export default {
  props: [],
  watch: {},
  components: { Footer }
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
