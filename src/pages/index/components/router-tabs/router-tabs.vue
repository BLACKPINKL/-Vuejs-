<template>
  <div class="router-tabs-container">
    <Tabs :value="routerPath"
    @on-click="handleClick"
    @on-remove="handleRemove"
    :animated="false">
      <Tabs-pane
      v-for="(item, index) in routerTabs"
      :closable="showClose(item)"
      :label="item.meta.title"
      :name="item.path"
      :key="item.path">
      </Tabs-pane>
    </Tabs>
  </div>
</template>

<script>
import Tabs from 'components/tabs'
export default {
  name: 'routerTabs',
  components: {
    Tabs,
    TabsPane: Tabs.Pane
  },
  data() {
    return {
      routerTabs: [
        {
          fullPath: '/statistic',
          meta: {
            icon: "tongji",
            noCache: true,
            title: "首页",
            closable: false
          },
          name: 'Statistic',
          path: '/statistic'
        }
      ]
    }
  },
  watch: {
    '$route': {
      handler(router) {
        this.addTabs(router)
      },
      immediate: true
    }
  },
  methods: {
    addTabs(router) {
      let index = this.routerTabs.findIndex(item => {
        return router.path === item.path
      })
      // 如果返回的是-1 说明数组中没有这个路由
      // 把它添加进数组
      if (index < 0) {
        router.meta['closable'] = true
        this.routerTabs.push(router)
      }
    },
    // 删除tabs中的某一项
    removeTab(path) {
      if (!path) return
      this.routerTabs = this.routerTabs.filter(item => item.path !== path)
    },
    handleClick(path) {
      this.$router.push({path})
    },
    handleRemove(path) {
      if (this.$route.path === path) {
        this.handleClick(path)
      }
      this.removeTab(path)
    },
    showClose(item) {
      return item.meta.closable
    }
  },
  computed: {
    routerPath() {
      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
.router-tabs-container {
  margin-top: 65px;
}
</style>
