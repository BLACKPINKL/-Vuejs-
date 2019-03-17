<template>
  <div id="wrapper">
    <Nav-top></Nav-top>
    <Nav-side @getIsClosed="getIsClosed"></Nav-side>
    <!-- container -->
    <div id="page-wrapper" :class="[pageWrapper, { wrapClosed: isClosed }]">
      <Content-title :title="title"></Content-title>
      <div id="page-inner">
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
        isClosed: false,
        title: 'Charts',
        pageWrapper: 'page-wrapper',
        wrapClosed: 'wrap-closed'
      }
    },
    watch: {
      getRouterName(val, oldVal) {
        this.title = val
      }
    },
    methods: {
      getIsClosed(data) {
        this.isClosed = data
      }
    },
    computed: {
      getRouterName() {
        return this.$store.state.routerName
      }
    }
  }
</script>

<style lang="less">
@import '../../style/pagination.less';
</style>
