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
    <!-- 登陆 表单验证 -->
    <section v-if="loginState" class="form_group">
      <label class="border_bottom_1px">
        <span>用户名</span>
        <input
          @focus="user"
          @blur="naughty = 3"
          type="text"
          placeholder="用户名 / 手机号"
        />
      </label>
      <label>
        <span>密码</span>
        <input
          @focus="pass"
          @blur="naughty = 3"
          type="password"
          placeholder="密码"
        />
      </label>
    </section>
    <!-- 注册 表单验证 -->
    <section v-else class="form_group">
      <label class="border_bottom_1px">
        <span>昵称</span>
        <input
          @focus="user"
          @blur="naughty = 3"
          v-model="username"
          type="text"
          placeholder="用户名 / 手机号"
        />
      </label>
      <label class="email border_bottom_1px">
        <span>邮箱</span>
        <input
          @focus="user"
          @blur="naughty = 3"
          v-model="email"
          type="text"
          placeholder="请输入邮箱"
        />
        <em @click="verify()">发送验证码</em>
      </label>
      <label class="border_bottom_1px">
        <span>验证码</span>
        <input
          @focus="pass"
          @blur="naughty = 3"
          v-model="password"
          type="password"
          placeholder="请输入验证码"
        />
      </label>
      <label class="border_bottom_1px">
        <span>密码</span>
        <input
          @focus="pass"
          @blur="naughty = 3"
          v-model="code"
          type="text"
          placeholder="密码"
        />
      </label>
      <label>
        <span>确认密码</span>
        <input
          @focus="pass"
          @blur="naughty = 3"
          v-model="cpassword"
          type="password"
          placeholder="请确认密码"
        />
      </label>
    </section>
    <div v-if="loginState" @click="login()" class="login">登陆</div>
    <div v-if="loginState" @click="register()" class="register">注册</div>
    <div v-if="!loginState" @click="agree()" class="agree">同意并注册</div>
  </div>
</template>

<!-- JS -->
<script type="text/javascript">
import Header from '@/components/header.vue'
import JSONP from '@/jsonp'

export default {
  components: { Header },
  props: [],
  data() {
    return {
      loginState: true,
      naughty: 3,
      username: '',
      email: '',
      code: '',
      password: '',
      cpassword: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    user() {
      this.naughty = 1
    },
    pass() {
      this.naughty = 2
    },
    login() {},
    verify() {
      JSONP.verify({
        email: this.email
      })
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    register() {
      this.loginState = false
    },
    agree() {
      JSONP.signup({
        username: this.username,
        password: this.password,
        email: this.email,
        code: this.code
      })
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
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
  position: relative;
  padding: 13px 15px;
  span {
    width: 22%;
    color: #484746;
    font-size: 14px;
    line-height: 24px;
    display: inline-block;
  }
  input {
    width: 63%;
    font-size: 14px;
  }
}
.email {
  em {
    position: absolute;
    font-size: 12px;
    right: 0;
    color: #fb7299;
    padding: 6px 10px;
    border-radius: 30px;
    background-color: #e7e7e7;
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
.register {
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
.agree {
  width: 80%;
  margin: 0 auto;
  color: #fff;
  margin-top: 40px;
  text-align: center;
  line-height: 50px;
  border-radius: 90px;
  border: solid 5px transparent;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(to right, #32a8ff 6%, #00ccb4 94%),
    linear-gradient(to bottom, #d696bc, #cd4f5d);
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
