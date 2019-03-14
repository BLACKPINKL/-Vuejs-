import qs from 'qs'
let Common = {
  methods: {
    request(params) {
      return new Promise((resolve, reject) => {
        this.axios({
          method: params.method,
          url: params.url,
          data: qs.stringify(params.data),
          responseType: 'json',
          headers: params.headers || {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
        .then((res) => {
          if (res.data.status === 0) {
            resolve(res.data)
          }else if(res.data.status === 10) {
            this.doLogin()
          }else {
            typeof reject === 'function' && reject(res.data)
          }
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    doLogin() {
      this.$router.push('/login')
    },
    gohome() {
      this.$router.push('home')
    },
    modalHide(name = 'dialog') {
      this.$modal.hide(name)
    },
    // 只负责弹出错误信息或成功信息  ( 无操作逻辑 )
    TipsModal(params) {
      this.$modal.show(params.name || 'dialog', {
        title: params.title,
        text: params.text,
        buttons: [
          {
            title: '关闭',
            handler: this.modalHide()
          }
        ]
      })
    },
    // 带有操作逻辑 点击按钮需要触发事件
    handleModal(params) {
      this.$modal.show(params.name || 'dialog', {
        title: params.title,
        text: params.text,
        buttons: params.buttons ||
        [
          { title: params.buttonText || '确定', handler: params.handler},
          { title: '关闭', handler: this.modalHide()}
        ]
      })
    },
    setLocalStorage(name = 'userInfo', data) {
      if (!data) {
        throw 'data is not definded'
      }
      window.localStorage.setItem(name, JSON.stringify(data))
    },
    getLocalStorage(name = 'userInfo') {
      return JSON.parse(window.localStorage.getItem(name)) || ''
    },
    removeLocalStorage(name = 'userInfo') {
      if (this.getLocalStorage(name)) {
        window.localStorage.removeItem(name)
      }else {
        throw 'name is not definded'
      }
    },
    joinArr(arr, sign) {
      if (!arr.length) {
        return arr
      }
      return arr.join(sign)
    }
  }
}

export default Common
