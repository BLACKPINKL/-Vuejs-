<template>
  <nav class="navbar navbar-default top-navbar" :style="getNavSideToggle">
    <ul class="nav navbar-top-links">
      <!-- 侧边栏 toggle -->
      <li class="hamburger-container" @click="navSideToggle">
        <i class="fa fa-bars fa-2x"></i>
      </li>
      <!-- end -->
      <li class="dropdown navbar-links">
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
              <i class="fa fa-sign-out fa-fw"></i>退出登录
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
import { mapState } from 'vuex'
  export default {
    mixins: [common, user],
    data() {
      return {
        navTopToggle: {
          width: '100%'
        }
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
      },
      navSideToggle() {
        if (this.Mobile()) {
          this.$store.commit('setIsMobile')
          return false
        }
        this.$store.commit('setNavbarToggle')
      },
      // 点击时 判断当前屏幕宽度是否是移动端
      Mobile() {
        let { body } = document
        let rect = body.getBoundingClientRect()
        return (rect.width - 1) < this.pageWidth
      }
    },
    computed: {
      getNavSideToggle() {
        if (this.isMobile) {
          return null
        }
        return this.$store.state.navbarToggle ? this.navTopToggle : null
      },
      ...mapState(['isMobile', 'pageWidth'])
    }
  }
</script>
