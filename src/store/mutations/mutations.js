export default {
  setPageSize(state, param) {
    state.page.pageSize = param
  },
  setPageNum(state, param) {
    state.page.pageNum = param
  },
  setPageTotal(state, param) {
    state.totalItems = param
  }
}
