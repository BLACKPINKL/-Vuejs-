<template>
  <nav class="navbar navbar-default top-navbar" :style="{width: getNavTopWidth}">
    <ul class="navbar-top-links">
      <li class="hamburger-container" @click.stop="navSideToggle">
        <svg-icon iconName="bars" className="bars"/>
      </li>
      <Dropdown @on-click="handleDropdown">
        <li class="navbar-links">
          <a href="javascript:;">
            <svg-icon iconName="dengchu"/>
            <svg-icon
              iconName="zuojiantou"
              className="arrow-rotate"/>
          </a>
        </li>
          <Dropdown-menu slot="list">
            <Dropdown-item name="dropGithub">
              <a href="https://github.com/BLACKPINKL" target="_blank">
                <svg-icon iconName="github"/> Github
              </a>
            </Dropdown-item>
            <Dropdown-item name="dropdLogout">
              <span>
                <svg-icon iconName="dengchu"/> 退出登录
              </span>
            </Dropdown-item>
          </Dropdown-menu>
      </Dropdown>
    </ul>
</nav>
</template>

<script>
import { logout } from 'service/user-service'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { uTremoveUserInfo } from 'utils/cookie'
import Dropdown from 'components/dropdown'
  export default {
    name: 'nav-top',
    components: {
      Dropdown,
      DropdownMenu: Dropdown.menu,
      DropdownItem: Dropdown.item
    },
    methods: {
      handleDropdown(name) {
        if (name === 'dropdLogout') this.userLogout()
      },
      userLogout() {
        this.uTconfirmTips('确定退出登录？', () => this.handlerLogout())
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
