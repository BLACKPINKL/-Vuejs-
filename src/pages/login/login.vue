<template>
  <section class="login-content">
    <div class="login-box">
      <form class="login-form">
          <h3 class="login-head">
            <i class="fa fa-user fa-lg"></i>
             SIGN IN
          </h3>
          <div class="form-group">
            <label for="username">USERNAME</label>
            <input type="text" v-model.trim="username" id="username" class="form-control" placeholder="admin名称">
          </div>
          <div class="form-group">
            <label for="password">PASSWORD</label>
            <input type="password" v-model.trim="password" id="password" class="form-control" placeholder="admin密码">
          </div>
          <div class="form-group">
            <input type="checkbox" id="checkbox" class="form-checkbox">
            <label for="checkbox">记住密码</label>
          </div>
          <div class="form-group btn-cont">
            <button @click.prevent="handlerUserInfo" class="submit-btn">
              <i class="fa fa-sign-in fa-lg fa-fw"></i>
              SIGN IN
            </button>
          </div>
      </form>
    </div>
    <v-dialog />
  </section>
</template>

<script>
import common from 'utils/common'
import user from 'service/user-service'
  export default {
    mixins: [common, user],
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      handlerUserInfo(e) {
        let userInfo = {
            username: this.username,
            password: this.password
          },
            vaildate = this.checkLogin(userInfo),
            that = this
        if (vaildate.status) {
          this.login(userInfo).then((res) => {
            this.setLocalStorage('userInfo', res.data)
            this.handleModal({
              title: vaildate.msg,
              text: '欢迎登录 - BLACKPINK',
              buttons: [
                { title: '确定', handler(){
                  that.modalHide()
                  that.gohome()
                }}
              ]
            })
          }).catch((err) => {
              this.TipsModal({
                text: err.msg || err.statusText
              })
          })
        }else {
          this.TipsModal({
            title: '验证不通过',
            text: vaildate.msg
          })
        }
      }

    }
  }
</script>

<style lang="less">
@import '../../style/login/login.less';
</style>
