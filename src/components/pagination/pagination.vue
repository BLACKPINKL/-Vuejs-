<template>
  <paginate
    :page-count="pageTotal"
    :page-range="pageRange"
    :click-handler="handlePageChange"
    :prev-text="prevText"
    :next-text="nextText"
    :page-class="'page-item'"
    :container-class="'paginate'">
  </paginate>
</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
  components: {
    Paginate
  },
  name: 'Pagination',
  props: {
    // 总页数
    pageTotal: {
      type: [String, Number],
      required: true
    },
    // 视图中显示的页码数
    pageRange: {
      type: [String, Number],
      default: 4
    },
    // 上一页的自定义内容
    prevText: {
      type: String,
      default: '«'
    },
    // 下一页的自定义内容
    nextText: {
      type: String,
      default: '»'
    },
    // 外部传入自定义事件调用内部抛出的点击事件
    pageChange: {
      type: Function
    }
  },
  methods: {
    handlePageChange(pageNum) {
      this.$emit('pageChange', pageNum)
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
