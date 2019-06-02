import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'router/router'
import Store from 'store/store'
import { uTremoveUserInfo } from 'utils/cookie'
import qs from 'qs'

Vue.use(Vuex)

const store = Store()
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 请求开始时 显示loading动画 dsafas
  store.commit('showLoading')
  return config
}, (error) => {
  return Promise.reject(error)
})


// 响应拦截器
axios.interceptors.response.use(res => {
  // 后端返回我们想要的数据
  if (res.data.status == 0) {
    // 数据加载完成 关闭loading动画
    store.commit('closeLoading')
    return res.data
  }
  // 当前需要登录
  else if (res.data.status == 10) {
    uTremoveUserInfo('userInfo')
    Router.push({path: '/login'})
    return res.data
  }
  // 后端返回错误信息
  else {
    return Promise.reject(res.data)
  }
}, error => {
  // 响应失败
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.response.message = '请求错误(400)'
        break;
      case 403:
        error.response.message = '拒绝访问(403)'
        break;
      case 404:
        error.response.message = '请求未找到(404)'
        break;
      case 500:
        error.response.message = '服务器异常(403)'
        break;
    }
  }else {
    error.message = '连接服务器失败'
  }
  return Promise.reject(error)
})


// 封装post请求
export const httpPost = (params) => {
  return axios.post(params.url, qs.stringify(params.data), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  })
}
// get请求
export const httpGet = (params) => {
  return axios.get(params.url, {
    params: params.data
  })
}
