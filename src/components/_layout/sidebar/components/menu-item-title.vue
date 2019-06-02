<template>
  <div>
    <svg-icon :iconName="meta.icon" :iconClass="meta.icon"></svg-icon>
    <span>{{meta.title}}</span>
  </div>
</template>

<script>
export default {
  name: 'menu-item-title',
  props: {
    meta: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
