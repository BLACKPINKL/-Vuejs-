<template>
  <section class="order-detail">
    <v-Card>
    <div class="row">
      <div class="col-md-12">
        <p>订单号:    {{orderDeatilData.orderNo }}</p>
        <p>创建时间:    {{orderDeatilData.createTime}}</p>
        <p>收件人:    {{orderDeatilData.receiverName}}</p>
        <p>订单状态:    {{orderDeatilData.statusDesc}}</p>
        <p>支付方式:    {{orderDeatilData.paymentTypeDesc}}</p>
        <p>订单金额:    {{orderDeatilData.payment}}</p>
      </div>
    </div>
    <Table :thead="thead">
      <template v-slot:tbody>
        <tr v-for="(item, index) in orderDeatilData.orderItemVoList"
        :key="index">
          <td><img width="100" height="100" :src="item.productImage ? orderDeatilData.imageHost + item.productImage : '当前商品没有图片'" alt=""></td>
          <td>{{item.productName}}</td>
          <td>{{item.currentUnitPrice}}</td>
          <td>{{item.quantity}}</td>
          <td>{{item.totalPrice}}</td>
        </tr>
      </template>
    </Table>
    </v-Card>
    <dialog />
  </section>
</template>

<script>
import table from 'components/table-list/table-list.vue'
import common from 'utils/common'
import order from 'service/order-service'
export default {
  mixins: [common, order],
  props: ['orderNo'],
  components: {
    'Table': table
  },
  data() {
    return {
      thead: ['商品图片', '商品信息', '单价', '数量', '合计'],
      orderNumber: this.orderNo,
      orderDeatilData: {}
    }
  },
  created() {
    this.loadOderDetail({ orderNo: this.orderNumber })

  },
  methods: {
    loadOderDetail(orderNo) {
      this.getOrderDetail(orderNo).then((res) => {
        this.orderDeatilData = res.data
      })
      .catch((err) => {
        this.TipsModal({
          text: err.msg || err.statusText
        })
      })
    }
  }
}
</script>
