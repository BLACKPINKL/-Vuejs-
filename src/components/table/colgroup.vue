<template>
  <colgroup>
    <col v-for="(item, index) in columns"
     :key="`colgroup_${index}`"
     :width="setColWidth(item)">
  </colgroup>
</template>

<script>
export default {
  name: 'tableColgroup',
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    setColWidth(colgroup) {
      let width = ''
      if (colgroup.width) {
        width = colgroup.width
      }else if (colgroup.width === 0) {
        width = ''
      }
      return width
    }
  }
}
</script>
