import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'
import Echarts from 'vue-echarts'
import pagination from 'vuejs-uib-pagination'
import App from './App.vue'
import creatRouter from 'router/router.js'
import Store from 'store/store.js'
import Card from 'components/_layout/card/card'
Vue.use(Router)
Vue.use(VueAxios, axios)
Vue.use(VModal, { dialog: true })
Vue.use(pagination)
Vue.use(Vuex)

const router = creatRouter()
const store = Store()
Vue.component('v-chart', Echarts)
Vue.component('v-Card', Card)

// 全局导航守卫
router.afterEach((to, from) => {
  // 设置标题
  store.state.routerName = to.name
})

const vm = new Vue({
  render(c) {
    return c(App)
  },
  router,
  store
}).$mount('#app')
