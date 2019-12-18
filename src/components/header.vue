<!-- HTML -->
<template>
  <header>
    <div ref="left" class="left">
      <address v-if="address" @click="addressClick()">上海市</address>
      <i v-if="iconLeft" class="icon_left" @click="iconLeftClick()"></i>
    </div>
    <section>
      <div
        v-if="!title"
        class="search"
        :style="{ marginLeft: left, marginRight: right }"
      >
        <i class="icon_search"></i>
        <input
          type="search"
          v-model="value"
          @focus="focus()"
          :placeholder="placeholder"
        />
      </div>
      {{ title }}
    </section>
    <div ref="right" class="right">
      <span v-if="button" class="button" @click="buttonClick()">取消</span>
      <i v-if="iconRight" class="icon_right" @click="iconRightClick()"></i>
    </div>
  </header>
</template>

<!-- JS -->
<script type="text/javascript">
import UTILS from "@/utils";

export default {
  data() {
    return {
      left: 0,
      value: "",
      right: 0
    };
  },
  props: {
    title: {
      type: String,
      default: " "
    },
    placeholder: {
      type: String,
      default: "商品、品牌、IP名"
    },
    address: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: Boolean,
      default: false
    },
    iconRight: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    button(val, oval) {
      val !== oval ? this.update() : "";
    }
  },
  methods: {
    focus() {
      this.$emit("focus");
    },
    buttonClick() {
      this.value = "";
      this.$emit("buttonClick");
    },
    addressClick() {
      this.$emit("addressClick");
    },
    iconLeftClick() {
      this.$emit("iconRightClick");
    },
    iconRightClick() {
      this.$emit("iconRightClick");
    },
    update() {
      // 下次 DOM 更新后执行
      this.$nextTick(() => {
        const offset = 10;
        // 获取插槽宽度
        this.left = `${this.$refs.left.clientWidth + offset}px`;
        this.right = `${this.$refs.right.clientWidth + offset}px`;
      });
    }
  },
  computed: {},
  mounted() {
    // $watch 的回调函数 处理 截流
    this.$watch(
      "value",
      UTILS.debounce(newVal => {
        this.$emit("value", newVal);
      }, 200)
    );
    this.update();
  },
  components: {}
};
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  font-size: 16px;
  overflow: hidden;
  background-color: #fb7299;
  color: #fff;
}
.left,
.right {
  top: 0;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
}
section {
  line-height: 50px;
  text-align: center;
}
.left {
  left: 10px;
}
.right {
  right: 10px;
}
i {
  display: block;
  width: 28px;
  height: 28px;
  // background-color: yellow;
}
// 搜索
.search {
  height: 30px;
  margin-top: 10px;
  position: relative;
  padding: 0 15px 0 30px;
  border-radius: 25px;
  background-color: #fff;
  .icon_search {
    position: absolute;
    top: (30-16)/2 + px;
    left: 10px;
    width: 16px;
    height: 16px;
    background: url(../assets/search.png) no-repeat;
    background-size: 100%;
  }
  input[type="search"] {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.icon_left {
  background: url(../assets/icon_left.png) no-repeat;
  background-size: 100%;
}
.icon_right {
  background: url(../assets/icon_right.png) no-repeat;
  background-size: 100%;
}
address {
  color: #fb7299;
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 20px;
  padding-left: 25px;
  background: url(../assets/address.png) no-repeat;
  background-position: 5px center;
  background-color: #fff;
  background-size: 20px;
}
.button {
  padding: 5px 10px;
}
</style>
