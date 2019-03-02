<template>
  <div class="" id="wrapper">
    <nav class="navbar navbar-default top-navbar" role="navigation">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
                <a class="navbar-brand" href="/"><i class="fa fa-comments"></i> <strong>MASTER </strong></a>
            </div>

            <ul class="nav navbar-top-links navbar-right">
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;" aria-expanded="false">
                        <i class="fa fa-user fa-lg fa-fw"></i> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="javascript:;"><i class="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li><a href="javascript:;"><i class="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li class="divider"></li>
                        <li><router-link to="/login"><i class="fa fa-sign-out fa-fw"></i> Logout</router-link>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
        </nav>

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

        <!-- container -->
      <transition name="fade">
        <div id="page-wrapper"  :class="[pageWrapper, { wrapClosed: isClosed }]">
          <div id="page-inner">
            <router-view></router-view>
            <div class="row">
                <div class="col-md-12">
                    <h1 class="page-header">
                        Dashboard <small>Summary of your App</small>
                    </h1>
  						<ol class="breadcrumb">
                <li><a href="#">Home</a></li>
                <li><a href="#">Library</a></li>
                <li class="active">Data</li>
              </ol>
                </div>
            </div>
            <!-- /. ROW  -->
            <div class="row">
              <div class="col-md-3 col-sm-12 col-xs-12">
                  <div class="panel panel-primary text-center no-boder bg-color-green green">
                      <div class="panel-left pull-left green">
                          <i class="fa fa-bar-chart-o fa-5x"></i>
                      </div>
                      <div class="panel-right pull-right">
					               <h3>8,457</h3>
                         <strong> Daily Visits</strong>
                      </div>
                  </div>
              </div>
              <div class="col-md-3 col-sm-12 col-xs-12">
                  <div class="panel panel-primary text-center no-boder bg-color-blue blue">
                        <div class="panel-left pull-left blue">
                          <i class="fa fa-shopping-cart fa-5x"></i>
					             </div>

                      <div class="panel-right pull-right">
				                 <h3>52,160 </h3>
                         <strong> Sales</strong>
                      </div>
                  </div>
              </div>
              <div class="col-md-3 col-sm-12 col-xs-12">
                  <div class="panel panel-primary text-center no-boder bg-color-red red">
                      <div class="panel-left pull-left red">
                          <i class="fa fa fa-comments fa-5x"></i>
                      </div>
                      <div class="panel-right pull-right">
				                 <h3>15,823 </h3>
                         <strong> Comments </strong>
                      </div>
                  </div>
              </div>
              <div class="col-md-3 col-sm-12 col-xs-12">
                    <div class="panel panel-primary text-center no-boder bg-color-brown brown">
                        <div class="panel-left pull-left brown">
                            <i class="fa fa-users fa-5x"></i>
                        </div>
                        <div class="panel-right pull-right">
					               <h3>36,752 </h3>
                         <strong>No. of Visits</strong>
                        </div>
                    </div>
                </div>
            </div>
    	      <div class="row">
          		<div class="col-xs-6 col-md-3">
          			<div class="panel panel-default">
          				<div class="panel-body easypiechart-panel">
          					<h4>Customers</h4>
          					<div class="easypiechart" id="easypiechart-blue" data-percent="82"><span class="percent">82%</span>
          					<canvas height="110" width="110"></canvas></div>
          				</div>
          			</div>
          		</div>
          		<div class="col-xs-6 col-md-3">
          			<div class="panel panel-default">
          				<div class="panel-body easypiechart-panel">
          					<h4>Sales</h4>
          					<div class="easypiechart" id="easypiechart-orange" data-percent="55"><span class="percent">55%</span>
          					<canvas height="110" width="110"></canvas></div>
          				</div>
          			</div>
          		</div>
          		<div class="col-xs-6 col-md-3">
          			<div class="panel panel-default">
          				<div class="panel-body easypiechart-panel">
          					<h4>Profits</h4>
          					<div class="easypiechart" id="easypiechart-teal" data-percent="84"><span class="percent">84%</span>
          					<canvas height="110" width="110"></canvas></div>
          				</div>
          			</div>
          		</div>
          		<div class="col-xs-6 col-md-3">
          			<div class="panel panel-default">
          				<div class="panel-body easypiechart-panel">
          					<h4>No. of Visits</h4>
          					<div class="easypiechart" id="easypiechart-red" data-percent="46"><span class="percent">46%</span>
          					<canvas height="110" width="110"></canvas></div>
          				</div>
          			</div>
          		</div>
          	</div>
          </div>
  <!-- /. PAGE INNER  -->
        </div>
      </transition>
  </div>
</template>

<script>
import 'layout/custom-styles.css'
export default {
  data() {
    return {
      items: [
        { path: '/test', link: '首页', iconClassname: 'fa fa-home' },
        { path: '/login', link: '订单', iconClassname: 'fa fa-list-alt' },
        { path: '/home',  link: '用户',iconClassname: 'fa fa-user' }
      ],
      isClosed: false,
      navbarDefault: 'navbar-default',
      navbarSide : 'navbar-side',
      navbarClosed: 'navbar-closed',
      pageWrapper: 'page-wrapper',
      wrapClosed: 'wrap-closed'
    }
  },
  mounted() {
    //do something after mounting vue instance
    // $('.collapse').collapse()
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
    }
  },
  computed: {

  }
}
</script>
<style lang="less">

</style>
