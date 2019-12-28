<!-- HTML -->
<template>
  <div class="content">
    <!-- 右边导航 -->
    <ol class="nav_bar">
      <li
        :class="{ active: currentIndex === index }"
        v-for="(item, index) in shortcutList"
        @click="selectMenu(index)"
        :key="index"
      >
        {{ item }}
      </li>
    </ol>
    <!-- fixedTitle -->
    <nav :style="{ transform: fixedTop }" v-show="fixedTitle">
      <h5>{{ fixedTitle }}</h5>
    </nav>
    <!-- 城市排序 -->
    <Scroll
      ref="wrapper"
      :probeType="3"
      :data="cityList"
      :listenScroll="true"
      @scroll="onScroll"
    >
      <section ref="listGroup" v-for="(items, i) in cityList" :key="i">
        <h5>{{ items.letter }}</h5>
        <ul>
          <li
            v-for="(item, j) in items.city_list"
            :key="j"
            @click="select(item)"
            class="border_bottom_1px"
          >
            {{ item.fullname }}
          </li>
        </ul>
      </section>
    </Scroll>
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Scroll from '@/components/scroll'
import JSONP from '@/jsonp'

// 标题头高度
const navHeight = 30

export default {
  components: { Scroll },
  props: [],
  data() {
    return {
      cityList: [],
      listHeight: [],
      scrollY: -1,
      currentIndex: 0,
      fixedTop: ''
    }
  },
  computed: {
    shortcutList() {
      return this.cityList.map((group) => {
        return group.letter.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.cityList[this.currentIndex]
        ? this.cityList[this.currentIndex].letter
        : ''
    }
  },
  watch: {
    scrollY(newY) {
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let index = 0; index < this.listHeight.length - 1; index++) {
        const height1 = this.listHeight[index]
        const height2 = this.listHeight[index + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = index
          this.diff(height2 + newY)
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = this.listHeight.length - 2
    }
  },
  mounted() {
    this.city()
  },
  methods: {
    diff(newVal) {
      const fixedTop = newVal > 0 && newVal < navHeight ? newVal - navHeight : 0
      this.fixedTop = `translate3d(0,${fixedTop}px,0)`
    },
    select(item) {
      this.$router.push({ path: 'home', query: { city: item.fullname } })
    },
    // 左边 选择跳转到对应的位置
    selectMenu(index) {
      if (!index && index !== 0) {
        return
      }
      // this.currentIndex = index;
      const el = this.$refs.listGroup[index]
      this.$refs.wrapper.scrollToElement(el, 300)
    },
    // 获取 DOM 计算右边的高度
    calculateHeight() {
      let height = 0
      const listGroup = this.$refs.listGroup
      this.listHeight.push(height)
      for (let i = 0; i < listGroup.length; i++) {
        const item = listGroup[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    onScroll(pos) {
      this.scrollY = pos.y
    },
    // 获取城市列表
    city() {
      JSONP.city({
        channel: 1
      })
        .then((res) => {
          const { errno, data } = res.data
          if (errno === 0) {
            this.cityList = data.list
            this.cityList.unshift({ letter: '热门', city_list: data.hot })
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
  padding-top: 0;
}
h5 {
  color: #fff;
  // font-size: 12px;
  line-height: 30px;
  padding-left: 20px;
  background: #f25d8e;
}
.active {
  color: #f25d8e;
}
.nav_bar {
  position: fixed;
  z-index: 30;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: #e7e7e7;
  li {
    padding: 3px;
    font-size: 12px;
  }
}
nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
section {
  ul {
    line-height: 50px;
    padding-left: 20px;
  }
}
</style>
