export default {
  getItemsPage(state) {
    return state.itemsPage = state.page.pageSize
  },
  getPageNum(state) {
    return state.page.pageNum = state.pagination.currentPage
  }
}
