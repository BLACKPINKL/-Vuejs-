<template>
  <nav class="navbar navbar-default top-navbar" role="navigation">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
              <router-link class="navbar-brand" to="/"><i class="fa fa-comments"></i> <strong>MASTER </strong></router-link>
          </div>

          <ul class="nav navbar-top-links navbar-right">
              <li class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;" aria-expanded="false">
                      <i class="fa fa-user fa-lg fa-fw"></i> <i class="fa fa-caret-down"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-user">
                      <li><a href="javascript:;"><i class="fa fa-user fa-fw"></i> User Profile</a>
                      </li>
                      <li><a href="javascript:;"><i class="fa fa-gear fa-fw"></i> Settings</a>
                      </li>
                      <li class="divider"></li>
                      <li><a href="javascript:;" @click="handleModal"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
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
      handleModal() {
        this.modalShow('dialog', {
          title: 'SIGN OUT',
          text: '确定退出登录？',
          buttons: [
            {
              title: 'Logout',
              default: true,
              handler: () => { this.handlerLogout() }
            },
            {
              title: 'Close',
              handler: () => { this.modalHide('dialog') }
            }
          ]
        })
      },
      handlerLogout() {
        this.logout().then((res) => {
          this.removeLocalStorage()
          this.modalHide('dialog')
          this.doLogin()
        })
        .catch((err) => {
          alert(err.msg)
        })
      }
    }
  }
</script>
