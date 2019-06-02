export default {
  asyncSetRouterName({commit}, name) {
    commit('setRouterName', name)
  },
  asyncSetActiveClass({commit}, active) {
    commit('setActiveClass', active)
  },
  asyncAddCacheRoutes({commit}, route) {
    commit('addCacheRoutes', route)
  }
}
