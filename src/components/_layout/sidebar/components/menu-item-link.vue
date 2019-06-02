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
  padding: 20px;
  white-space: nowrap;
}
</style>
