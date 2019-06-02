<template>
    <table class="table-head" cellspacing="0" cellpadding="0" border="0">
      <Colgroup :columns="columns"></Colgroup>
      <thead>
          <tr>
            <template v-for="item in columns">
              <th
                :class="{[`align-${item.align}`]: item.align}"
                :key="item.columnKey">
                <div class="cell">
                  <span>{{ item.title }}</span>
                </div>
              </th>
            </template>
          </tr>
      </thead>
    </table>
</template>

<script>
import Colgroup from './colgroup.vue'
export default {
  name: 'table-head',
  components: {
    Colgroup
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  }
}
</script>
