<template>
  <div class="menu-wrapper" v-if="!item.hidden">
    <!-- 根据 isOnlyoneChildren 来判断
         如果返回true 则表示只有一级菜单 显示 menu-link-->
    <template v-if="isOnlyoneChildren(item.children, item) && (!onlyoneChildren.children || onlyoneChildren.noShowingChildren)">
      <Menu-item :name="resolvePath(onlyoneChildren.path)">
        <Menu-link :to="resolvePath(onlyoneChildren.path)">
          <Menu-tile :meta="onlyoneChildren.meta"/>
        </Menu-link>
      </Menu-item>
    </template>
    <!-- 反之显示  多级菜单-->
    <subMenu ref="subMenu" :name="item.name" :icon="item.meta.icon" v-else>
      <template v-slot:title>
        <span v-if="item.meta">{{item.meta.title}}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="`sub-item-${child.path}`"
       :item="child"
       :baseUrl="resolvePath(child.path)">
      </sidebar-item>
    </subMenu>
  </div>
</template>

<script>
import MenuItem from './menu-item.vue'
import MenuLink from './menu-item-link.vue'
import MenuTile from './menu-item-title.vue'
import subMenu from './submenu.vue'
import path from 'path'
import { findComponentUpward} from 'utils'
export default {
  name: 'sidebar-item',
  components: {
    MenuItem,
    MenuLink,
    MenuTile,
    subMenu
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    baseUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    // 这里必须要在return的对象外部挂载一个属性
    // 如果在return的对象里挂载 会无限递归
    this.onlyoneChildren = {}
    return {
      arrowRotate: false
    }
  },
  methods: {
    // 过滤路由表中的hidden 并
    isOnlyoneChildren(children = [], parent) {
      const res = children.filter(router => {
        if (router.hidden) {
          return false
        }else {
          this.onlyoneChildren = router
          return true
        }
      })
      if (res.length === 1){
        return true
      }
      else if (res.length === 0) {
        this.onlyoneChildren = {...parent, path: '', noShowingChildren: true}
        return true
      }
      return false
    },
    resolvePath(to) {
      return path.resolve(this.baseUrl, to)
    },
    parentComponent() {
      return findComponentUpward(this, 'Menu')
    }
  }
}
</script>
