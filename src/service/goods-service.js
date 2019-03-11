let goods = {
  methods: {
    getGoodsList(page) {
      return this.request({
        url: '/manage/product/list.do',
        method: 'post',
        data: page
      })
    }
  }
}

export default goods
