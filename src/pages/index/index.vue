<template>
  <div id="wrapper">
    <Sidebar/>
    <div
      v-if="flag"
      @click="outSide"
      class="drawer-bg">
    </div>
    <!-- container -->
    <div id="page-wrapper" :style="{'margin-left': getMobile}">
      <Nav-top/>
      <div id="page-inner">
        <Content-title :title="routerName"/>
        <transition name="fade" mode="out-in">
          <keep-alive :include="getCachedRoutes">
            <router-view/>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NavTop from 'components/_layout/nav-top/nav-top'
import Sidebar from 'components/_layout/sidebar'
import ContentTitle from 'components/_layout/content-title/content-title'
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
  export default {
    components: {
      NavTop,
      Sidebar,
      ContentTitle
    },
    name: 'layout',
    watch: {
      getRouterName(val) {
        this.title = val
      },
      // 如果是移动端 点击侧边栏进行路由跳转时把侧边栏隐藏
      // 同时遮罩层关闭
      '$route': {
        handler(route) {
          this.asyncAddCacheRoutes(route)
          if (this.flag) {
            this.outSide()
          }
        }
      }
    },
    created() {
      this.asyncAddCacheRoutes(this.$route)
      // 移动端隐藏侧边栏
      if (this.flag) {
        this.outSide()
      }
    },
    methods: {
      outSide() {
        this.setNavbarToggle(false)
        this.setNavsideWidth('0px')
      },
      ...mapMutations(['setNavsideWidth', 'setNavbarToggle']),
      ...mapActions(['asyncAddCacheRoutes'])
    },
    computed: {
      getRouterName() {
        return this.routerName
      },
      // 获取需要缓存的路由数组
      getCachedRoutes() {
        return this.cacheRoutes
      },
      ...mapGetters(['getIsMobile']),
      ...mapState(['navsideWidth', 'navbarToggle','routerName', 'cacheRoutes']),
      // 移动端内容区不进行width计算
      getMobile() {
        return this.getIsMobile ? '' : this.navsideWidth
      },
      flag() {
        return this.getIsMobile && this.navbarToggle
      }
    }
  }
</script>

<style lang="less">
.drawer-bg {
  background-color: #000;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: .3;
  z-index: 150;
}

</style>
