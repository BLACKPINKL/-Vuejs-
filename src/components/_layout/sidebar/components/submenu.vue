<template>
  <li class="submenu menu-item">
    <div class="submenu-title menu-link" @click.stop="handleClick">
      <svg-icon :iconName="icon" :iconClass="icon"></svg-icon>
      <slot name="title"></slot>
      <svg-icon iconName="zuojiantou" :className="iconClasses"></svg-icon>
    </div>
    <ul :class="classes">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'Submenu',
  props: {
    icon: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      opened: false
    }
  },
  methods: {
    handleClick() {
      this.opened = !this.opened
    }
  },
  computed: {
    classes() {
      return [
        'nav',
        { 'submenu-show': this.opened }
      ]
    },
    rotateClassName() {
      return this.opened ? 'rotate' : ''
    },
    iconClasses() {
      return [
        'icon-arrow',
        this.rotateClassName
      ]
    }
  }
}
</script>

<style lang="less">
.nav {
  max-height: 0px;
  overflow: hidden;
  position: relative;
  background: #17191B !important;
  transition: max-height .3s ease-out;
  &.submenu-show {
    max-height: 1000px;
    transition: max-height .3s ease-out;
  }
}
.icon-arrow {
  position: absolute;
  right: 5px;
  width: 1.2em;
  height: 1.2em;
  fill: #1cc09f;
  transition: transform .3s;
  &.rotate {
    transform: rotate(-90deg);
  }
}
</style>
