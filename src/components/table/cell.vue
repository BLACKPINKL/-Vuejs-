<template>
  <div class="cell">
    <template v-if="renderType === 'normal'">
      <span>{{ row[column.key] }}</span>
    </template>
    <template v-if="renderType === 'thead'">
      <span>{{ column.title }}</span>
    </template>
      <Expand
        v-if="renderType === 'render'"
        :column="column"
        :row="row"
        :index="index"
        :render="column.render">
      </Expand>
  </div>
</template>

<script>
import Expand from './render-dom.js'
export default {
  name: 'Cell',
  components: {
    Expand
  },
  data() {
    return {
      renderType: ''
    }
  },
  props: {
    column: {
      type: Object
    },
    row: {
      type: Object
    },
    index: Number,
  },
  created() {
    //do something after creating vue instance
    if (this.column.render) {
      this.renderType = 'render'
    }
    
    else {
      this.renderType = 'normal'
    }
  }
}
</script>

<style lang="less">
.cell {
  overflow: hidden;
  padding: 0 10px;
  line-height: 25px;
  white-space: normal;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>
