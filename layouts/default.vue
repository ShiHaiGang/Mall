<!-- HTML -->
<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <nuxt />
      </keep-alive>
    </transition>
    <!-- footer -->
    <Footer />
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Footer from '@/components/footer.vue'

export default {
  components: { Footer },
  props: [],
  watch: {},
  head() {
    return {
      title: '会员购'
    }
  },
  mounted() {
    if (process.browser) {
      if ('addEventListener' in document) {
        document.addEventListener(
          'DOMContentLoaded',
          function() {
            // eslint-disable-next-line no-undef
            FastClick.attach(document.body)
          },
          false
        )
      }
      if (!window.Promise) {
        document.writeln(
          `<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"><script>`
        )
      }
    }
  }
}
</script>

<!-- SCSS -->
<style lang="scss">
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
