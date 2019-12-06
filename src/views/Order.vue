<!-- HTML -->
<template>
  <div class="order">
    <nav ref="nav" :style="{ backgroundImage: image, transform: scale }"></nav>
    <menu :style="{ height: menuHeight }">
      <div class="img_container">
        <img src="../assets/3.png" alt="" />
      </div>
      <h5>Love葙逢</h5>
      <p>关注 1 <em>|</em> 粉丝 1</p>
      <ul class="use_label">
        <li>15后</li>
        <li>Lv.9</li>
        <li>上海</li>
        <li>狮子座</li>
      </ul>
    </menu>
    <!-- 背景模糊遮罩层 -->
    <div class="bg_layer" :style="{ transform: maxY }"></div>
    <!-- tab 滚动展示层 -->
    <Scroll
      class="tab_wrapper"
      :content="false"
      :probeType="3"
      :listenScroll="true"
      @scroll="onScroll"
      :style="{ top: tabHeight }"
    >
      <ol>
        <li v-for="(item, index) in 25" :key="index">
          <img src="../assets/item_title.png" alt="" />
          全部订单
        </li>
      </ol>
    </Scroll>
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Scroll from "components/scroll";

export default {
  data() {
    return {
      navHeight: 0,
      scrollY: 0,
      maxY: 0,
      scale: 0
    };
  },
  props: [],
  watch: {
    scrollY(newY, oldY) {
      // 预留头部高度
      let headerHeight = 50;
      // Math.max() 函数返回一组数中的最大值
      let maxY = Math.max(-this.navHeight + headerHeight, newY);
      this.maxY = `translate3d(0, ${maxY}px, 0)`;
      // 使用 v-bind:style, Vue.js 会自动侦测并添加相应的前缀。
      // this.$refs.layer.style["transform"] = `translate3d(0, ${maxY}px, 0)`;
      const percent = Math.abs(newY / this.navHeight);
      if (newY > 0) {
        // 下拉背景放大
        let scale = 1 + percent;
        this.scale = `scale(${scale})`;
      }
      if (newY < maxY) {
        // 判断滚动到了顶部
        this.$refs.nav.style["zIndex"] = 10;
        this.$refs.nav.style["paddingTop"] = 0;
        this.$refs.nav.style["height"] = `${headerHeight}px`;
      } else {
        // 还原
        this.$refs.nav.style["height"] = 0;
        this.$refs.nav.style["zIndex"] = 0;
        this.$refs.nav.style["paddingTop"] = "90%";
      }
    }
  },
  methods: {
    // 监听 scroll 事件
    onScroll(pos) {
      // console.log(pos);
      this.scrollY = pos.y;
    }
  },
  computed: {
    image() {
      let img = require("../assets/my_bgc.jpg");
      return `url(${img})`;
    },
    menuHeight() {
      return `${this.navHeight - 50}px`;
    },
    tabHeight() {
      return `${this.navHeight}px`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 获取 DOM 高度
      this.navHeight = this.$refs.nav.clientHeight;
    });
  },
  components: { Scroll }
};
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

.order {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
nav {
  position: relative;
  overflow: hidden;
  /*宽高比为10:9*/
  width: 100%;
  height: 0;
  padding-top: 90%;
  // background: url(../assets/my_bgc.jpg) no-repeat;
  background-repeat: no-repeat;
  background-size: cover;
  transform-origin: top;
}
menu {
  position: fixed;
  top: 50px;
  width: 100%;
  height: auto;
  padding: 24px;
  // background-color: rgba(0, 0, 0, 0.5);
  .img_container {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 100px;
    background-color: #fff;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  h5 {
    opacity: 0.8;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    line-height: 50px;
  }
  p {
    opacity: 0.8;
    color: #fff;
    font-size: 12px;
    & > em {
      display: inline-block;
      text-align: center;
      opacity: 0.5;
      width: 20px;
    }
  }
  .use_label {
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    li {
      opacity: 0.8;
      font-size: 12px;
      padding: 3px 12px;
      margin-right: 5px;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.3);
    }
    li:nth-child(2n-1) {
      background-color: rgba(255, 86, 134, 0.3);
    }
    li:nth-child(3n-1) {
      background-color: rgba(160, 59, 180, 0.3);
    }
    li:nth-child(4n-1) {
      background-color: rgba(36, 182, 145, 0.3);
    }
  }
}
.bg_layer {
  position: relative;
  // top: -20;
  // border-top-left-radius: 20px;
  // border-top-right-radius: 20px;
  height: 100%;
  background: #f4f4f4;
}
.tab_wrapper {
  position: fixed;
  top: 50px;
  bottom: 50px;
  height: auto;
  // overflow: hidden;
  // overflow-y: scroll;
  li {
    height: 50px;
    font-size: 15px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    position: relative;
    // background-color: #222;
    & > img {
      display: inline-block;
      margin-right: 15px;
      width: 30px;
    }
    &::after {
      transform: rotate(45deg);
      position: absolute;
      display: block;
      content: "";
      width: 8px;
      height: 8px;
      top: 21px;
      right: 15px;
      border-top: 2px solid #cbcbcb;
      border-right: 2px solid #cbcbcb;
    }
  }
}
</style>
