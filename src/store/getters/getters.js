import Cookie from 'js-cookie'
export default {
  getIsMobile(state) {
    if (Cookie.get('isMobile') == 1) {
      return 1
    }
    return null
  }
}
