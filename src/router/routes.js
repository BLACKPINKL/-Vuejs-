import index from 'pages/index/index'
import err404 from 'pages/404'
import statistic from 'pages/statistic/statistic'
import login from 'pages/login/login'
import order from 'pages/order/order'
import orderDetail from 'pages/order/detail/order-detail'
import user from 'pages/user/user'
import goods from 'pages/goods/goods'
import goodsAdd from 'pages/goods/goods-add'
import goodsCategory from 'pages/goods/category/category'

const routes = [
  {
    path: '*',
    redirect: '/err_404',
    hidden: true
  },
  {
    path: '/',
    redirect: 'statistic',
    component: index,
    name: 'statistic',
    children: [
      {
        path: 'statistic',
        component: statistic,
        name: 'Statistic',
        meta: {
          title: '数据统计',
          icon: 'tongji',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/err_404',
    name: 'err-404',
    component: err404,
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true
  },
  {
    path: '/order',
    name: 'order',
    component: index,
    children: [
      {
        path: 'index',
        name: 'Order',
        meta: {
          title: '订单',
          icon: 'wodedingdan'
        },
        component: order
      },
      {
        path: 'detail/:orderNo',
        name: 'OrderDetail',
        meta: {
          title: '订单详情',
          icon: 'xiangqing',
          activeMenu: '/order/index',
          noCache: true
        },
        hidden: true,
        props: true,
        component: orderDetail
      }
    ]
  },
  {
    path: '/user',
    redirect: '/user/index',
    name: 'user',
    component: index,
    children: [
      {
        path: 'index',
        name: 'User',
        component: user,
        meta: {
          title: '用户',
          icon: 'yonghu'
        }
      }
    ]
  },
  {
    path: '/goods',
    name: 'goods',
    redirect: '/goods/index',
    component: index,
    meta: {
      title: '商品',
      icon: 'shangpin'
    },
    children: [
      {
        path: 'index',
        name: 'Goods',
        component: goods,
        meta: {
          title: '商品管理',
          icon: 'shangpin'
        }
      },
      {
        path: 'add',
        name: 'GoodsAdd',
        component: goodsAdd,
        meta: {
          title: '添加商品',
          icon: 'add',
          activeMenu: '/goods/index',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'edit/:categoryId',
        name: 'GoodsEdit',
        component: goodsAdd,
        meta: {
          title: '编辑商品',
          icon: 'bianji',
          activeMenu: '/goods/index',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'detail/:categoryId',
        name: 'GoodsDetail',
        component: goodsAdd,
        meta: {
          title: '商品详情',
          icon: 'xiangqing',
          activeMenu: '/goods/index',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'category',
        name: 'Category',
        component: goodsCategory,
        meta: {
          title: '品类管理',
          icon: 'pinlei',
          noCache: true
        }
      },
      {
        path: 'category-children/:id',
        name: 'CategoryChildren',
        component: goodsCategory,
        meta: {
          title: '二级品类',
          icon: 'pinlei',
          activeMenu: '/goods/category',
          noCache: true
        },
        hidden: true
      }
    ]
  }
]

export default routes
