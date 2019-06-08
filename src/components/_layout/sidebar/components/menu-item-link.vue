<template>
  <router-link
    :to="to"
    class="menu-link"
    :style="itemStyle">
    <slot></slot>
  </router-link>
</template>

<script>
import mixin from './mixin'
export default {
  name: 'menu-item-link',
  mixins: [mixin],
  props: {
    to: {
      type: String,
      default: 'javascript:;'
    }
  },
  computed: {
    itemStyle() {
      let len = this.findsubMenusNum
      if (len) {
        return {
          paddingLeft: 35 + (len -1) * 24 + 'px'
        }
      }
    }
  }
}
</script>

<style lang="less">
.menu-link {
  display: block;
  width: 100%;
  height: 65px;
  line-height: 65px;
  white-space: nowrap;
  padding: 0 20px;
}
</style>
