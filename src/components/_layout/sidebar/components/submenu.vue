<template>
  <li class="submenu menu-item">
    <div class="submenu-title menu-link" @click.stop="handleClick" :style="itemStyle">
      <svg-icon :iconName="icon" :iconClass="icon"></svg-icon>
      <slot name="title"></slot>
      <svg-icon iconName="zuojiantou" :className="iconClasses"></svg-icon>
    </div>
    <Collapse-transition>
      <ul class="submenu-list" v-show="opened">
        <slot></slot>
      </ul>
    </Collapse-transition>
  </li>
</template>

<script>
import CollapseTransition from 'components/collapse-transition'
import mixin from './mixin'
export default {
  name: 'Submenu',
  components: {
    CollapseTransition
  },
  mixins: [mixin],
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
    rotateClassName() {
      return this.opened ? 'rotate' : ''
    },
    iconClasses() {
      return [
        'icon-arrow',
        this.rotateClassName
      ]
    },
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
.submenu-list {
  overflow: hidden;
  position: relative;
  padding: 0;
  background: #17191B !important;
  transition: all .23s;
}
</style>
