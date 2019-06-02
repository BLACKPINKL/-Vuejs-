<template>
  <svg :class="getClassName" aria-hidden="true">
    <use :xlink:href="getIconName"></use>
</svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    // 支持传入多个class 但必须是数组形式
    className: {
      type: [String, Array],
      default: ''
    }
  },
 computed: {
   getIconName() {
     return `#icon-${this.iconName}`
   },
   getClassName() {
     if (!this.className) {
       return 'icon'
     }
     // 如果传进来的class有多个
     else if (this.className && Array.isArray(this.className) && this.className.length) {
       return this.className.join(' ')
     }
     return `icon ${this.className}`
   }
 }
}
</script>

<style lang="less">
.icon {
   width: 1em;
   height: 1em;
   vertical-align: -0.15em;
   overflow: hidden;
}
</style>
