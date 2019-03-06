import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'
import Echarts from 'vue-echarts'
import pagination from 'vuejs-uib-pagination'
import App from './App.vue'
import creatRouter from 'router/router.js'

Vue.use(Router)
Vue.use(VueAxios, axios)
Vue.use(VModal, { dialog: true })
Vue.use(pagination)

const router = creatRouter()
Vue.component('v-chart', Echarts)

const vm = new Vue({
  render(c) {
    return c(App)
  },
  router
}).$mount('#app')
