import Vue from 'vue'
import App from './App.vue'
const vm = new Vue({
  render(c) {
    return c(App)
  }
}).$mount('#app')
