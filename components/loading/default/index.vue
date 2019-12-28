<!-- HTML -->
<template>
  <transition name="loading">
    <div v-if="visible" class="loading">
      <img src="./default.svg" height="60" width="60" />
      <p class="desc">{{ text }}</p>
    </div>
  </transition>
</template>

<!-- JS -->
<script type="text/javascript">
// import index from '@/index';

export default {
  props: {
    // 接收父组件数据
    text: {
      type: String,
      default: '正在载入...'
    }
  },
  data() {
    // 数据初始化
    return {
      visible: false
    }
  },
  computed: {
    // 计算属性
    // LoadingType() {}
  }
}
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

.loading {
  top: 50%;
  left: 50%;
  z-index: 999;
  position: fixed;
  text-align: center;
  transform: translate(-50%, -50%);

  .desc {
    font-size: 12px;
    line-height: 20px;
  }
}
.loading-enter,
.loading-leave-active {
  opacity: 0;
  transition: opacity 0.2s linear;
}
</style>
