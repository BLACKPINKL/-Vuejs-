<template>
  <Menu ref="menu" :defaultActive="activeMenu" :openedNames="openedNames">
    <Sidebar-item
    v-for="routes in getRoutes"
    :key="`sidebar-item-${routes.path}`"
    :item="routes"
    :baseUrl="routes.path"/>
  </Menu>
</template>

<script>
import {
  mapState
} from 'vuex'
import Menu from './menu.vue'
import SidebarItem from './sidebar-item.vue'
import routes from 'router/routes.js'
import { getOpenedNames } from 'utils'
export default {
  components: {
    Menu,
    SidebarItem
  },
  name: 'navSide',
  watch: {
    openedNames(name) {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  computed: {
    filterRoutes() {
      return routes.filter(item => {
        return !item.hidden
      })
    },
    getRoutes() {
      return this.filterRoutes
    },
    activeMenu() {
      let route = this.$route
      let { meta, path } = route
      // 如果当前路由信息中有 activeMenu字段
      // 说明当前的defaultActive需要指定
      if (meta && meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    openedNames() {
      return getOpenedNames(this.getRoutes, this.$route.name)
    },
    ...mapState(['navsideWidth'])
  }
}
</script>

<style lang="less">
// .nav-side {
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   z-index: 200;
//   background-color: skyblue;
//   overflow: hidden;
//   transition: width .3s linear;
// }
</style>
