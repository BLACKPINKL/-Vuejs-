let category = {
  methods: {
    getCategoryList(categoryId) {
      return this.request({
        url: '/manage/category/get_category.do',
        method: 'post',
        data: categoryId
      })
    }
  }
}

export default category
