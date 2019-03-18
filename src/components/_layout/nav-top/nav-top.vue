<template>
  <nav class="navbar navbar-default top-navbar">
          <ul class="nav navbar-top-links">
              <li class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;">
                      <i class="fa fa-user fa-lg fa-fw"></i> <i class="fa fa-caret-down"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-user">
                      <li><a href="javascript:;"><i class="fa fa-user fa-fw"></i> User Profile</a>
                      </li>
                      <li><a href="javascript:;"><i class="fa fa-gear fa-fw"></i> Settings</a>
                      </li>
                      <li class="divider"></li>
                      <li>
                        <a href @click.prevent="userLogout">
                          <i class="fa fa-sign-out fa-fw"></i> Logout
                        </a>
                      </li>
                  </ul>
                  <!-- /.dropdown-user -->
              </li>
              <!-- /.dropdown -->
          </ul>
          <!-- 模态框 -->
          <v-dialog />
      </nav>
</template>

<script>
import common from 'utils/common'
import user from 'service/user-service'
  export default {
    mixins: [common, user],
    data() {
      return {

      }
    },
    methods: {
      userLogout() {
        let that = this
        this.handleModal({
          title: 'SIGN OUT',
          text: '确定退出登录？',
          buttonText: '退出',
          handler() {
            that.handlerLogout()
          }
        })
      },
      handlerLogout() {
        this.logout().then((res) => {
          this.removeLocalStorage()
          this.modalHide()
          this.doLogin()
        })
        .catch((err) => {
          this.TipsModal({
            text: err.statusText || err.msg
          })
        })
      }
    }
  }
</script>
