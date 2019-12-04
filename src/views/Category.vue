<!-- HTML -->
<template>
  <div class="category">
    <!-- 左边分类 -->
    <nav>
      <Scroll :data="goods">
        <ul>
          <li
            v-for="(item, index) in goods"
            :key="index"
            @click="selectMenu(index, $event)"
            :class="{ active: currentIndex === index }"
          >
            <span class="ellipsis_1">{{ item.typeName }}</span>
          </li>
        </ul>
      </Scroll>
    </nav>
    <!-- 右边商品 -->
    <menu>
      <Scroll
        :probeType="3"
        :data="goods"
        :listenScroll="true"
        @scroll="onScroll"
        ref="wrapperList"
      >
        <ul>
          <li v-for="(items, i) in goods" :key="i" class="scroll_top_hook">
            <h5>{{ items.typeName }}</h5>
            <section>
              <div v-for="(item, j) in items.categoryLogicVOList" :key="j">
                <div class="img_container">
                  <!-- <img src="../assets/1.png" alt="" /> -->
                  <img :src="item.img" alt="" />
                </div>
                <p class="ellipsis_2">{{ item.name }}</p>
              </div>
            </section>
          </li>
        </ul>
      </Scroll>
    </menu>
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Scroll from "components/scroll";
import JSONP from "@/jsonp";

export default {
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  props: [],
  watch: {},
  methods: {
    // 左边 选择跳转到对应的位置
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let wrapperList = this.$refs.wrapperList.$el.getElementsByClassName(
        "scroll_top_hook"
      );
      let el = wrapperList[index];
      this.$refs.wrapperList.scrollToElement(el, 300);
    },
    // 获取 DOM 计算右边的高度
    calculateHeight() {
      let wrapperList = this.$refs.wrapperList.$el.getElementsByClassName(
        "scroll_top_hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < wrapperList.length; i++) {
        let item = wrapperList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    // 监听 scroll 事件
    onScroll(pos) {
      this.scrollY = Math.abs(Math.round(pos.y));
    },
    // 接口数据
    category() {
      JSONP.category({
        shopId: 2233
      })
        .then(res => {
          const { code, data } = res.data;
          if (code === 0) {
            this.goods = data.vo;
            // 从新计算高度
            this.$nextTick(() => {
              this.calculateHeight();
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    // 计算选中的位置
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  mounted() {
    this.category();
    // 模拟方法
    // setTimeout(() => {
    //   this.$nextTick(() => {
    //     this.calculateHeight();
    //   });
    // }, 20);
  },
  components: { Scroll }
};
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

.category {
  width: 100%;
  height: 100%;
  display: flex;
}
nav {
  width: 92px;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #f4f4f4;
  ul {
    width: 100%;
    li {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      color: #212121;
      position: relative;
      span {
        display: block;
        margin: 0 2px 0 22px;
      }
    }
    .active {
      background-color: #fff;
    }
    .active::before {
      position: absolute;
      display: block;
      content: "";
      top: 18px;
      left: 12px;
      width: 2px;
      height: 14px;
      background: #fb7299;
      border-radius: 1px;
    }
  }
}
menu {
  flex: 1;
  padding: 0 12px;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #fff;
  h5 {
    font-size: 14px;
    line-height: 12px;
    padding: 18px 0;
  }
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    & > div {
      width: 30.33%;
    }
    // & > div {
    //   float: left;
    //   width: 30.33%;
    //   &:nth-child(3n-1) {
    //     margin: 0 (100-30.33)/3 + px;
    //   }
    // }
    .img_container {
      position: relative;
      padding-top: 100%;
      overflow: hidden;
      height: 78px;
      background: #eee url(../assets/picture_loading.svg) no-repeat 50%;
      background-size: 40px;
    }
    img {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    p {
      margin: 6px 0;
      text-align: center;
      font-size: 12px;
      height: 25px;
      color: #999;
    }
  }
}
</style>
