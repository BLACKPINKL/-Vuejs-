<template>
  <div id="wrapper">
    <Nav-top></Nav-top>
    <Nav-side @getIsClosed="getIsClosed"></Nav-side>
    <!-- container -->
    <div id="page-wrapper" :class="[pageWrapper, { wrapClosed: isClosed }]">
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
  export default {
    components: {
      NavTop,
      NavSide
    },
    data() {
      return {
        isClosed: false,
        pageWrapper: 'page-wrapper',
        wrapClosed: 'wrap-closed'
      }
    },
    methods: {
      getIsClosed(data) {
        this.isClosed = data
      }
    }
  }
</script>
