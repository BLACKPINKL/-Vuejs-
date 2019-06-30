// 自定义指令，点击目标元素外部触发回调
export default {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) return false
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
