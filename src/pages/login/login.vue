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
            vaildate = this.checkLogin(userInfo)
        if (vaildate.status) {
          this.login(userInfo).then((res) => {
            // console.log(res);
            this.modalShow('dialog', {
              title: vaildate.msg,
                text: '欢迎登录 - BLACKPINK',
                buttons: [
                  {
                    title: '确定',
                    handler: () => {
                       this.modalHide('dialog')
                       this.gohome()
                     }
                  }
                ]
            })
          }).catch((err) => {
              this.modalShow('dialog', {
                title: '验证不通过',
                  text: err.msg,
                  buttons: [
                    {
                      title: '确定',
                      handler: () => {
                         this.modalHide('dialog')
                       }
                    }
                  ]
              })
          })
        }else {
          this.modalShow('dialog', {
            title: '验证不通过',
              text: vaildate.msg,
              buttons: [
                {
                  title: '确定',
                  handler: () => {
                     this.modalHide('dialog')
                   }
                }
              ]
          })
        }
      }
      
    }
  }
</script>

<style lang="less">
@themeColor: #1CC09F;
.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: @themeColor;
  .login-box {
    padding: 40px;
    background-color: #fff;
    border: 1px solid #ccc;
    min-width: 350px;
    min-height: 390px;
    box-shadow: 0px 29px 147.5px 102.5px rgba(0, 0, 0, 0.05), 0px 29px 95px 0px rgba(0, 0, 0, 0.16);
    .login-form .login-head{
      text-align: center;
      font-size: 23px;
      color: #000;
      font-weight: 550;
      border-bottom: 1px solid #ddd;
      padding-bottom: 20px;
      margin-bottom: 20px;
    }
    .form-group {
      margin-bottom: 1em;
      label {
        display: inline-block;
        font-size: 13px;
        font-weight: 600;
        color: #666;
        margin-bottom: 0.5em;
        user-select: none;
      }
      .form-control {
        width: 100%;
        display: block;
        padding: 0.375rem 0.75rem;
        border: 2px solid #ddd;
        border-radius: 3px;
        line-height: 1.5;
        color: #495057;
        font-size: 0.875rem;
        background-color: #fff;
        &:focus {
          border-color: @themeColor;
        }
      }
      .submit-btn {
        width: 100%;
        border: 2px solid transparent;
        background-color: @themeColor;
        padding: 0.375rem 0.75rem;
        line-height: 1.5;
        color: #fff;
        font-size: 0.875rem;
        font-weight: 700;
      }
    }
    .btn-cont {
      margin-bottom: 0;
    }
  }
}
</style>
