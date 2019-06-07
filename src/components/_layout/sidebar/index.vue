<template>
  <!-- navside -->
  <nav :class="['navbar-default', 'navbar-side', {'mobile-navside': getIsMobile}]" :style="{width: navsideWidth}">
      <div class="sidebar-collapse sidebar-collapse-wrap">
        <div class="navbar-logo">
          <router-link class="navbar-brand" to="/">
            <svg-icon iconName="logo" className="logo"></svg-icon>
            <strong>MASTER</strong>
          </router-link>
        </div>
          <div class="user-info">
            <img class="user-head"
            src="../../../assets/images/user-head.jpg"
            alt="admin">
            <div class="user-body">
              <p class="user-name">{{ username }}</p>
              <p class="user-msg">Frontend Developer</p>
            </div>
          </div>
            <sidebar-menu/>
      </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import sidebarMenu from './components/sidebar'
import {uTgetUserInfo} from 'utils/cookie'
export default {
  components: {
    sidebarMenu
  },
  name: 'nav-side',
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.username = uTgetUserInfo('userInfo').username
  },
  computed: {
    getRoutes() {
      return this.$router.options.routes
    },
    ...mapGetters(['getIsMobile']),
    ...mapState(['navsideWidth'])
  }
}
</script>

<style lang="less">
@import './navside.less';
</style>
