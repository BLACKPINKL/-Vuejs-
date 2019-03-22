import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'
import vDialogs from 'v-dialogs'
import pagination from 'vuejs-uib-pagination'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import App from './App.vue'
import creatRouter from 'router/router.js'
import Store from 'store/store.js'
// 公共基础组件
import Card from 'components/_layout/card/card'

Vue.use(Router)
Vue.use(VueAxios, axios)
Vue.use(VModal, { dialog: true })
Vue.use(pagination)
Vue.use(Vuex)
Vue.use(vDialogs, { dialogMaxButton: false })

const router = creatRouter()
const store = Store()
Vue.component('v-Card', Card)

NProgress.configure({ showSpinner: false })
// 全局导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 设置标题
  store.state.routerName = to.name
  next()
})
router.afterEach((to, from, next) => {
  NProgress.done()
})

const vm = new Vue({
  render(c) {
    return c(App)
  },
  router,
  store
}).$mount('#app')
