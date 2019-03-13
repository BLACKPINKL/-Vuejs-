let goods = {
  methods: {
    getGoodsList(page) {
      return this.request({
        url: '/manage/product/list.do',
        method: 'post',
        data: page
      })
    },
    setGoodsStatus(productInfo) {
      return this.request({
        url: '/manage/product/set_sale_status.do',
        method: 'post',
        data: productInfo
      })
    },
    getSearchProduct(productOp) {
      return this.request({
        url: '/manage/product/search.do',
        method: 'post',
        data: productOp
      })
    },
    uploadFile(fromData) {
      return this.request({
        url: '/manage/product/upload.do',
        method: 'post',
        data: fromData,
        headers: {'Content-Type': 'multipart/form-data'}
      })
    }
  }
}

export default goods
