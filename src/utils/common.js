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
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
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
      this.$router.push('login')
    },
    gohome() {
      this.$router.push('home')
    },
    modalHide(name) {
      this.$modal.hide(name)
    },
    modalShow(name, op) {
      this.$modal.show(name, op)
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
    }
  }
}

export default Common
