<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Vuex 不传参数</h3>
    <p>{{ $store.state.cart.number }}</p>
    <button @click="add">+</button>
    <button @click="jian">-</button>

    <h3>Vuex 传参数</h3>
    <p>{{ $store.state.cart.value }}</p>
    <button @click="addvalue(2)">+</button>
    <button @click="jianvalue(2)">-</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("cart", ["add", "jian", "addvalue", "jianvalue"])
    // ...mapMutations()
  },
  computed: {
    // ...mapState(),
    // ...mapGetters()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  width: 50px;
  height: 50px;
  border: 1px solid rgb(74, 173, 177);
}
</style>
