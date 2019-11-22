<!-- HTML -->
<template>
  <Scroll>
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
    <ol>
      <li v-for="(item, index) in feeds" :key="index">
        <div class="img_container">
          <img src="../assets/xiaojie.png" alt="" />
          <!-- <img
            v-if="item.imageUrls"
            :src="
              item.imageUrls[0].includes('https')
                ? item.imageUrls[0]
                : 'https' + item.imageUrls[0]
            "
            alt=""
          /> -->
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
              item.like > 1e4 ? `${(item.like / 1e4).toFixed(1)}万` : item.like
            }}人想要
          </p>
        </div>
      </li>
    </ol>
  </Scroll>
</template>

<!-- JS -->
<script type="text/javascript">
import Scroll from "components/scroll";
import JSONP from "@/jsonp";

export default {
  data() {
    return {
      feeds: []
    };
  },
  props: [],
  watch: {},
  methods: {
    index() {
      JSONP.index({
        network: "",
        mobi_app: "iphone",
        openEvent: "cold",
        build: 0,
        pageNum: 1,
        pageSize: 10,
        mVersion: 7
      })
        .then(res => {
          const { code, data } = res.data;
          const { feeds } = data.vo;
          if (code === 0) {
            this.feeds = feeds.list;
            this.total = feeds.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {},
  mounted() {
    this.index();
  },
  components: { Scroll }
};
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

ul {
  display: flex;
  height: 160px;
  padding: 0 40px;
  margin: 30px auto 40px;
  li {
    flex: 1;
    height: 160px;
    img {
      width: 144px;
      height: 144px;
      display: block;
      margin: 0 auto;
    }
    p {
      text-align: center;
      font-size: 24px;
    }
  }
}
ol {
  padding: 0 24px;
  li {
    position: relative;
    display: flex;
    width: 100%;
    height: 300px;
    margin-bottom: 24px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    .img_container {
      width: 284px;
      height: 284px;
      margin: 10px 0 0 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info_container {
      position: relative;
      box-sizing: border-box;
      flex: 1;
      height: 100%;
      padding-top: 26px;
      .desc_container {
        position: relative;
        margin: 0 11px 0 8px;
      }
      .desc {
        margin-bottom: 20px;
        font-family: PingFangSC;
        font-size: 32px;
        line-height: 44px;
      }
      .brief {
        height: 24px;
        font-size: 24px;
        color: #999;
        line-height: 24px;
      }
      .price {
        position: absolute;
        bottom: 24px;
        left: 16px;
        height: 36px;
        font-size: 0;
        line-height: 36px;
        letter-spacing: 0;
      }
      .symbol {
        color: #ff5687;
        font-size: 28px;
      }
      .number {
        color: #ff5687;
        font-size: 36px;
      }
      .like {
        position: absolute;
        bottom: 24px;
        right: 20px;
        font-size: 24px;
        color: #999;
        line-height: 24px;
      }
    }
  }
}
</style>
