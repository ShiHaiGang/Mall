<!-- HTML -->
<template>
  <div class="content">
    <Header :title="'订单'" style="background: none" />
    <!-- 背景图片 -->
    <nav
      ref="nav"
      :style="{ backgroundImage: image, transform: maxYScale, zIndex: layer }"
    ></nav>
    <!-- Tab bar 吸顶效果 -->
    <TabBar :data="tabArr" :show="tabBar" @active="active" class="fixed" />
    <!-- Tab 滚动展示层 -->
    <Scroll
      :probeType="3"
      :listenScroll="true"
      @scroll="onScroll"
      class="wrapper"
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
        <li v-for="(item, index) in productList" :key="index">
          <div class="item_header"><i>会员购</i> 已经交定金 ¥666</div>
          <section class="item_content border_top_1px border_bottom_1px">
            <!-- 图片信息 -->
            <div class="item_img">
              <img :src="item.productImg" alt="" />
            </div>
            <!-- 商品信息 -->
            <div class="item_info">
              <p class="item_name ellipsis_2">
                {{ item.productName }}
              </p>
              <p class="item_spec ellipsis_1">{{ item.brandName }}</p>
            </div>
          </section>
          <div class="item_footer">1 件商品 合计：¥<i>520</i></div>
        </li>
      </ol>
    </Scroll>
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Header from '@/components/header.vue'
import Scroll from '@/components/scroll'
import TabBar from '@/components/tabBar'

// 预留头部高度
const headerHeight = 50
// 提高20px的圆角
const borderTopRadius = 20

export default {
  components: { Header, TabBar, Scroll },
  props: [],
  data() {
    return {
      navHeight: 0,
      scrollY: 0,
      maxYScale: 0,
      tabBar: false,
      tabArr: [{ title: '待付款' }, { title: '待收货' }, { title: '待评价' }],
      currentIndex: 0,
      productList: [
        {
          brandName: 'FILA（斐乐）', // 品牌名称
          count: '5', // 购买数量
          productId: '51', // 商品编号
          cartId: '46', // 购物车编号
          productImg:
            'http://img10.360buyimg.com/n1/s150x150_jfs/t9310/181/142446836/274178/c7a0a21c/59a19e93N69043e8a.jpg', // 商品图片
          stock: '520', // 库存
          orgPrice: '200', // 商品原始价
          productName:
            '2017W系列 女外套高圆圆同款秋季新款长款棒球服外套女|26733772 传奇蓝-NV 165/84A(M)', // 商品名称
          productPrice: '520', // 商品单价
          attrList: [
            // 商品sku数组
            {
              attrName: '颜色', // sku名称
              attrVal: '黄色' // 商品sku值
            },
            {
              attrName: '尺码',
              attrVal: 'L'
            }
          ]
        }
      ] // 商品信息数组
    }
  },
  computed: {
    layer() {
      return this.tabBar ? 2 : ''
    },
    image() {
      const img = require('../assets/my_bgc.jpg')
      return `url(${img})`
    },
    menuHeight() {
      return `${this.navHeight - headerHeight - borderTopRadius}px`
    }
  },
  watch: {
    scrollY(newY, oldY) {
      // 上推背景 减小
      /* eslint-disable-next-line */
      let maxY = Math.max(-this.navHeight + headerHeight + borderTopRadius, newY);
      this.maxYScale = `translate3d(0, ${maxY}px, 0)`
      // 下拉背景 放大
      const percent = Math.abs(newY / this.navHeight)
      if (newY > 0) {
        const scale = 1 + percent
        this.maxYScale = `scale(${scale})`
      }
      // Tab 吸顶效果
      const menuHeight = +this.menuHeight.slice(0, -2)
      this.tabBar = newY <= -menuHeight
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 获取 DOM 高度
      this.navHeight = this.$refs.nav.clientHeight
    })
  },
  methods: {
    active(index) {
      // eslint-disable-next-line no-console
      console.log(index)
      // this.currentIndex = index;
    },
    // 监听 scroll 事件
    onScroll(pos) {
      // console.log(pos);
      this.scrollY = pos.y
    }
  }
}
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

.content {
  padding-top: 0;
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
    content: '';
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
.fixed {
  position: absolute;
  width: 100%;
  z-index: 5;
  top: 50px;
}
.use_tab {
  color: #666;
  // background-color: rgb(35, 34, 38);
  li {
    // padding: 16px;
    padding-left: 16px;
    background: #fff;
    margin-bottom: 16px;
  }
  .item_header,
  .item_footer {
    color: #000;
    font-size: 13px;
    text-align: right;
    padding-right: 16px;
  }
  .item_header {
    color: #fb7299;
    line-height: 40px;
    & > i {
      float: left;
      color: #000;
    }
  }
  .item_content {
    display: flex;
    padding: 16px;
    padding-left: 0;
    .item_img {
      width: 80px;
      height: 80px;
      background-color: rgb(223, 85, 228);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .item_info {
      flex: 1;
      margin-left: 8px;
      position: relative;
      .item_name {
        font-size: 14px;
        margin-bottom: 8px;
      }
      .item_spec {
        font-size: 12px;
      }
    }
  }
  .item_footer {
    line-height: 50px;
    & > i {
      font-size: 15px;
    }
  }
}
</style>
