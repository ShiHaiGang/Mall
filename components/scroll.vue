<!-- HTML -->
<template>
  <div ref="wrapper" class="wrapper">
    <!-- better-scroll 只处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。 -->
    <section>
      <slot></slot>
    </section>
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 监听滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 滚动结束的位置坐标
     */
    scrollEnd: {
      type: Boolean,
      default: false
    },
    /**
     * 鼠标/手指离开位置坐标
     */
    touchEnd: {
      type: Boolean,
      default: false
    },
    /**
     * 滚动开始之前
     */
    beforeScrollStart: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX
      })
      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      // 滚动结束的位置坐标
      if (this.scrollEnd) {
        this.scroll.on('scrollEnd', (pos) => {
          this.$emit('scrollEnd', pos)
        })
      }
      // 鼠标/手指离开位置坐标
      if (this.touchEnd) {
        this.scroll.on('touchEnd', (pos) => {
          // maxScrollY 最大滚动区的高度 负值
          this.$emit('touchEnd', pos, this.scroll.maxScrollY)
        })
      }
      // 滚动开始之前
      if (this.beforeScrollStart) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })
      }
    },
    // 禁用 BS
    disable() {
      this.scroll && this.scroll.disable()
    },
    // 启用 BS, 默认 开启。
    enable() {
      this.scroll && this.scroll.enable()
    },
    // 重新计算 BS，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // 滚动到指定的位置
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    // 自动触发下拉刷新
    autoPullDownRefresh() {
      this.scroll && this.scroll.autoPullDownRefresh()
    },
    // 滚动到指定的目标元素
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>

<!-- SCSS -->
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
