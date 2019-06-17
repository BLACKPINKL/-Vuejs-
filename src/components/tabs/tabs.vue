<template>
  <div class="tabs">
    <!-- 标签组 -->
    <div class="tabs-bar">
      <div ref="navWrap" :class="navWrapCls">
        <span class="tabs-nav-arrow tabs-nav-prev" v-show="scrollable" @click="handleScrollPrev"><svg-icon iconName="zuojiantou"/></span>
        <span class="tabs-nav-arrow tabs-nav-next" v-show="scrollable" @click="handleScrollNext"><svg-icon iconName="zuojiantou" className="tabs-nav-arrow-right"/></span>
        <div class="tabs-nav-scroll">
          <div ref="tabsNav" class="tabs-nav" :style="navStyle">
            <div :class="tabsCls(item)"
            v-for="(item, index) in navList"
            :key="`tab_${index}`"
            @click.stop="handleClick(item)">
              <template>
                {{item.label}}
              </template>
              <svg-icon
              @click.native.stop="handleRemove(index)"
               v-if="showClose(item)"
               iconName="close"
               iconClass="tabs-tab-close"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户内容区 -->
    <div :class="contentClasses" :style="contentStyle" ref="panes">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    type: {
      type: String,
      default: 'card'
    },
    size: {
      type: String,
      default: 'normal'
    },
    value: {
      type: [String, Number],
      required: true
    },
    closable: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      navList: [],
      activeKey: this.value,
      scrollable: false,
      navStyle: {
        transform: ''
      }
    }
  },
  computed: {
    navWrapCls() {
      const preCls = 'tabs-nav'
      return [
        `${preCls}-wrap`,
        {[`${preCls}-scrollable`]: this.scrollable}
      ]
    },
    contentClasses() {
      const cls = 'tabs-content'
      return [
        cls,
        {[`${cls}-animate`]: this.animated}
      ]
    },
    contentStyle() {
      let x = this.getTabIndex(this.activeKey)
      let p = x === 0 ? '0%' : `-${x}00%`
      if (x > -1 ) {
        return {
          transform: `translateX(${p}) translateZ(0px)`
        }
      }else {
        return {}
      }
    }
  },
  watch: {
    value(val) {
      this.activeKey = val
    },
    activeKey(val) {
      this.$nextTick(() => {
        this.updateActiveScroll()
      })
      let i = Math.max(this.getTabIndex(val), 0)
      this.updateVisibility(i)
    }
  },
  mounted() {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    let el = this.$refs.tabsNav
    this.mutationObserver = new MutationObserver(() => {
      this.handleResize()
    })
    this.mutationObserver.observe(el, {
       attributes: true,
       childList: true,
       characterData: true,
       attributeFilter: ['style']
    })
  },
  beforeDestroy() {
    //do something before destroying vue instance
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
      this.mutationObserver.takeRecords()
      this.mutationObserver = null
    }
  },
  methods: {
    getTabs() {
      return this.$children.filter(item => item.$options.name === 'TabsPane')
    },
    getTabIndex(name) {
      return this.navList.findIndex(tab => tab.name === name)
    },
    getCurrentScrollOffset() {
      let style = this.navStyle
      return style.transform ?
      Number(style.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1]) : 0
    },
    updateNavList() {
      this.navList = []
      this.getTabs().forEach((pane, i) => {
        this.navList.push({
          label: pane.label,
          name: pane.currentName,
          closable: pane.closable,
          disabled: pane.disabled
        })
        if (i === 0) {
          if (!this.activeKey) this.activeKey = pane.currentName
        }
      })
    },
    updateActiveScroll() {
      //
      if (!this.scrollable) return
      const tabsNav = this.$refs.tabsNav
      const activeTab = this.$el.querySelector('.tabs-tab-active')
      const navWrap = this.$refs.navWrap
      const tabsNavBounding = tabsNav.getBoundingClientRect()
      const activeTabBounding = activeTab.getBoundingClientRect()
      const navWrapBounding = navWrap.getBoundingClientRect()
      let currentOffset = this.getCurrentScrollOffset()
      let newOffset = currentOffset
      if (tabsNavBounding.right < navWrapBounding.right) {
        newOffset = tabsNav.offsetWidth - navWrapBounding.width
      }
      if (activeTabBounding.left < navWrapBounding.left) {
        newOffset = currentOffset - (navWrapBounding.left - activeTabBounding.left)
      }else if (activeTabBounding.right > navWrapBounding.right) {
        newOffset = currentOffset + activeTabBounding.right - navWrapBounding.right
      }

      if (newOffset !== currentOffset) {
        this.setOffset(Math.max(newOffset, 0))
      }
    },
    updateNavScroll() {
      let navWidth = this.$refs.tabsNav.offsetWidth
      let navWrapWidth = this.$refs.navWrap.offsetWidth
      let currentOffset = this.getCurrentScrollOffset()
      if (navWidth > navWrapWidth) {
        // 说明当前tab宽度超过父容器
        this.scrollable = true
        if (navWidth - currentOffset < navWrapWidth) {
          let newoffset = (navWidth - navWrapWidth) + 30
          this.setOffset(newoffset)
        }
      } else {
        this.scrollable = false
        if (currentOffset > 0) {
          this.setOffset(0)
        }
      }
    },
    handleResize() {
      this.updateNavScroll()
    },
    updateVisibility(index) {
      // 视图更新后拿到新的内容
      this.$nextTick(() => {
        [...this.$refs.panes.children].forEach((el, i) => {
          if (i === index) {
            el.style.visibility = 'visible'
          }else {
            el.style.visibility = 'hidden'
          }
        })
      })
    },
    handleClick(nav) {
      if (this.activeKey !== nav.name) {
        this.activeKey = nav.name
        this.$emit('on-click', nav.name)
      }
    },
    handleRemove(index) {
      let tabs = this.getTabs()
      let tab = tabs[index]
      // 销毁当前组件
      tab.$destroy()
      // 说明点击删除是当前active的tab
      if (this.activeKey === tab.currentName) {
        // 获取新的tabs
        let newTabs = this.getTabs()
        let activeKey = -1
        if (newTabs.length) {
          // 拿到当前删除tab的左边所有的tab
          let leftTabs = tabs.filter((tab, i) => i < index)
          // 拿到当前删除tab的右边所有的tab
          let rightTabs = tabs.filter((tab, i) => i > index)
          if (rightTabs.length) {
            activeKey = rightTabs[0].currentName
          } else if (leftTabs.length) {
            activeKey = leftTabs[leftTabs.length - 1].currentName
          } else {
            activeKey = newTabs[0].currentName
          }
        }
        this.$emit('on-click', activeKey)
        this.activeKey = activeKey
      }
      // 抛出给父组件自行删除内容
      this.$emit('on-remove', tab.currentName)
      this.updateNavList()
    },
    setOffset(val) {
      this.navStyle.transform = `translateX(-${val}px)`
    },
    handleScrollPrev() {
      //点击向右滑动
      let navWrapWidth = this.$refs.navWrap.offsetWidth
      let currentOffset = this.getCurrentScrollOffset()
      if (!currentOffset) return
      let newOffset = currentOffset > navWrapWidth
          ? currentOffset - navWrapWidth
          : 0
      this.setOffset(newOffset)
    },
    handleScrollNext() {
      //点击向左滑动
      let navWidth = this.$refs.tabsNav.offsetWidth
      let navWrapWidth = this.$refs.navWrap.offsetWidth
      let currentOffset = this.getCurrentScrollOffset()
      if (navWidth - currentOffset <= navWrapWidth) return
      let newOffset = navWidth - currentOffset > navWrapWidth * 2
          ? currentOffset + navWrapWidth
          : (navWidth - navWrapWidth) + 30
      this.setOffset(newOffset)
    },
    tabsCls(nav) {
      return [
        'tabs-tab',
        {'tabs-tab-active': this.activeKey === nav.name}
      ]
    },
    showClose(item) {
      if (item.closable) {
        return item.closable
      }else if(this.closable){
        return this.closable
      }else {
        return false
      }
    }
  }
}
</script>

