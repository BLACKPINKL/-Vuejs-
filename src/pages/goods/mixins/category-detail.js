export default {
  created() {
    //do something after creating vue instance
    if(this.$route.name == 'GoodsDetail'){
      this.loadGoodsEdit({productId: this.$route.params.categoryId})
      this.loadCategoryList(this.newProductInfo.parentCategoryId, 'oneCategoryList')
    }
  },
  data() {
    return {
    }
  },
  methods: {
    methodName() {

    }
  },
  computed: {
    isGoodsDetail() {
      if (this.$route.name == 'GoodsDetail') {
        return true
      }
      return false
    },
    // 禁用表单填写功能
    isDisabled() {
      return this.isGoodsDetail
    },
    isEditorDisabled() {
      return !this.isDisabled
    }
  }
}
