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
        :items-per-page="itemsPage"
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
      page: {
        pageSize: 10,
        pageNum: 1
      },
      pagination: {
        // 点击的那一页
        currentPage: 1
      },
      // 一共显示多少条页码
      totalItems: 15,
      // 一页展示多少条数据
      itemsPage: 10
    }
  },
  created() {
    //do something after creating vue instance
    this.loadOrderList(this.page)
  },
  methods: {
    loadOrderList(page) {
      this.getOrderList(page).then((res) => {
        // console.log(res);
        this.tableData = res.data
        this.totalItems = this.tableData.total
        this.itemsPage = this.tableData.pageSize
      })
      .catch((err) => {
        this.modalShow('dialog', {
          text: err.msg || err.statusText,
          buttons: [
            { title: '确定', handler: ()=> this.modalHide('dialog') }
          ]
        })
      })
    },
    loadSearchOrder(orderNo) {
      this.getSearchOrder(orderNo).then((res) => {
        this.tableData = res.data
        this.totalItems = this.tableData.total
        this.itemsPage = this.tableData.pageSize
      })
      .catch((err) => {
        this.modalShow('dialog', {
          text: err.msg || err.statusText,
          buttons: [
            { title: '确定', handler: () => this.modalHide('dialog') }
          ]
        })
      })
    },
    pageChanged() {
      this.page.pageNum = this.pagination.currentPage
      this.loadOrderList(this.page)
    },
    handlerSearchOrder() {
      if (!this.orderNo) {
        this.loadOrderList()
        return
      }
      this.loadSearchOrder({
        orderNo: this.orderNo
      })
    }
  }
}
</script>

<style lang="less">
  .form-control {
    display: inline-block;
    width: 15%;
  }
</style>
