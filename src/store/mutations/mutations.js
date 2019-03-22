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
  setNavbarToggle(state) {
    state.navbarToggle = !state.navbarToggle
  },
  setIsMobile(state) {
    state.isMobile = !state.isMobile
  },
  setDialogShow(state) {
    state.show = true
  },
  colseDialog(state) {
    state.show = false
  },
  setIsTips(state) {
    state.isTips = true
  }
}
