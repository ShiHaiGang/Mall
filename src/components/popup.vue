<!-- HTML -->
<template>
  <transition name="popup-fade">
    <div v-show="visible" @click="$emit('click', this)" class="popup-bg">
      <transition name="popup-slide-bottom">
        <section v-if="visible" class="popup-box"></section>
      </transition>
    </div>
  </transition>
</template>

<!-- JS -->
<script type="text/javascript">
// import index from '@/index';

export default {
  data() {
    return {};
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  methods: {},
  computed: {},
  mounted() {},
  components: {}
};
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

// 显示动画
// .fade-enter{}
// .fade-enter-active{}

// 隐藏动画
// .fade-leave-to{}
// .fade-leave-active{}

.popup-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  transition: opacity 0.3s;
  background: rgba(0, 0, 0, 0.6);
}

.popup-fade {
  &-enter,
  &-leave-active {
    opacity: 0;
  }
}

.popup-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  max-height: 70%;
  min-height: 30%;
  overflow-y: auto;
  background-color: #fff;
  transition: transform 0.3s;
  -webkit-overflow-scrolling: touch;
}

.popup-slide {
  &-bottom-enter,
  &-bottom-leave-active {
    transform: translate(0, 100%);
  }
}
</style>
