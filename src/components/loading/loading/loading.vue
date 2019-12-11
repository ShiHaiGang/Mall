<!-- HTML -->
<template>
  <transition name="mint-indicator">
    <div class="loading" v-if="visible">
      <img src="./loading.svg" height="60" width="60" />
      <p class="desc">{{ text }}</p>
    </div>
  </transition>
</template>

<!-- JS -->
<script type="text/javascript">
// ecmascript-6

export default {
  data: function() {
    //数据初始化
    return {
      visible: false
    };
  },
  props: {
    //接收父组件数据
    text: {
      type: String,
      default: "正在载入..."
    }
  },
  computed: {
    //计算属性
    LoadingType() {}
  }
};
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
    font-size: 15px;
    line-height: 20px;
  }
}
.mint-indicator-enter,
.mint-indicator-leave-active {
  opacity: 0;
  transition: opacity 0.2s linear;
}
</style>
