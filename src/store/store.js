import Vuex from 'vuex'
import state from './state/state'
import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'
export default () => {
  return new Vuex.Store({
    state,
    mutations,
    getters,
    actions
  })
}
