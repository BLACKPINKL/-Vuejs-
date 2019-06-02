<template>
  <section class="order-detail">
    <v-Card>
    <div class="row">
      <div class="col-md-12">
        <div class="order-detail-info">
          <p>订单号：{{ orderDeatilData.orderNo }}</p>
          <p>创建时间：{{ orderDeatilData.createTime }}</p>
        </div>
        <div class="order-detail-info">
          <p>收件人：{{orderDeatilData.receiverName}}</p>
          <p>订单状态：<Tag type="warning">{{ orderDeatilData.statusDesc }}</Tag></p>
        </div>
        <div class="order-detail-info">
          <p>支付方式：<Tag type="info">{{ orderDeatilData.paymentTypeDesc }}</Tag></p>
          <p>订单金额：{{ orderDeatilData.payment }}</p>
        </div>
      </div>
    </div>
    <Table :columns="columns"
    :data="orderDeatilData.orderItemVoList"/>
    </v-Card>
  </section>
</template>

<script>
import Table from 'components/table'
import {getOrderDetail} from 'service/order-service'
export default {
  props: ['orderNo'],
  components: {
    Table
  },
  name: 'orderDetail',
  data() {
    return {
      columns: [
        { key: 'productImage', title: '商品图片', align: 'center', width: 170, render: (h, {row, i}) => {
          return(
            <img width="100" height="100" src={row.productImage ? this.orderDeatilData.imageHost + row.productImage : '当前商品暂无图片'} alt=""/>
          )
        }},
        { key: 'productName', title: '商品信息' },
        { key: 'currentUnitPrice', title: '单价', width: 100, align: 'center' },
        { key: 'quantity', title: '数量', width: 120, align: 'center' },
        { key: 'totalPrice', title: '合计', align: 'center', width: 210 }
      ],
      orderNumber: this.orderNo,
      orderDeatilData: {}
    }
  },
  created() {
    this.loadOderDetail({ orderNo: this.orderNumber })

  },
  methods: {
    loadOderDetail(orderNo) {
      getOrderDetail(orderNo).then((res) => {
        this.orderDeatilData = Object.freeze(res.data)
      })
      .catch((err) => {
        this.uTerrTips(err.msg || err.response.message)
      })
    }
  }
}
</script>


<style lang="less">
.order-detail-info {
  display: inline-block;
  margin: 0 30px;
}
</style>
