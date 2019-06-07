<template>
  <router-link class="" :to="to" class="menu-link">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'menu-item-link',
  props: {
    to: {
      type: String,
      default: 'javascript:;'
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
