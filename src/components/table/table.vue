<template>
  <div class="table" :style="styles">
    <div class="table-head-wrapper">
      <table-head :columns="cloneColumns"/>
    </div>
    <div class="table-body-wrapper">
      <table-body :table-data="cloneData" :columns="cloneColumns"/>
    </div>
    <transition name="fade">
      <Loding v-if="loading" :styles="loadingStyle"></Loding>
    </transition>
  </div>
</template>

<script>
import tableHead from './table-head.vue'
import tableBody from './table-body.vue'
import Loding from '../loading'
import { deepCopy } from 'utils'

let rowKey = 1
let columnKey = 1
export default {
  name: 'Table',
  components: {
    tableHead,
    tableBody,
    Loding
  },
  data() {
    return {
      cloneData: [],
      cloneColumns: this.makeColumns()
    }
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: true
    },
    styles: {
      type: [Object, String],
      default: ''
    },
    className: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  created() {
    //do something after creating vue instance
    this.cloneData = this.makeData()
  },
  watch: {
    data: {
      handler(val) {
        this.cloneData = this.makeData()
      },
      deep: true
    },
    columns: {
      handler(val) {
        this.cloneColumns = this.makeColumns()
      },
      deep: true
    }
  },
  methods: {
    makeData() {
      let cloneData = deepCopy(this.data)
      cloneData.forEach((item, i) => {
        item._index = i
        item._rowKey = rowKey++
      })
      return cloneData
    },
    makeColumns() {
      let cloneColumns = deepCopy(this.columns)
      cloneColumns.forEach((item, i) => {
        item._index = i
        item._columnKey = columnKey++
      })
      return cloneColumns
    }
  },
  computed: {
    loadingStyle() {
      return this.loading ? {'z-index': 10} : ''
    }
  }
}
</script>

<style lang="less">
.bordered(@name: border) {
  @{name}: 1px solid #d9dee2;
}
.table {
  .bordered();
  border-right: none;
  border-bottom: none;
  &-head-wrapper,
  &-body-wrapper {
    overflow: hidden;
    .table-head,
    .table-body {
      table-layout: fixed;
      width: 100%;
      overflow: hidden;
      border-collapse: collapse;
      td,th {
        padding: 10px 0;
        color: #515a6e;
        .bordered(border-right);
        .bordered(border-bottom);
        &.align-center {
          text-align: center;
        }
        &.align-left {
          text-align: left;
        }
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
/* .fade-leave-active below version 2.1.8 */
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
