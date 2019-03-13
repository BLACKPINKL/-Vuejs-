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



Vue.use(Router)
Vue.use(VueAxios, axios)
Vue.use(VModal, { dialog: true })
Vue.use(pagination)
Vue.use(Vuex)

const router = creatRouter()
const store = Store()
Vue.component('v-chart', Echarts)

const vm = new Vue({
  render(c) {
    return c(App)
  },
  router,
  store
}).$mount('#app')
