<!-- HTML -->
<template>
  <hgroup v-show="show" class="border_bottom_1px">
    <h6
      v-for="(item, index) in data"
      :key="index"
      :class="{ active: currentIndex === index }"
      @click="active(item, index)"
    >
      {{ item.title }}
    </h6>
  </hgroup>
</template>

<!-- JS -->
<script type="text/javascript">
//import index from '@/index';

export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  watch: {},
  methods: {
    active(item, index) {
      this.currentIndex = index;
      this.$emit("active", index, item);
    }
  },
  computed: {},
  mounted() {},
  components: {}
};
</script>

<!-- SCSS -->
<style lang="scss" scoped>
//@import 'src/style/mixin.scss';

hgroup {
  display: flex;
  padding: 10px 20px;
  text-align: center;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  // background-color: rgb(35, 34, 38);
  h6 {
    flex: 1;
    color: #999;
    position: relative;
  }
  h6:nth-child(2) {
    flex: 2;
  }
  .active::before {
    position: absolute;
    content: "";
    width: 60px;
    height: 2px;
    bottom: -9px;
    border-radius: 5px;
    transform: translateX(-10%);
    background-color: #fb7299;
  }
  .active {
    color: #fb7299;
  }
}
</style>
