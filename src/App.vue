<template>
  <div id="app" :class="['app', {'mobile': getMobile == 1}] ">
    <router-view/>
  </div>
</template>

<script>
import { uTsetUserInfo } from 'utils/cookie'
export default {
  name: 'app',
  created() {
    //do something after creating vue instance
    uTsetUserInfo('isMobile', this.getMobile)
  },
  methods: {
    // 判断是否是移动端
    // 不是则返回undefined
    isMobile() {
    	 let flag = window.navigator.userAgent.match(
         /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
       )
    	 return flag
    }
  },
  computed: {
    getMobile() {
      // 1是移动端 0代表pc端
      return this.isMobile() ? 1 : 0
    }
  }
}
</script>

<style lang="less">
// 弹窗在移动端时适配
.app.mobile {
  &~ .v-dialog-container {
    .v-dialog-dialog {
      width: 70% !important;
    }
  }
}
</style>
