<!-- HTML -->
<template>
  <footer class="border_top_1px">
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
    <!-- eslint-enable -->
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
  height: 50px;
  display: flex;
  position: fixed;
  padding-top: 7px;
  background-color: #fff;
}

.tab-item {
  flex: 1;
  display: block;
  text-align: center;
  font-size: 10px;
}

.tab-item > span {
  display: block;
  margin: 0 auto 5px;
  width: 22px;
  height: 22px;
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
