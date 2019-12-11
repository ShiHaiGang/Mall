<!-- HTML -->
<template>
  <div class="cart">
    <!-- 内容区 -->
    <section>
      <!-- 商品列表 -->
      <div class="shop_list">
        <h5>昆山仓</h5>
        <ul>
          <li class="item" v-for="(item, index) in productList" :key="index">
            <!-- 选择区 -->
            <div
              @click="selectProduct(item)"
              :class="['click_area', { checked: item.checked }]"
            ></div>
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
              <div class="num_container">
                <!-- 商品价钱 -->
                <i class="mini">¥</i>
                <i class="now_price">{{ item.productPrice }}</i>
                <!-- 数量加减 -->
                <div class="action">
                  <span
                    @click="changeNumber(item, -1)"
                    class="reduce_block"
                  ></span>
                  <em>{{ item.count }}</em>
                  <span
                    @click="changeNumber(item, +1)"
                    class="add_block"
                  ></span>
                </div>
              </div>
            </div>
            <!-- 收藏删除 -->
            <div class="hide">
              <div @click="hideCollect(item)" class="button action_fav">
                <span>移至收藏</span>
              </div>
              <div @click="hideDelete(index)" class="button action_delete">
                <span>删除</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!-- 结算区 -->
    <footer class="border_top_1px">
      <label
        @click="checkAll()"
        :class="['check_all', { checked: checkAllFlag }]"
      >
        <span>全选</span>
      </label>
      <div class="total_info">
        合计:
        <i class="mini">¥</i>
        <i class="now_price">{{ totalMoney }}</i>
        <p>不含运费</p>
      </div>
      <div class="to_pay">结算(1)</div>
    </footer>
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Hammer from "hammerjs";

export default {
  data() {
    return {
      productList: [
        {
          brandName: "FILA（斐乐）", //品牌名称
          count: "5", //购买数量
          productId: "51", //商品编号
          cartId: "46", //购物车编号
          productImg:
            "http://img10.360buyimg.com/n1/s150x150_jfs/t9310/181/142446836/274178/c7a0a21c/59a19e93N69043e8a.jpg", //商品图片
          stock: "520", //库存
          orgPrice: "200", //商品原始价
          productName:
            "2017W系列 女外套高圆圆同款秋季新款长款棒球服外套女|26733772 传奇蓝-NV 165/84A(M)", //商品名称
          productPrice: "520", //商品单价
          attrList: [
            //商品sku数组
            {
              attrName: "颜色", //sku名称
              attrVal: "黄色" //商品sku值
            },
            {
              attrName: "尺码",
              attrVal: "L"
            }
          ]
        }
      ], //商品信息数组
      totalMoney: 0, //商品总价
      checkAllFlag: false //商品全选
    };
  },
  props: [],
  watch: {},
  methods: {
    // 左边滑动
    LeftSliding() {
      const element = document.getElementsByClassName("item");

      for (let i = 0; i < element.length; i++) {
        // create a simple instance
        // by default, it only adds horizontal recognizers
        let mc = new Hammer(element[i]);

        // listen to events...
        mc.on("panleft panright", ev => {
          if (ev.type === "panleft" && ev.deltaX <= -20) {
            element[i].style.transform = "translateX(-160px)";
            element[i].style.transitionDuration = "0.5s";
          } else if (ev.type === "panright" && ev.deltaX >= 20) {
            element[i].style.transform = "translateX(0px)";
            element[i].style.transitionDuration = "0.3s";
          }
        });
      }
    },
    // 还原滑动
    reduction() {
      const element = document.getElementsByClassName("item");

      for (let i = 0; i < element.length; i++) {
        element[i].style.transform = "translateX(0px)";
      }
    },
    // 数量加减
    changeNumber(item, type) {
      if (type > 0) {
        item.count++;
        if (item.count > 200) {
          item.count = 200;
        }
      } else {
        item.count--;
        if (item.count < 1) {
          item.count = 1;
        }
      }

      //计算总金额
      this.calTotalMoney();
    },
    // 选择商品
    selectProduct(item) {
      if (typeof item.checked == "undefined") {
        if (item.stock != 0) {
          //判断库存不为0的选中
          //Vue.$set(item,'checked',true); //Vue全局在item对象中注册了checked属性，值是true
          this.$set(item, "checked", true); //局部在item对象中注册checked属性，值是true
        }
      } else {
        item.checked = !item.checked;
      }

      //全部选中则全选点亮，相反
      this.checkAllFlag = !this.productList.find(item => !item.checked);

      //计算总金额
      this.calTotalMoney();
    },
    //计算总金额
    calTotalMoney() {
      this.totalMoney = 0;
      this.productList.forEach((item, index) => {
        if (item.checked) {
          this.totalMoney += item.productPrice * item.count;
        }
      });
    },
    //点击全选
    checkAll() {
      this.checkAllFlag = !this.checkAllFlag;
      this.productList.forEach((item, index) => {
        if (typeof item.checked == "undefined") {
          if (item.stock != 0) {
            //判断库存不为0的选中
            this.$set(item, "checked", this.checkAllFlag); //全部为 true
          }
        } else {
          item.checked = this.checkAllFlag; //全部为 false
        }
      });

      //计算总金额
      this.calTotalMoney();
    },
    //点击收藏
    hideCollect(item) {
      console.log("点击收藏", item);
    },
    //点击删除
    hideDelete(index) {
      console.log("点击删除", index);
      this.reduction();
    }
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      // DOM 现在更新了
      this.LeftSliding();
    });
  },
  components: {}
};
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

