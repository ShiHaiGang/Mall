<!-- HTML -->
<template>
  <div class="content">
    <Header
      :title="'会员购'"
      :address="true"
      :iconRight="true"
      @addressClick="addressClick"
      @iconRightClick="iconRightClick"
    />
    <Scroll
      ref="wrapper"
      :probeType="3"
      :data="feeds"
      :listenScroll="true"
      @scroll="onScroll"
      :touchEnd="true"
      @touchEnd="onTouchEnd"
    >
      <!-- 头部分类 -->
      <ul>
        <li>
          <img src="../assets/shouban@3x.png" alt="手办模玩" />
          <p>手办模玩</p>
        </li>
        <li>
          <img src="../assets/manzhan@3x.png" alt="漫展购票" />
          <p>漫展购票</p>
        </li>
        <li>
          <img src="../assets/xinpin@3x.png" alt="新品上架" />
          <p>新品上架</p>
        </li>
        <li>
          <img src="../assets/shangpin@3x.png" alt="商品分类" />
          <p>商品分类</p>
        </li>
      </ul>
      <!-- 商品列表 -->
      <ol>
        <li v-for="(item, index) in feeds" :key="index">
          <div class="img_container">
            <!-- <img src="../assets/xiaojie.png" alt="" /> -->
            <img v-if="item.imageUrls" :src="item.imageUrls[0]" alt="" />
          </div>
          <div class="info_container">
            <div class="desc_container">
              <p class="desc ellipsis_2">
                {{ item.title }}
              </p>
              <p class="brief ellipsis_1">
                {{ item.brief }}
              </p>
            </div>
            <p class="price">
              <span class="symbol">{{ item.priceSymbol }}</span>
              <span v-if="item.priceDesc" class="number">{{
                item.priceDesc[0]
              }}</span>
            </p>
            <p class="like">
              {{
                item.like > 1e4
                  ? `${(item.like / 1e4).toFixed(1)}万`
                  : item.like
              }}人想要
            </p>
          </div>
        </li>
      </ol>
    </Scroll>
    <!-- 回到顶部 -->
    <BackTop @click.native="backTop" v-show="scrollY" />
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Header from '@/components/header.vue'
import Scroll from '@/components/scroll'
import BackTop from '@/components/backTop'
import Loading from '@/components/loading'
import JSONP from '@/jsonp'

export default {
  components: { Header, Scroll, BackTop },
  props: [],
  data() {
    return {
      feeds: [],
      pageNum: 1,
      scrollY: false
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.home()
  },
  methods: {
    addressClick() {
      this.$router.push('address')
      // console.log("addressClick");
    },
    iconRightClick() {
      // eslint-disable-next-line no-console
      console.log('iconRightClick点击')
    },
    home() {
      Loading.open('tv')
      JSONP.index({
        network: '',
        mobi_app: 'iphone',
        openEvent: 'cold',
        build: 0,
        pageNum: this.pageNum,
        pageSize: 10,
        mVersion: 7
      })
        .then((res) => {
          const { code, data } = res.data
          const { feeds } = data.vo
          if (code === 0) {
            Loading.close()
            this.pageNum++
            this.feeds = feeds.list
            this.total = feeds.total
          }
        })
        .catch((err) => {
          Loading.close()
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    onScroll(pos) {
      this.scrollY = Math.abs(Math.round(pos.y)) > 500
    },
    onTouchEnd(pos, maxScrollY) {
      if (pos.y >= 50) {
        // eslint-disable-next-line no-console
        console.log('下拉刷新', pos, maxScrollY)
      } else if (pos.y <= maxScrollY - 30) {
        // eslint-disable-next-line no-console
        console.log('上啦刷新', pos, maxScrollY)
      }
    },
    backTop() {
      this.$refs.wrapper.scrollTo(0, 0, 500)
      // this.$refs.wrapper.autoPullDownRefresh();
    }
  }
}
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

ul {
  display: flex;
  padding: 20px;
  li {
    flex: 1;
    height: 80px;
    img {
      width: 72px;
      height: 72px;
      display: block;
      margin: 0 auto;
    }
    p {
      text-align: center;
      font-size: 12px;
    }
  }
}
ol {
  padding: 0 12px;
  li {
    position: relative;
    display: flex;
    width: 100%;
    height: 152px;
    margin-bottom: 12px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    .img_container {
      width: 142px;
      height: 142px;
      border-radius: 4px;
      margin: 5px 0 0 5px;
      overflow: hidden;
      background: #eee url(../assets/picture_loading.svg) no-repeat 50%;
      background-size: 40px;
      img {
        left: 50%;
        height: 100%;
        position: relative;
        transform: translateX(-50%);
      }
    }
    .info_container {
      position: relative;
      box-sizing: border-box;
      flex: 1;
      height: 100%;
      padding-top: 13px;
      .desc_container {
        position: relative;
        margin: 0 11px 0 8px;
      }
      .desc {
        margin-bottom: 10px;
        font-family: PingFangSC;
        font-size: 16px;
        line-height: 22px;
      }
      .brief {
        height: 12px;
        font-size: 12px;
        color: #999;
        line-height: 12px;
      }
      .price {
        position: absolute;
        bottom: 12px;
        left: 8px;
        height: 18px;
        font-size: 0;
        line-height: 18px;
        letter-spacing: 0;
      }
      .symbol {
        color: #ff5687;
        font-size: 14px;
      }
      .number {
        color: #ff5687;
        font-size: 18px;
      }
      .like {
        position: absolute;
        bottom: 12px;
        right: 10px;
        font-size: 12px;
        color: #999;
        line-height: 12px;
      }
    }
  }
}
</style>
