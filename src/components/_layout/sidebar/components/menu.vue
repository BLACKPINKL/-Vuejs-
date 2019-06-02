<template>
  <ul class="menu">
    <slot></slot>
  </ul>
</template>

<script>
import {findComponentsDownward} from 'utils'
export default {
  name: 'Menu',
  props: {
    defaultActive: {
      type: String,
      default: ''
    },
    // 展开的submenu集合
    openedNames: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.updateOpened()
  },
  methods: {
    // 手动更新展开的submenu
    updateOpened() {
      let componets = findComponentsDownward(this, 'Submenu')
      if (componets.length) {
        componets.forEach((item) => {
          if(this.openedNames.indexOf(item.name) > -1) {
            item.opened = true
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
.menu {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  list-style: none;
  position: relative;
}
</style>