<style lang='less' scoped>
@color: #515a6e;
@border-color: #dcdee2;
  .tabs {
    position: relative;
    overflow: hidden;
    color: @color;
    &-bar {
      border-bottom: 1px solid @border-color;
      margin-bottom: 15px;
    }
    &-nav-wrap {
      font-size: 14px;
      margin-bottom: -1px;
      overflow: hidden;
      white-space: nowrap;
    }
    &-nav-scrollable {
      position: relative;
      padding: 0 15px;
    }
    &-nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      user-select: none;
      cursor: pointer;
      .icon {
        width: 1em;
        height: 1em;
        margin-right: 0;
      }
      &.tabs-nav-prev {
        left: 0;
      }
      &.tabs-nav-next {
        right: 0;
      }
    }
    &-nav-arrow-right {
      transform: rotate(180deg);
    }
    &-nav-scroll {
      overflow: hidden;
      position: relative;
    }
    &-nav {
      float: left;
      padding-left: 0;
      margin: 0;
      border: 1px solid @border-color;
      border-bottom: none;
      transition: transform .3s ease-in-out;
    }
    &-content {
      &-animate {
        display: flex;
        flex-direction: row;
        width: 100%;
        transition: transform .25s ease-in-out;
      }
    }
    &-pane {
      width: 100%;
      flex-shrink: 0;
    }
    &-tab {
      display: inline-block;
      position: relative;
      height: 100%;
      padding: 8px 16px 4px;
      cursor: pointer;
      text-decoration: none;
      transition: color .2s ease-in-out;
      border-left: 1px solid @border-color;
      border-bottom: 1px solid transparent;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      &:hover {
        color: #1cc09f;
      }
      &:first-child {
        border-left: none;
      }
      &-close {
        margin-right: 0;
        margin-right: -6px;
        margin-left: 3px;
        vertical-align: middle;
        fill: @color;
        color: @color !important;
        &:hover {
          color: #333 !important;
        }
      }
    }
    &-tab-active {
      border-bottom-color: #fff;
      transform: translateZ(0);
    }
  }
</style>
