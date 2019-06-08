<template>
  <nav class="navbar navbar-default top-navbar" :style="{width: getNavTopWidth}">
    <ul class="navbar-top-links">
      <!-- 侧边栏 toggle -->
      <li class="hamburger-container" @click.stop="navSideToggle">
        <svg-icon iconName="bars"/>
      </li>
      <!-- end -->
      <li class="dropdown navbar-links" @click.stop="handleDropdown">
        <a class="dropdown-toggle" href="javascript:;">
          <svg-icon iconName="dengchu"/> <svg-icon iconName="zuojiantou" className="arrow-rotate"/>
        </a>
        <Collapse-transition>
          <ul class="dropdown-menu dropdown-user" v-show="dropdown">
            <li><a href="https://github.com/BLACKPINKL" target="_blank"><svg-icon iconName="github"></svg-icon> My Github</a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="javascript:;" ref="dropdLogout">
                <svg-icon iconName="dengchu"/>退出登录
              </a>
            </li>
          </ul>
        </Collapse-transition>
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
import CollapseTransition from '../../collapse-transition'
  export default {
    name: 'nav-top',
    components: {
      CollapseTransition
    },
    methods: {
      handleDropdown(e) {
        this.toggleDropdown()
        if (e.target === this.$refs.dropdLogout) {
          this.userLogout()
        }
      },
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
      ...mapMutations(['setNavsideWidth', 'setNavbarToggle', 'toggleDropdown'])
    },
    computed: {
      ...mapGetters(['getIsMobile']),
      ...mapState(['navsideWidth', 'navbarToggle', 'dropdown']),
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
