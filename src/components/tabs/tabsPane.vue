<template>
  <div class="tabs-pane" ref="panes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabsPane',
  props: {
    label: {
      type: [String, Function],
      required: true
    },
    name: {
      type: [String, Number],
      required: true
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentName: this.name
    }
  },
  watch: {
    name(val) {
      this.currentName = val
      this.$parent.updateNavList()
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.$parent.updateNavList()
  },
  destroyed () {
    this.$parent.updateNavList()
  }
}
</script>
