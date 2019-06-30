<template>
  <section class="order">
    <v-Card>
    <div class="row order-from">
      <div class="col-md-12">
        <Select style="width: 150px">
          <Option>按订单号查询</Option>
        </Select>
        <input v-model="orderNo" type="text" class="form-control">
        <Button
          @click.native="handlerSearchOrder"
          type="success">
          <svg-icon iconName="chaxun"/>
          搜索
        </Button>
        <!-- <button @click="handlerSearchOrder" class="btn btn-md btn-success">搜索</button> -->
      </div>
    </div>
    <Table
    :loading="loading"
    :columns="columns"
    :data="tableData.list"/>
    <div class="row">
      <div class="col-sm-12">
        <div class="pagination-box">
          <Pagination
            :pageTotal="totalItems"
            @pageChange="pageChanged">
          </Pagination>
       </div>
      </div>
      </div>
    </v-Card>
  </section>
</template>

<script>
import Table from 'components/table'
import Tag from 'components/tag'
import Button from 'components/button'
import { getOrderList, getSearchOrder } from 'service/order-service'
import {
  mapState,
  mapMutations,
  mapGetters
} from 'vuex'
export default {
  name: 'order',
  components: {
    Table,
    Button,
    Tag
  },
  data() {
    return {
      columns: [
        { key: 'orderNo', title: '订单号', align: 'center', width: 170 },
        { key: 'receiverName', title: '收件人' },
        { key: 'statusDesc', title: '订单状态', width: 100, align: 'center', render: (h, {row, index, column}) => {
          return (
            <Tag type={row.status === 0 ? 'success' : 'warning'}>{row[column.key]}</Tag>
          )
        }},
        { key: 'payment', title: '订单总价', width: 120, align: 'center' },
        { key: 'createTime', title: '创建时间', align: 'center', width: 210 },
        { key: 'handler', title: '操作', align: 'center', width: 100, render(h, {row, i}) {
          return (
            <router-link to={'/order/detail/' + row.orderNo}>
              <Button type="primary" size="small">
                查看
              </Button>
            </router-link>
          )
        }}
      ],
      tableData: {},
      orderNo: ''
    }
  },
  created() {
    this.loadOrderList(this.page)
  },
  methods: {
    loadOrderList(page) {
      getOrderList(page).then((res) => {
        this.tableData = Object.freeze(res.data)
        this.setPageTotal(this.tableData.pages)
      })
      .catch((err) => {
        this.uTerrTips(err.msg || err.response.message)
      })
    },
    loadSearchOrder(orderNo) {
      getSearchOrder(orderNo).then((res) => {
        this.tableData = res.data
        this.setPageTotal(this.tableData.pages)
      })
      .catch((err) => {
        this.uTerrTips(err.msg || err.response.message)
      })
    },
    pageChanged(pageNum) {
        this.setPageNum(pageNum)
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
    ...mapState(['page', 'totalItems', 'loading'])
  }
}
</script>

<style lang="less" scoped>
  .order-from {
    margin-bottom: 10px;
  }
  .form-control {
    display: inline-block;
    width: 15%;
    &:focus {
      border: 1px solid #1cc09f;
    }
  }
</style>
