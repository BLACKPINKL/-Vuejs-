import {getGoodsEdit} from 'service/goods-service'
export default {
  created() {
    //do something after creating vue instance
    if(this.$route.name == 'GoodsEdit'){
      let categoryId = this.$route.params.categoryId
      this.loadGoodsEdit({productId: categoryId})
      this.loadCategoryList(this.newProductInfo.parentCategoryId, 'oneCategoryList')
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 渲染编辑商品页
    loadGoodsEdit(productId) {
      getGoodsEdit(productId).then((res) => {
        this.newProductInfo = res.data
        // 把保存图片的字段转成数组
        this.newProductInfo.subImages = this.newProductInfo.subImages.split(',')
        this.uploadImg = this.newProductInfo.subImages
      })
      .catch((err) => {
        this.uTerrTips(err.msg || err.response.message)
      })
    },
    // 删除无用字段
    removeNewProductInfo() {
      if (this.isGoodsEdit) {
        delete this.newProductInfo.mainImage
        delete this.newProductInfo.createTime
        delete this.newProductInfo.updateTime
        delete this.newProductInfo.imageHost
      }
    },
    // 获取富文本中的html内容
    getContext(html) {
      this.newProductInfo.detail = html
    }
  },
  computed: {
    isGoodsEdit() {
      return this.$route.name == 'GoodsEdit'
    }
  }
}
