export default {
  setPageSize(state, param) {
    state.page.pageSize = param
  },
  setPageNum(state, param) {
    state.page.pageNum = param
  },
  setPageTotal(state, param) {
    state.totalItems = param
  },
  setRouterName(state, name) {
    state.routerName = name
  },
  setNavbarToggle(state, flag) {
    state.navbarToggle = flag ? flag : !state.navbarToggle
  },
  setNavsideWidth(state, width) {
    state.navsideWidth = width
  },
  setDialogShow(state) {
    state.show = true
  },
  colseDialog(state) {
    state.show = false
  },
  setIsTips(state) {
    state.isTips = true
  },
  showLoading(state) {
    state.loading = true
  },
  closeLoading(state) {
    state.loading = false
  },
  setActiveClass(state, active) {
    state.activeClass = active
  },
  addCacheRoutes(state, route) {
    if (state.cacheRoutes.includes(route.name)) return
    if (!route.meta.noCache) {
      state.cacheRoutes.push(route.name)
    }
  }
}
