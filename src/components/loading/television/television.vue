<!-- HTML -->
<template>
  <transition name="television">
    <div class="television" v-if="visible"></div>
  </transition>
</template>

<!-- JS -->
<script type="text/javascript">
//import index from '@/index';

export default {
  data: function() {
    //数据初始化
    return {
      visible: false
    };
  },
  props: {},
  computed: {}
};
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

@keyframes refresh {
  0% {
    background-position: 0 -60px;
  }

  25% {
    background-position: 60px -60px;
  }

  50% {
    background-position: 120px -60px;
  }

  75% {
    background-position: 180px -60px;
  }

  to {
    background-position: 0 -60px;
  }
}
.television {
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  z-index: 999;
  position: fixed;
  text-align: center;
  transform: translate(-50%, -50%);
  background-image: url(./television.png);
  background-size: 240px 60px;
  animation: refresh 0.6s step-end 0s infinite both;
}
.television-enter,
.television-leave-active {
  opacity: 0;
  transition: opacity 0.2s linear;
}
</style>
