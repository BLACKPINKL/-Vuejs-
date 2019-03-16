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
    getGoodsEdit(productId) {
      return this.request({
        url: '/manage/product/detail.do',
        method: 'post',
        data: productId
      })
    },
    checkNewGoodsInfo(newGoodsInfo) {
      let result = {
        msg: '',
        status: false
      }
      if (!newGoodsInfo.name.length) {
        result.msg = '请填写商品名称'
        return result
      }
      if (!newGoodsInfo.subtitle.length) {
        result.msg = '请填写商品标题'
        return result
      }
      if (!newGoodsInfo.parentCategoryId) {
        result.msg = '请选择一级分类'
        return result
      }
      if (!newGoodsInfo.categoryId) {
        result.msg = '请选择二级分类'
        return result
      }
      if (newGoodsInfo.price <= 0) {
        result.msg = '商品价格必须大于0'
        return result
      }
      if (newGoodsInfo.stock <= 0) {
        result.msg = '商品库存必须大于0'
        return result
      }
      if (!newGoodsInfo.subImages.length) {
        result.msg = '请选择商品图片进行上传'
        return result
      }
      if (!newGoodsInfo.detail.length) {
        result.msg = '请填写商品详情'
        return result
      }

      // 校验通过
      result.msg = '校验通过'
      result.status = true
      return result
    },
    saveNewGoods(newGoodsInfo) {
      return this.request({
        url: '/manage/product/save.do',
        method: 'post',
        data: newGoodsInfo
      })
    }
  }
}

export default goods
