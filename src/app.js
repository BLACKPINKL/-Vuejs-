import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import creatRouter from 'router/router.js'

Vue.use(Router)
const router = creatRouter()
const vm = new Vue({
  render(c) {
    return c(App)
  },
  router
}).$mount('#app')
