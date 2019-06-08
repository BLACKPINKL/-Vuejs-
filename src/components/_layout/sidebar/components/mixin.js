import {findComponentUpward, findComponentsUpward} from 'utils'

export default {
  computed: {
    findsubMenusNum() {
      return findComponentsUpward(this, 'Submenu').length
    }
  }
}
