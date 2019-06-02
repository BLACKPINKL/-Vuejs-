<template>
  <section class="login-content">
    <div class="login-box">
      <form class="login-form">
          <h3 class="login-head">
            <svg-icon iconName="dengluyonghu"></svg-icon>
             SIGN IN
          </h3>
          <div class="form-group">
            <label for="username">USERNAME</label>
            <input type="text" v-model.trim="username" id="username" class="form-control" placeholder="请输入账号">
          </div>
          <div class="form-group">
            <label for="password">PASSWORD</label>
            <input type="password" v-model.trim="password" id="password" class="form-control" placeholder="请输入密码">
          </div>
          <div class="form-group">
            <label>账号：admin</label>
            <label style="display: block">密码：admin</label>
          </div>
          <div class="form-group btn-cont">
            <Button @click.native.prevent="handlerUserInfo" className="fei-btn-block" type="success">
              <svg-icon iconName="denglu"/>
              SIGN IN
            </Button>
          </div>
      </form>
    </div>
  </section>
</template>

<script>
import { checkLogin, login } from 'service/user-service'
import { uTsetUserInfo } from 'utils/cookie'
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    name: 'login',
    methods: {
      handlerUserInfo(e) {
        let userInfo = {
            username: this.username,
            password: this.password
            },
            vaildate = checkLogin(userInfo)
        if (vaildate.status) {
          login(userInfo).then((res) => {
            uTsetUserInfo('userInfo', res.data)
            this.uTgohome()
          })
          .catch((err) => {
            this.uTerrTips(err.msg || err.response.message)
          })
        }
        else {
          this.uTerrTips(vaildate.msg)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
@import './login.less';
</style>
