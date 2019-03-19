<template>
  <div id="wrapper">
    <Nav-side></Nav-side>
    <!-- container -->
    <div id="page-wrapper" class="page-wrapper" :style="getNavSideToggle">
      <Nav-top></Nav-top>
      <div id="page-inner">
        <Content-title :title="title"></Content-title>
        <router-view></router-view>
      </div>
    </div>
  </div>
<!-- /. PAGE INNER  -->
</template>

<script>
import 'style/custom-styles.css'
import NavTop from 'components/_layout/nav-top/nav-top'
import NavSide from 'components/_layout/nav-side/nav-side'
import ContentTitle from 'components/_layout/content-title/content-title'
  export default {
    components: {
      NavTop,
      NavSide,
      ContentTitle
    },
    data() {
      return {
        title: 'Charts',
        pageWrapToggle: {
          'margin-left': '0',
          'overflow': 'hidden'
        }
      }
    },
    watch: {
      getRouterName(val, oldVal) {
        this.title = val
      }
    },
    computed: {
      getRouterName() {
        return this.$store.state.routerName
      },
      getNavSideToggle() {
        return this.$store.state.navbarToggle ? this.pageWrapToggle : null
      }
    }
  }
</script>

<style lang="less">
@import '../../style/pagination.less';
</style>
