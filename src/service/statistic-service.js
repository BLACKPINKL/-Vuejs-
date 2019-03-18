const statistic = {
  methods: {
    getBaseCount() {
      return this.request({
        url: '/manage/statistic/base_count.do',
        method: 'post',
        data: ''
      })
    }
  }
}

export default statistic
