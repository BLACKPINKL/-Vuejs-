import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import vDialogs from 'v-dialogs'
import Pagination from 'components/pagination'
import NProgress from 'nprogress'
import App from './App.vue'
import router from 'router/router.js'
import Store from 'store/store.js'
import common from 'utils/common.js'
import { uTgetUserInfo } from 'utils/cookie.js'
import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import 'style/custom-styles.css'
// 自动化循环引入 svg
import 'assets/icons/index'
// 公共基础组件
import Card from 'components/_layout/card/card'
import SvgIcon from 'components/_layout/icon-svg/icon-svg'
import Button from 'components/button'
import Tag from 'components/tag'

Vue.use(Vuex)
Vue.use(vDialogs, { dialogMaxButton: false })
// 全局混入 公共方法
Vue.mixin(common)

const store = Store()

// 注册公共基础组件
Vue.component('svg-icon', SvgIcon)
Vue.component('v-Card', Card)
Vue.component('Button', Button)
Vue.component('Tag', Tag)
Vue.component('Pagination', Pagination)

// NProgress 配置
NProgress.configure({ showSpinner: false })

// 全局导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
  }
  else {
    if (uTgetUserInfo('userInfo')) {
      // 设置标题
      store.dispatch('asyncSetRouterName', to.name)
      next()
    }
    else {
      next({path: '/login'})
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

const vm = new Vue({
  render: c => c(App),
  router,
  store
}).$mount('#app')

// js模块开启 HMR
if (module.hot) {
  module.hot.accept()
}
