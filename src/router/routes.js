import index from 'pages/index/index.vue'
import home from 'pages/home/home.vue'
import login from 'pages/login/login.vue'
import order from 'pages/order/order.vue'
import user from 'pages/user/user.vue'
import goods from 'pages/goods/goods.vue'
import orderDetail from 'pages/order/detail/order-detail.vue'
// import home from 'pages/home/home.vue'
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: index,
    children: [
      { path: '/home', component: home },
      { path: '/order', component: order},
      { path: '/order/detail/:orderNo', component: orderDetail, props: true},
      { path: '/user', component: user },
      { path: '/goods', component: goods }
    ]
  },
  { path: '/login', component: login, hidden: true }
]

export default routes
