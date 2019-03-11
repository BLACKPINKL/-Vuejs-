export default {
  setPage(state, obj) {
    state.page.pageSize = obj.pageSize
    state.totalItems = obj.total
  },
  setPageSize(state, param) {
    state.page.pageSize = param
  },
  setCurrentPage(state, param) {
    state.pagination.currentPage = param
  }
}
