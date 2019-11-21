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
        :listenScroll="true"
        @scroll="onScroll"
        ref="wrapperList"
      >
        <ul>
          <li v-for="(items, i) in goods" :key="i" class="scroll_top_hook">
            <h5>{{ items.typeName }}</h5>
            <section>
              <div v-for="(item, j) in items.categoryLogicVOList" :key="j">
                <img :src="item.img" alt="" />
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
//import index from '@/index';
import Scroll from "components/scroll";

export default {
  data() {
    return {
      goods: [
        {
          typeName: "手办",
          categoryLogicVOList: [
            {
              name: "比例手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/05/19/05191533c31dae2ada51c580349fb2c2.png@.jpg"
            },
            {
              name: "Q版手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "Q版手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "Q版手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "Q版手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "Q版手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "Q版手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "Q版手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "Q版手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "Q版手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "Q版手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "Q版手办",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            }
          ]
        },
        {
          typeName: "扭蛋潮玩",
          categoryLogicVOList: [
            {
              name: "魔力赏",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "潮元素",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "潮元素",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "潮元素",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "潮元素",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "潮元素",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "潮元素",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "潮元素",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            },
            {
              name: "潮元素",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/db/5c/db5c448fce0288db6bc67d6ab9e0838f.jpg@.jpg"
            }
          ]
        },
        {
          typeName: "模型",
          categoryLogicVOList: [
            {
              name: "高达拼装",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/6a/e5/6ae51554b4ab7c999d0153c23a221c52.png@.jpg"
            },
            {
              name: "寿屋拼装",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/68/56/68564da1f98c49bf37db5359e9b0f3da.png@.jpg"
            },
            {
              name: "寿屋拼装",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/68/56/68564da1f98c49bf37db5359e9b0f3da.png@.jpg"
            },
            {
              name: "寿屋拼装",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/68/56/68564da1f98c49bf37db5359e9b0f3da.png@.jpg"
            },
            {
              name: "寿屋拼装",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/68/56/68564da1f98c49bf37db5359e9b0f3da.png@.jpg"
            },
            {
              name: "寿屋拼装",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/68/56/68564da1f98c49bf37db5359e9b0f3da.png@.jpg"
            },
            {
              name: "寿屋拼装",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/68/56/68564da1f98c49bf37db5359e9b0f3da.png@.jpg"
            },
            {
              name: "寿屋拼装",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/68/56/68564da1f98c49bf37db5359e9b0f3da.png@.jpg"
            },
            {
              name: "寿屋拼装",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/68/56/68564da1f98c49bf37db5359e9b0f3da.png@.jpg"
            }
          ]
        },
        {
          typeName: "周边",
          categoryLogicVOList: [
            {
              name: "节日礼品",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/72/61/7261e629d80982d9aa5a20d74c523409.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            },
            {
              name: "服饰鞋靴",
              img:
                "https://i0.hdslb.com/bfs/mall/mall/0e/a8/0ea865a702506fddb223329b91f948d4.jpg@.jpg"
            }
          ]
        }
      ],
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
    _calculateHeight() {
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
    setTimeout(() => {
      this.$nextTick(() => {
        this._calculateHeight();
      });
    }, 20);
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
    // display: flex;
    // align-items: center;
    // justify-content: center;
    margin-bottom: 8%;
    & > div {
      // flex: 1;
      float: left;
      width: (100%/3);
    }
    img {
      width: 156px;
      height: 156px;
    }
    p {
      margin: 12px 0;
      text-align: center;
      font-size: 24px;
      line-height: 28px;
      color: #999;
    }
  }
}
</style>
