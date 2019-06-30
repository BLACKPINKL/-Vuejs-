<template lang="html">
  <li
    :class="optionCls"
    @click.stop="handleClick">
    <slot>{{ getLabel }}</slot>
  </li>
</template>

<script>
import { findComponentUpward } from 'utils'
const prefixCls = 'select-option'
export default {
  name: 'select-option',
  inject: ['select'],
  data() {
    return {
      prefixCls,
      currentValue: this.value
    }
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
      this.select.setSelected()
    }

  },
  computed: {
    getLabel() {
      return (this.value) ? this.value : ''
    },
    getOptionSlot() {
      return (this.$el && this.$el.textContent)
    },
    optionCls() {
      return [
        `${prefixCls}`,
        {[`${prefixCls}-selected`]: this.isSelected},
        {[`${prefixCls}-disabled`]: this.disabled}
      ]
    },
    isSelected() {
      return this.select.currentSelectedVal === this.value
    }
  },
  created() {
    //do something after creating vue instance
    this.select.cachedOptions.push(this)
  },
  methods: {
    handleClick() {
      if(this.disabled) return
      this.select.$emit('on-selected', {
        value: this.value,
        label: this.getOptionSlot
      })
    }
  }
}
</script>
