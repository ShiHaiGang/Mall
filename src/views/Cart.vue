<!-- HTML -->
<template>
  <div class="cart">
    <section>
      <h5>昆山仓</h5>
      <ul>
        <li>
          <div class="click_area"></div>
          <div class="item_img"></div>
          <div class="item_info"></div>
        </li>
      </ul>
    </section>
  </div>
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

h5 {
  height: 36px;
  font-size: 18px;
  color: #212121;
  padding-left: 32px;
  line-height: 36px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBT…S/E0Au35/92UAkJBlIoG5FFRNqn1cJA1TluVoZ0PxveQPeCg9TF3TyrwAAAABJRU5ErkJggg==)
    12px no-repeat;
  background-size: 16px 16px;
  font-weight: 700;
}
section {
  margin: 0 8px 10px;
  border-radius: 4px;
  li {
    position: relative;
    background: #fff;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-right: 16px;
    margin-bottom: 16px;
  }
  .click_area {
    position: absolute;
    width: 42px;
    height: 80px;
  }
  .item_img {
    position: absolute;
    top: 16px;
    left: 42px;
    width: 80px;
    height: 80px;
    line-height: 80px;
    background-color: #f4f5f7;
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: 50%;
    border-radius: 2px;
  }
  .item_info {
    margin-left: 130px;
  }
}
</style>
