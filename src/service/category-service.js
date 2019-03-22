let category = {
  methods: {
    getCategoryList(categoryId) {
      return this.request({
        url: '/manage/category/get_category.do',
        method: 'post',
        data: categoryId
      })
    },
    setName(categoryInfo) {
      return this.request({
        url: '/manage/category/set_category_name.do',
        method: 'post',
        data: categoryInfo
      })
    },
    addCate(categoryInfo) {
      return this.request({
        url: '/manage/category/add_category.do',
        method: 'post',
        data: categoryInfo
      })
    },
    vaildateAddCate(categoryInfo) {
      let result = {
        status: false,
        msg: ''
      }
      if (!categoryInfo.parentId) {
        result.msg = '请选择分类'
        return result
      }
      if (!categoryInfo.categoryName) {
        result.msg = '请填写品类名称'
        return result
      }
      result.status = true
      result.msg = '验证通过'
      return result
    }
  }
}

export default category
