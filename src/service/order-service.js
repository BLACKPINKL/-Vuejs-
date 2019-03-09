let order = {
  methods: {
    getOrderList(page) {
      return this.request({
        url: '/manage/order/list.do',
        method: 'post',
        data: page
      })
    },
    getSearchOrder(orderNo) {
      return this.request({
        url: '/manage/order/search.do',
        method: 'post',
        data: orderNo
      })
    },
    getOrderDetail(orderNo) {
      return this.request({
        url: '/manage/order/detail.do',
        method: 'post',
        data: orderNo
      })
    }
  }
}

export default order
