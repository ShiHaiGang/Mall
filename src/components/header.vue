<!-- HTML -->
<template>
  <header>
    <i v-if="iconLeft" @click="iconLeftClick()" class="icon_left"></i>
    <div v-if="!title" class="search">
      <i class="icon_search"></i>
      <input type="search" />
    </div>
    <div
      v-else
      :class="[
        'title',
        { left_indent: iconLeft && !iconRight },
        { right_indent: !iconLeft && iconRight }
      ]"
    >
      {{ title }}
    </div>
    <i v-if="iconRight" @click="iconRightClick()" class="icon_right"></i>
  </header>
</template>

<!-- JS -->
<script type="text/javascript">
//import index from '@/index';

export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: " "
    },
    iconLeft: {
      type: Boolean,
      default: false
    },
    iconRight: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  methods: {
    iconLeftClick() {
      this.$emit("iconRightClick");
    },
    iconRightClick() {
      this.$emit("iconRightClick");
    }
  },
  computed: {},
  mounted() {},
  components: {}
};
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  background-color: #fb7299;
  // 布局
  color: #fff;
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  i {
    display: block;
    width: 28px;
    height: 28px;
    // background-color: yellow;
  }
  .search {
    flex: 1;
    height: 30px;
    margin: 0 10px;
    position: relative;
    padding: 0 15px 0 30px;
    border-radius: 25px;
    background-color: #fff;
    .icon_search {
      position: absolute;
      top: (30-16)/2 + px;
      left: 10px;
      width: 16px;
      height: 16px;
      background: url(../assets/search.png) no-repeat;
      background-size: 100%;
    }
    input[type="search"] {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .title {
    flex: 1;
    text-align: center;
  }
  .left_indent {
    text-indent: -28px;
  }
  .right_indent {
    text-indent: 28px;
  }
}
.icon_left {
  background: url(../assets/icon_left.png) no-repeat;
  background-size: 100%;
}
.icon_right {
  background: url(../assets/icon_right.png) no-repeat;
  background-size: 100%;
}
</style>
