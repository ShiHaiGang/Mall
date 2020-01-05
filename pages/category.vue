<!-- HTML -->
<template>
  <div class="content">
    <Header
      :title="''"
      :button="off"
      @focus="focus"
      @value="value"
      @buttonClick="buttonClick"
    />
    <!-- 搜索 -->
    <section v-show="off" class="search">
      <h6>搜索历史 <span>清空</span></h6>
      <ul class="history">
        <li v-for="(item, index) in search" :key="index" class="ellipsis_1">
          {{ item.name }}
        </li>
      </ul>
    </section>
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
        ref="wrapper"
        :probeType="3"
        :data="goods"
        :listenScroll="true"
        @scroll="onScroll"
      >
        <ul>
          <li v-for="(items, i) in goods" :key="i" class="scroll_top_hook">
            <h5>{{ items.typeName }}</h5>
            <section class="item">
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
import Scroll from '@/components/scroll'
import Header from '@/components/header.vue'
import JSONP from '@/jsonp'

export default {
  components: { Header, Scroll },
  props: [],
  data() {
    return {
      goods: [],
      search: [],
      listHeight: [],
      scrollY: 0,
      off: false
    }
  },
  computed: {
    // 计算选中的位置
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  watch: {},
  async asyncData({ app, error }) {
    try {
      // We can use async/await ES6 feature
      const {
        status,
        data: {
          code,
          data: { vo }
        }
      } = await JSONP.category({
        nshopId: 2233
      })

      if (status === 200 && code === 0) {
        return {
          goods: vo
        }
      }
    } catch {
      error({ statusCode: 500, message: '服务器开小差了~' })
    }
  },
  mounted() {
    // this.category()
    this.$nextTick(() => {
      this.calculateHeight()
    })
  },
  methods: {
    focus() {
      this.off = true
    },
    value(val) {
      JSONP.search({
        term: val,
        type: 1,
        platform: 'h5'
      })
        .then((res) => {
          const { code, data } = res.data
          if (code === 0) {
            this.search = data.vo
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    buttonClick() {
      this.off = false
      this.search = []
    },
    // 左边 选择跳转到对应的位置
    selectMenu(index, event) {
      if (!event._constructed) {
        return
      }
      const wrapper = this.$refs.wrapper.$el.getElementsByClassName(
        'scroll_top_hook'
      )
      const el = wrapper[index]
      this.$refs.wrapper.scrollToElement(el, 300)
    },
    // 获取 DOM 计算右边的高度
    calculateHeight() {
      const wrapper = this.$refs.wrapper.$el.getElementsByClassName(
        'scroll_top_hook'
      )
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < wrapper.length; i++) {
        const item = wrapper[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    // 监听 scroll 事件
    onScroll(pos) {
      this.scrollY = Math.abs(Math.round(pos.y))
    },
    // 接口数据
    category() {
      JSONP.category({
        shopId: 2233
      })
        .then((res) => {
          const { code, data } = res.data
          if (code === 0) {
            this.goods = data.vo
            // 从新计算高度
            this.$nextTick(() => {
              this.calculateHeight()
            })
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }
  }
}
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

.content {
  display: flex;
}
.search {
  position: absolute;
  width: 100%;
  height: calc(100% - 50px);
  z-index: 5;
  background-color: #f4f4f4;
  h6 {
    padding: 0 12px;
    font-size: 12px;
    line-height: 40px;
    font-weight: 400;
    color: #999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      // float: right;
      padding: 4px;
      color: #fb7299;
      line-height: 12px;
    }
  }
  .history {
    padding: 0 12px;
    background-color: #fff;
    li {
      font-size: 14px;
      line-height: 44px;
    }
  }
}
nav {
  width: 92px;
  overflow: hidden;
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
      content: '';
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
  overflow-y: scroll;
  background-color: #fff;
  h5 {
    font-size: 14px;
    line-height: 12px;
    padding: 18px 0;
  }
  .item {
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
