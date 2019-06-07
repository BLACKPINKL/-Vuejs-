<template>
    <li :class="classes" :style="style">
      <slot></slot>
    </li>
</template>

<script>
import { findComponentUpward } from 'utils'
export default {
  name: 'menu-item',
  props: {
    name: {
      type: [String, Number],
      default: ''
    },
    activeClass: {
      type: String,
      default: 'active-menu'
    },
    activeColor: {
      type: String,
      default: '#1cc09f'
    },
    textColor: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    active() {
      return this.parentComponent.defaultActive === this.name
    },
    parentComponent() {
      return findComponentUpward(this, 'Menu')
    },
    style() {
      return this.active ? {
        color: this.textColor,
        background: this.activeColor
      } : ''
    },
    classes() {
      return [
        'menu-item',
        {[this.activeClass]: this.active}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.menu-item {
  display: block;
  overflow: hidden;
}
</style>
