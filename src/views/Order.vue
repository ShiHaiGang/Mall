<!-- HTML -->
<template>
  <div class="order">
    <!-- 背景图片 -->
    <nav
      ref="nav"
      :style="{ backgroundImage: image, transform: maxYScale, zIndex: layer }"
    ></nav>
    <!-- Tab bar 吸顶效果 -->
    <TabBar class="fixed" :data="tabArr" :show="tabBar" @active="active" />
    <!-- Tab 滚动展示层 -->
    <Scroll
      class="wrapper"
      :probeType="3"
      :listenScroll="true"
      @scroll="onScroll"
    >
      <!-- 用户信息 -->
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
      <!-- Tab bar -->
      <TabBar :data="tabArr" @active="active" />
      <!-- 订单中心 -->
      <ol class="use_tab">
        <!-- 数据列表 -->
        <li v-for="(item, index) in 15" :key="index">
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
import TabBar from "components/tabBar";

// 预留头部高度
const headerHeight = 50;
// 提高20px的圆角
const borderTopRadius = 20;

export default {
  data() {
    return {
      navHeight: 0,
      scrollY: 0,
      maxYScale: 0,
      tabBar: false,
      tabArr: [{ title: "待付款" }, { title: "待收货" }, { title: "待评价" }],
      currentIndex: 0
    };
  },
  props: [],
  watch: {
    scrollY(newY, oldY) {
      // 上推背景 减小
      /* eslint-disable-next-line */
      let maxY = Math.max(-this.navHeight + headerHeight + borderTopRadius, newY);
      this.maxYScale = `translate3d(0, ${maxY}px, 0)`;
      // 下拉背景 放大
      const percent = Math.abs(newY / this.navHeight);
      if (newY > 0) {
        let scale = 1 + percent;
        this.maxYScale = `scale(${scale})`;
      }
      // Tab 吸顶效果
      const menuHeight = +this.menuHeight.slice(0, -2);
      this.tabBar = newY <= -menuHeight;
    }
  },
  methods: {
    active(index) {
      console.log(index);
      // this.currentIndex = index;
    },
    // 监听 scroll 事件
    onScroll(pos) {
      // console.log(pos);
      this.scrollY = pos.y;
    }
  },
  computed: {
    layer() {
      return this.tabBar ? 2 : "";
    },
    image() {
      let img = require("../assets/my_bgc.jpg");
      return `url(${img})`;
    },
    menuHeight() {
      return `${this.navHeight - headerHeight - borderTopRadius}px`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 获取 DOM 高度
      this.navHeight = this.$refs.nav.clientHeight;
    });
  },
  components: { TabBar, Scroll }
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
  /*宽高比为10:8*/
  width: 100%;
  height: 0;
  z-index: -1;
  padding-top: 80%;
  // background: url(../assets/my_bgc.jpg) no-repeat;
  background-repeat: no-repeat;
  background-size: cover;
  transform-origin: top;
  // 背景遮光层
  &::before {
    position: absolute;
    display: block;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.25);
  }
}
.wrapper {
  position: absolute;
  top: 50px;
  bottom: 0;
  height: auto;
  overflow: hidden;
}
menu {
  width: 100%;
  padding: 24px;
  color: #fff;
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
    // opacity: 0.8;
    font-size: 20px;
    font-weight: 500;
    line-height: 50px;
  }
  p {
    // opacity: 0.8;
    font-size: 12px;
    & > em {
      display: inline-block;
      text-align: center;
      opacity: 0.8;
      width: 20px;
    }
  }
  .use_label {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    li {
      // opacity: 0.8;
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
hgroup {
  display: flex;
  color: #cbcbcb;
  padding: 10px 20px;
  text-align: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: rgb(35, 34, 38);
  h6 {
    flex: 1;
    position: relative;
  }
  h6:nth-child(2) {
    flex: 2;
  }
  .active::before {
    position: absolute;
    content: "";
    width: 60px;
    height: 2px;
    bottom: -9px;
    border-radius: 5px;
    transform: translateX(-10%);
    background-color: #fb7299;
  }
}
.fixed {
  position: absolute;
  width: 100%;
  z-index: 5;
  top: 50px;
}
.use_tab {
  color: #cbcbcb;
  background-color: rgb(35, 34, 38);
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
