let user = {
  methods: {
    login(userInfo) {
      return this.request({
        url: '/manage/user/login.do',
        method: 'post',
        data: userInfo
      })
    },
    logout() {
      return this.request({
        url: '/user/logout.do',
        method: 'post',
        data: ''
      })
    },
    checkLogin(userInfo) {
      let result = {
        status: false,
        meg: ''
      }
      if (!userInfo.username.length) {

        result.msg = '用户名不能为空'
        return result
      }
      if (userInfo.username.length <= 2 ) {
        result.msg = '太短了~'
        return result
      }
      if (!userInfo.password.length) {
        result.msg = '密码不能为空'
        return result
      }
      if (userInfo.password.length <= 2 ) {
        result.msg = '太短了~'
        return result
      }
      console.log(typeof userInfo.username);
      result.status = true
      result.msg = '验证通过'
      return result
    }
  }
}

export default user
