<template>
  <!-- navside -->
  <nav :class="[navbarDefault, navbarSide, { navbarClosed: isClosed }]">
    <div id="sideNav" @click="handleClosed" :class="{ closed: isClosed }"><i class="fa fa-caret-right"></i></div>
      <div class="sidebar-collapse">
          <ul class="nav" id="main-menu">
              <li v-for="(item, index) in items" :key="index">
                  <router-link :to='item.path'>
                    <i :class="item.iconClassname"></i> {{ item.link }}</router-link>
              </li>
              <!-- 二级菜单 container -->
              <li>
                  <router-link @click.native.self="hadelActive"
                    to="/goods" data-target="#collapse1-id"
                    data-toggle="collapse">
                    <i class="fa fa-shopping-bag"></i>
                    <span class="fa arrow"></span>
                     商品
                   </router-link>
                  <ul class="nav nav-second-level collapse" id="collapse1-id">
                      <li>
                          <a href="/goods/category">品类管理</a>
                      </li>
                  </ul>
              </li>
          </ul>
      </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { path: '/home', link: '首页', iconClassname: 'fa fa-home' },
        { path: '/order', link: '订单', iconClassname: 'fa fa-list-alt' },
        { path: '/user',  link: '用户',iconClassname: 'fa fa-user' }
      ],
      isClosed: false,
      navbarDefault: 'navbar-default',
      navbarSide : 'navbar-side',
      navbarClosed: 'navbar-closed'
    }
  },
  methods: {
    hadelActive(e) {
      let self = e.target
      if (self.parentElement.classList.contains('active')) {
        self.parentElement.classList.remove('active')
      }else {
        self.parentElement.classList.add('active')
      }
    },
    handleClosed() {
      this.isClosed = !this.isClosed
      // 向父组件传值
      this.$emit('getIsClosed', this.isClosed)
    }
  }
}
</script>
