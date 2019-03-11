<template>
  <section class="order">
    <div class="row">
      <div class="col-md-12">
        <select class="form-control">
          <option>按订单号查询</option>
        </select>
        <input v-model="orderNo" type="text" class="form-control">
        <button @click="handlerSearchOrder" class="btn btn-md btn-success">搜索</button>
      </div>
    </div>
    <Table :thead="thead">
      <template v-slot:tbody>
          <tr v-for="(item, index) in tableData.list" :key="index">
            <td>{{ item.orderNo }}</td>
            <td>{{ item.receiverName }}</td>
            <td>{{ item.statusDesc }}</td>
            <td>{{ item.payment }}</td>
            <td>{{ item.createTime }}</td>
            <td><router-link :to="'/order/detail/' + item.orderNo" class="btn btn-sm btn-primary">查看</router-link></td>
          </tr>
      </template>
    </Table>
    <div class="row">
      <div class="col-sm-12">
        <div class="pagination-box" style="text-align: right">
        <uib-pagination
        :totalItems="totalItems"
        :items-per-page="page.pageSize"
        v-model="pagination"
        :max-size="5"
        class="pagination-md"
        :boundary-links="true"
        :force-ellipses="true"
        @change="pageChanged">
       </uib-pagination>
       </div>
      </div>
    </div>
    <dialog />
  </section>
</template>

<script>
import table from 'components/table-list/table-list.vue'
import common from 'utils/common'
import order from 'service/order-service'
import {
  mapState,
  mapMutations,
  mapGetters
} from 'vuex'
export default {
  mixins: [common, order],
  components: {
    'Table': table
  },
  data() {
    return {
      thead: [
        '订单号',
        '收件人',
        '订单状态',
        '订单总价',
        '创建时间',
        '操作'
      ],
      tableData: {},
      orderNo: '',
      pagination: {
        currentPage: 1
      }
    }
  },
  created() {
    this.loadOrderList(this.page)
  },
  methods: {
    loadOrderList(page) {
      this.getOrderList(page).then((res) => {
        this.tableData = res.data
        this.setPageTotal(this.tableData.total)
      })
      .catch((err) => {
        this.TipsModal({
          text: err.msg || err.statusText
        })
      })
    },
    loadSearchOrder(orderNo) {
      this.getSearchOrder(orderNo).then((res) => {
        this.tableData = res.data
        this.setPageTotal(this.tableData.total)
      })
      .catch((err) => {
        this.TipsModal({
          text: err.msg || err.statusText
        })
      })
    },
    pageChanged() {
      this.setPageNum(this.pagination.currentPage)
      this.loadOrderList(this.page)
    },
    // 搜索订单号
    handlerSearchOrder() {
      if (!this.orderNo) {
        this.loadOrderList(this.page)
        return
      }
      this.loadSearchOrder({
        orderNo: this.orderNo
      })
    },
    ...mapMutations(['setPageNum', 'setPageTotal'])
  },
  computed: {
    ...mapState(['page', 'totalItems'])
  }
}
</script>

<style lang="less">
  .form-control {
    display: inline-block;
    width: 15%;
  }
</style>
