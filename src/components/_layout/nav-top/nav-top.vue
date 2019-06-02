<template>
  <nav class="navbar navbar-default top-navbar" :style="{width: getNavTopWidth}">
    <ul class="navbar-top-links">
      <!-- 侧边栏 toggle -->
      <li class="hamburger-container" @click="navSideToggle">
        <svg-icon iconName="bars"></svg-icon>
      </li>
      <!-- end -->
      <li class="dropdown navbar-links" @click="show=!show">
        <a class="dropdown-toggle" href="javascript:;">
          <svg-icon iconName="dengchu"></svg-icon> <svg-icon iconName="zuojiantou" className="arrow-rotate"></svg-icon>
        </a>
        <ul class="dropdown-menu dropdown-user" v-show="show">
          <li><a href="https://github.com/BLACKPINKL" target="_blank"><svg-icon iconName="github"></svg-icon> My Github</a>
          </li>
          <li class="divider"></li>
          <li>
            <a href="javascript:;" @click.prevent="userLogout">
              <svg-icon iconName="dengchu"></svg-icon>退出登录
            </a>
          </li>
        </ul>
          <!-- /.dropdown-user -->
      </li>
        <!-- /.dropdown -->
    </ul>
</nav>
</template>

<script>
import {logout} from 'service/user-service'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { uTremoveUserInfo } from 'utils/cookie'
  export default {
    data() {
      return {
        show: false
      }
    },
    name: 'nav-top',
    methods: {
      userLogout() {
        this.uTconfirmTips('确定退出登录？', () => {
          this.handlerLogout()
        })
      },
      handlerLogout() {
        logout().then((res) => {
          uTremoveUserInfo('userInfo')
          this.uTdoLogin()
        })
        .catch((err) => {
          this.uTerrTips(err.msg || err.response.message)
        })
      },
      navSideToggle() {
        if (this.navbarToggle) {
          this.setNavsideWidth('0px')
        }else {
          this.setNavsideWidth('260px')
        }
        this.setNavbarToggle()
      },
      ...mapMutations(['setNavsideWidth', 'setNavbarToggle'])
    },
    computed: {
      ...mapGetters(['getIsMobile']),
      ...mapState(['navsideWidth', 'navbarToggle']),
      getNavTopWidth() {
        if (this.getIsMobile) {
          return '100%'
        }
        return `calc(100% - ${this.navsideWidth})`
      }
    }
  }
</script>

<style lang="less" scoped>
.arrow-rotate {
  transform: rotate(-90deg);
}
</style>
