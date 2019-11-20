<!-- HTML -->
<template>
  <header>
    <i v-if="iconLift" class="icon"></i>
    <div v-if="!title">
      <i class="icon_search"></i>
      <input type="search" />
    </div>
    {{ title ? title : "" }}
    <i v-if="iconRight" class="icon"></i>
  </header>
</template>

<!-- JS -->
<script type="text/javascript">
//import index from '@/index';

export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    iconLift: {
      type: String,
      default: ""
    },
    iconRight: {
      type: String,
      default: ""
    }
  },
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

header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100px;
  font-size: 32px;
  line-height: 100px;
  background-color: #fb7299;
  color: #fff;
  display: flex;
  padding: 0 20px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  i {
    display: block;
    width: 56px;
    height: 56px;
    background-color: yellow;
  }
  div {
    flex: 1;
    height: 60px;
    margin: 0 20px;
    position: relative;
    padding: 0 30px 0 60px;
    border-radius: 50px;
    background-color: #fff;
    .icon_search {
      position: absolute;
      top: (60-32)/2 + px;
      left: 20px;
      width: 32px;
      height: 32px;
      background: url(../assets/search.png) no-repeat;
      background-size: 100%;
    }
    input[type="search"] {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
