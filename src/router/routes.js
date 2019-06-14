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
import menu1 from 'pages/nested/menu1'
import menu2 from 'pages/nested/menu2'
import menu2_1 from 'pages/nested/menu2/menu2-1'
import menu2_2 from 'pages/nested/menu2/menu2-2'
import menu2_3 from 'pages/nested/menu2/menu2-3'
import menu2_2_1 from 'pages/nested/menu2/menu2-2/menu2-2-1'
import menu2_2_2 from 'pages/nested/menu2/menu2-2/menu2-2-2'
import tabs from 'pages/tab/tab'
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
  },
  {
    path: '/nested',
    name: 'Nested',
    component: index,
    meta: {
      icon: 'biaotitubiao',
      title: '多级嵌套'
    },
    redirect: '/nested/menu1',
    children: [
      {
        path: 'menu1',
        name: 'NestedMenu1',
        component: menu1,
        meta: {
          icon: 'biaotitubiao',
          title: '菜单1'
        }
      },
      {
        path: 'menu2',
        meta: {
          icon: 'biaotitubiao',
          title: '菜单2'
        },
        component: menu2,
        children: [
          {
            path: 'menu2-1',
            name: 'NestedMenu2-1',
            component: menu2_1,
            meta: {
              icon: 'biaotitubiao',
              title: '菜单2-1'
            }
          },
          {
            path: 'menu2-2',
            name: 'NestedMenu2-2',
            meta: {
              icon: 'biaotitubiao',
              title: '菜单2-2'
            },
            component: menu2_2,
            children: [
              {
                path: 'menu2-2-1',
                name: 'NestedMenu2-2-1',
                component: menu2_2_1,
                meta: {
                  icon: 'biaotitubiao',
                  title: '菜单2-2-1'
                }
              },
              {
                path: 'menu2-2-2',
                name: 'NestedMenu2-2-2',
                component: menu2_2_2,
                meta: {
                  icon: 'biaotitubiao',
                  title: '菜单2-2-2'
                }
              }
            ]
          },
          {
            path: 'menu2-3',
            name: 'NestedMenu2-3',
            component: menu2_3,
            meta: {
              icon: 'biaotitubiao',
              title: '菜单2-3'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/tabs',
    component: index,
    name: 'tabs',
    children: [
      {
        path: 'index',
        component: tabs,
        name: 'Tabs',
        meta: {
          icon: 'tab',
          title: 'Tabs'
        }
      }
    ]
  }
]

export default routes
