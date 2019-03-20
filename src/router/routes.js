import index from 'pages/index/index.vue'
import home from 'pages/home/home.vue'
import login from 'pages/login/login.vue'
import order from 'pages/order/order.vue'
import orderDetail from 'pages/order/detail/order-detail.vue'
import user from 'pages/user/user.vue'
import goods from 'pages/goods/goods.vue'
import goodsSave from 'pages/goods/save/save.vue'
import goodsCategory from 'pages/goods/category/category.vue'
import goodsCategoryChildren from 'pages/goods/category/children-category/children-category.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: index,
    children: [
      { path: '/home', component: home, name: 'Home' },
      { path: '/order', component: order, name: 'Order' },
      { path: '/order/detail/:orderNo', component: orderDetail, name: 'OrderDetail', props: true},
      { path: '/user', component: user, name: 'User' },
      { path: '/goods', component: goods, name: 'Goods' },
      { path: '/goods/save', component: goodsSave, name: 'GoodsSave' },
      { path: '/goods/edit/:categoryId', component: goodsSave, name: 'GoodsEdit' },
      { path: '/goods/category', component: goodsCategory, name: 'goodsCategory' },
      { path: '/goods/category/children/:id', component: goodsCategoryChildren, name: 'goodsCategoryChildren' }

    ]
  },
  { path: '/login', component: login, hidden: true, name: 'Login' }
]

export default routes
