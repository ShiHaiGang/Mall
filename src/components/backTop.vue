<!-- HTML -->
<template>
  <div class="back_top"></div>
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

.back_top {
  position: fixed;
  bottom: 94px;
  right: 12px;
  width: 45px;
  height: 45px;
  background: url(../assets/top.png) no-repeat;
  background-size: 100%;
  z-index: 2;
}
</style>
