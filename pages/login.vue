<!-- HTML -->
<template>
  <div class="content">
    <Header :title="'登录bilibili'" />
    <!-- 顽皮动画 -->
    <div class="naughty">
      <img v-if="naughty == 1" src="../assets/greeting.png" />
      <img v-else-if="naughty == 2" src="../assets/blindfold.png" />
      <img v-else src="../assets/normal.png" />
    </div>
    <!-- 表单验证 -->
    <section class="form_group">
      <label class="border_bottom_1px">
        <span>用户名</span>
        <input
          @focus="user"
          @blur="naughty = 3"
          type="text"
          placeholder="用户名"
        />
      </label>
      <label>
        <span>密码</span>
        <input
          @focus="password"
          @blur="naughty = 3"
          type="password"
          placeholder="密码"
        />
      </label>
    </section>
    <div class="login">登陆</div>
    <div class="signin">注册</div>
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Header from '@/components/header.vue'

export default {
  components: { Header },
  props: [],
  data() {
    return {
      naughty: 3
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    user() {
      this.naughty = 1
    },
    password() {
      this.naughty = 2
    }
  }
}
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

.naughty {
  width: 120px;
  height: 95px;
  margin: 20px auto;
  img {
    width: 100%;
  }
}
.form_group {
  position: relative;
  padding: 15px;
  margin-left: 15px;
  margin-right: 15px;
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    animation: frame_enter 1s forwards ease-in-out reverse,
      gradient_animation 4s ease-in-out infinite;
    background: linear-gradient(120deg, #00f260, #0575e6, #00f260);
    background-size: 300% 300%;
    clip-path: polygon(
      0% 100%,
      10px 100%,
      10px 10px,
      calc(100% - 10px) 10px,
      calc(100% - 10px) calc(100% - 10px),
      10px calc(100% - 10px),
      10px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
}
label {
  height: 50px;
  display: block;
  padding: 13px 15px;
  span {
    width: 30%;
    color: #484746;
    font-size: 14px;
    line-height: 20px;
    display: inline-block;
  }
  input {
    width: 63%;
    font-size: 14px;
  }
}
.login {
  width: 65%;
  float: left;
  color: #fff;
  margin-top: 40px;
  margin-left: 15px;
  text-align: center;
  line-height: 50px;
  border-radius: 90px;
  border: solid 5px transparent;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(-151deg, #17fef6 0%, #8417f9 100%),
    linear-gradient(to bottom, #fff3b6, #e27d2c);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
/* 第一组颜色 */
// background-image: linear-gradient(-151deg, #17fef6 0%, #8417f9 100%),
//   linear-gradient(to bottom, #fff3b6, #e27d2c);
/* 第二组颜色 */
// background-image: linear-gradient(to right, #32a8ff 6%, #00ccb4 94%),
//   linear-gradient(to bottom, #d696bc, #cd4f5d);
/* 第三组颜色 */
// background-image: linear-gradient(-45deg, #17edfe 6%, #8417f9 94%),
// linear-gradient(to bottom, #fff3b6, #e27d2c);
.signin {
  width: 60px;
  float: right;
  color: #fff;
  margin-top: 40px;
  margin-right: 15px;
  line-height: 50px;
  text-align: center;
  border-radius: 100px;
  border: solid 5px transparent;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(-151deg, #ffc600 6%, #04e199 94%),
    linear-gradient(to bottom, #fff3b6, #e27d2c);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
@keyframes gradient_animation {
  0% {
    background-position: 15% 0%;
  }
  50% {
    background-position: 85% 100%;
  }
  100% {
    background-position: 15% 0%;
  }
}
@keyframes frame_enter {
  0% {
    clip-path: polygon(
      0% 100%,
      10px 100%,
      10px 10px,
      calc(100% - 10px) 10px,
      calc(100% - 10px) calc(100% - 10px),
      10px calc(100% - 10px),
      10px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  25% {
    clip-path: polygon(
      0% 100%,
      10px 100%,
      10px 10px,
      calc(100% - 10px) 10px,
      calc(100% - 10px) calc(100% - 10px),
      calc(100% - 10px) calc(100% - 10px),
      calc(100% - 10px) 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  50% {
    clip-path: polygon(
      0% 100%,
      10px 100%,
      10px 10px,
      calc(100% - 10px) 10px,
      calc(100% - 10px) 10px,
      calc(100% - 10px) 10px,
      calc(100% - 10px) 10px,
      calc(100% - 10px) 10px,
      100% 0%,
      0% 0%
    );
  }
  75% {
    clip-path: polygon(
      0% 100%,
      10px 100%,
      10px 10px,
      10px 10px,
      10px 10px,
      10px 10px,
      10px 10px,
      10px 10px,
      10px 0%,
      0% 0%
    );
  }
  100% {
    clip-path: polygon(
      0% 100%,
      10px 100%,
      10px 100%,
      10px 100%,
      10px 100%,
      10px 100%,
      10px 100%,
      10px 100%,
      10px 100%,
      0% 100%
    );
  }
}
</style>
