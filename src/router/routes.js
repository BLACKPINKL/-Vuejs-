import index from 'pages/index/index.vue'
import home from 'pages/home/home.vue'
import login from 'pages/login/login.vue'
import order from 'pages/order/order.vue'
import user from 'pages/user/user.vue'
import goods from 'pages/goods/goods.vue'
// import home from 'pages/home/home.vue'
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: index,
    children: [
      { path: '/home', component: home },
      { path: '/order', component: order },
      { path: '/user', component: user },
      { path: '/goods', component: goods }
    ]
  },
  { path: '/login', component: login, hidden: true }
]

export default routes
