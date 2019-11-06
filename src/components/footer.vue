<!-- HTML -->
<template>
  <footer>
    <!-- eslint-disable -->
    <router-link class='tab-item' :to="{path: 'home', query: $route.query}">
      <span :id="$route.path.indexOf('home') !== -1? 'home_active' : 'home'"></span>
      会员购
    </router-link>
    <router-link class='tab-item' :to="{path: 'category', query: $route.query}">
      <span :id="$route.path.indexOf('category') !== -1? 'category_active' : 'category'"></span>
      分类
    </router-link>
    <router-link class='tab-item' :to="{path: 'cart', query: $route.query}">
      <span :id="$route.path.indexOf('cart') !== -1? 'cart_active' : 'cart'"></span>
      购物车
    </router-link>
    <router-link class='tab-item' :to="{path: 'order', query: $route.query}">
      <span :id="$route.path.indexOf('order') !== -1? 'order_active' : 'order'"></span>
      订单
    </router-link>
  </footer>
</template>

<!-- JS -->
<script type="text/javascript">
//import index from '@/index';

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

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

footer {
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  position: fixed;
  height: 100px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  padding: 15px 0 10px 0;
}

.tab-item {
  flex: 1;
  display: block;
  text-align: center;
  font-size: 20px;
}

.tab-item > span {
  display: block;
  margin: 0 auto;
  width: 44px;
  height: 44px;
}

#home_active,
#home,
#category_active,
#category,
#cart_active,
#cart,
#order_active,
#order {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#home_active {
  background-image: url(../assets/icon/home_active@3x.png);
}

#home {
  background-image: url(../assets/icon/home@3x.png);
}

#category_active {
  background-image: url(../assets/icon/category_active@3x.png);
}

#category {
  background-image: url(../assets/icon/category@3x.png);
}

#cart_active {
  background-image: url(../assets/icon/cart_active@3x.png);
}

#cart {
  background-image: url(../assets/icon/cart@3x.png);
}

#order_active {
  background-image: url(../assets/icon/order_active@3x.png);
}

#order {
  background-image: url(../assets/icon/order@3x.png);
}
</style>
