<template>
  <div>
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
      <li>
        <div class="img_container">
          <img src="../assets/xiaojie.png" alt="" />
        </div>
        <div class="info_container">
          <div class="desc_container">
            <p class="desc ellipsis_2">
              GSC VOCALOID 初音未来 Memorial Dress Ver. 手办 附独家特典
            </p>
            <p class="brief ellipsis_1">
              从今往后，向着更高点。MIKU绝美原画华丽登场~！附独家特典：原画亚克力牌
            </p>
          </div>
          <p class="price">
            <span class="symbol">¥</span>
            <span class="number">2439</span>
          </p>
          <p class="like">6.6万人想要</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data() {
    return {};
  },
  props: [],
  watch: {},
  methods: {},
  computed: {},
  mounted() {},
  components: {}
};
</script>
<style lang="scss" scoped>
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
      background-color: rgb(51, 135, 214);
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
