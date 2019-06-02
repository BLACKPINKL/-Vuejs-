<template>
  <table class="table-body" cellspacing="0" cellpadding="0" border="0">
    <Colgroup :columns="columns"></Colgroup>
    <tbody>
      <template v-for="(item, index) in tableData">
        <tr :key="item._rowKey">
          <td :class="{[`align-${column.align}`]: column.align}" v-for="(column, index) in columns" >
            <Cell
              :column="column"
              :row="item"
              :index="item._rowKey"
            ></Cell>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import Colgroup from './colgroup.vue'
import Cell from './cell.vue'
export default {
  name: 'table-body',
  components: {
    Colgroup,
    Cell
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  }
}
</script>
