<template lang="html">
  <li :class="itemCls" @click.stop="handleClick"><slot></slot></li>
</template>

<script>
import { findComponentUpward } from 'utils'
const prefixCls = 'dropdown-item'
export default {
  name: 'dropdown-item',
  props: {
    name: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    itemCls() {
      return [
        `${this.prefixCls}`,
        {[`${prefixCls}-disabled`]: this.disabled},
        {[`${prefixCls}-selected`]: this.selected}
      ]
    }
  },
  methods: {
    handleClick() {
      //点击item时触发
      if (this.disabled) return
      const $parent = findComponentUpward(this, 'dropdown')
      $parent.$emit('on-selected', this.name)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