.mini {
  color: #ff5587;
  font-size: 12px;
  line-height: 1;
  font-weight: 300;
}
.now_price {
  margin-left: 2px;
  color: #ff5587;
  font-size: 16px;
  font-weight: 500;
}
// 公用 end
.cart {
  width: 100%;
  height: 100%;
  position: relative;
}
section {
  height: calc(100% - 60px);
}
.shop_list {
  margin: 0 8px 10px;
  border-radius: 4px;
  h5 {
    height: 36px;
    font-size: 18px;
    color: #212121;
    padding-left: 32px;
    line-height: 36px;
    background: url(../assets/item_title.png) 12px no-repeat;
    background-size: 16px 16px;
    font-weight: 700;
  }
  li {
    position: relative;
    transform: translateX(0px);
    // 滑动 end
    display: flex;
    padding: 16px;
    padding-left: 0;
    margin-bottom: 16px;
    background: #fff;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
  }
  .click_area {
    width: 42px;
    height: 80px;
    background-color: #fff;
    background: url(../assets/uncheck.png) 50% no-repeat;
    background-size: 18px 18px;
  }
  .checked {
    background: url(../assets/checked.svg) 50% no-repeat;
    background-size: 18px 18px;
  }
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
    .num_container {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      .action {
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        em {
          width: 38px;
          font-size: 12px;
          color: #212121;
          text-align: center;
          display: inline-block;
        }
        .reduce_block,
        .add_block {
          display: inline-block;
          height: 22px;
          width: 22px;
        }
        .reduce_block {
          background: url(../assets/reduce.png) no-repeat;
          background-size: 100%;
        }
        .add_block {
          background: url(../assets/add.png) no-repeat;
          background-size: 100%;
        }
      }
    }
  }
  // <!-- 收藏删除 -->
  .hide {
    position: absolute;
    left: 100%;
    top: 0;
    height: 100%;
    overflow: hidden;
    background: #fafafa;
    font-size: 0;
    white-space: nowrap;
    .button {
      display: inline-block;
      width: 80px;
      height: 100%;
      color: #333;
      background: #eff1f3;
      position: relative;

      & > span {
        font-size: 14px;
        height: 14px;
        line-height: 14px;
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        margin-top: -7px;
        text-align: center;
      }
    }
    .action_delete {
      background: #e4393c;
      & > span {
        color: #fff;
      }
    }
  }
}
footer {
  position: absolute;
  display: flex;
  align-items: center;
  height: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 14px;
  background-color: #fff;
  .check_all {
    position: absolute;
    left: 12px;
    width: 60px;
    line-height: 60px;
    text-align: right;
    background: url(../assets/uncheck.png) 10% 50% no-repeat;
    background-size: 18px 18px;
  }
  .checked {
    background: url(../assets/checked.svg) 10% 50% no-repeat;
    background-size: 18px 18px;
  }
  .total_info {
    position: absolute;
    right: 112px;
    p {
      font-size: 12px;
      color: #999;
      text-align: right;
      line-height: 12px;
      margin-top: 5px;
    }
  }
  .to_pay {
    position: absolute;
    right: 12px;
    width: 90px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-image: linear-gradient(-236deg, #fb7299, #fb7299);
    box-shadow: 0 2px 4px 0 rgba(255, 100, 145, 0.7);
    border-radius: 100px;
  }
}
</style>
