<!-- HTML -->
<template>
  <div class="category">
    <!-- 左边list -->
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
        :scroll="true"
        @scroll="onScroll"
        ref="wrapperList"
      >
        <ul>
          <li v-for="(items, i) in goods" :key="i" class="scroll_top_hook">
            <h5>{{ items.typeName }}</h5>
            <section>
              <div v-for="(item, j) in items.categoryLogicVOList" :key="j">
                <div class="img_container">
                  <!-- 此处图片地址 403 -->
                  <img v-if="false" :src="item.img" alt="" />
                  <img v-else src="../assets/1.png" alt="" />
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
  width: 184px;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #f4f4f4;
  ul {
    width: 100%;
    li {
      height: 100px;
      line-height: 100px;
      font-size: 28px;
      color: #212121;
      position: relative;
      span {
        display: block;
        margin: 0 4px 0 44px;
      }
    }
    .active {
      background-color: #fff;
    }
    .active::before {
      position: absolute;
      display: block;
      content: "";
      top: 36px;
      left: 24px;
      width: 4px;
      height: 28px;
      background: #fb7299;
      border-radius: 1px;
    }
  }
}
menu {
  flex: 1;
  padding: 0 24px;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #fff;
  h5 {
    font-size: 28px;
    line-height: 24px;
    padding: 36px 0;
  }
  section {
    width: 100%;
    overflow: hidden;
    & > div {
      float: left;
      width: (100%/3);
    }
    .img_container {
      position: relative;
      padding-top: 100%;
      overflow: hidden;
      height: 156px;
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
      margin: 12px 0;
      text-align: center;
      font-size: 24px;
      height: 50px;
      color: #999;
    }
  }
}
</style>
