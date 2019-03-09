<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="table-responsive">
        <table class="table table-bordered table-hover dataTable no-footer">
          <thead>
              <tr>
                <th v-for="(item, index) in list" :key="index">{{ item }}</th>
              </tr>
          </thead>
          <tbody>
            <slot name="tbody"></slot>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    thead: Array
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.list = this.thead
  }
}
</script>

<style lang="less">

</style>
