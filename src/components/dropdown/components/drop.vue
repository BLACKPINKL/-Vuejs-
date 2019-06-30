<template lang="html">
  <div :class="cls" :style="style">
    <slot></slot>
  </div>
</template>

<script>
import Popper from 'popper.js/dist/umd/popper'
import {findComponentUpward} from 'utils'
export default {
  name: 'drop',
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    className: {
      type: [String, Array],
      default: ''
    },
    maxHeight: {
      type: [String, Number],
      default: 200
    }
  },
  data() {
    return {
      popper: null,
      popperStatus: false,
      width: '',
      currentHeight: this.maxHeight
    }
  },
  watch: {
    maxHeight(val) {
      this.currentHeight = val
    }
  },
  computed: {
    cls() {
      return this.className
    },
    style() {
      let style = {}
      if (this.width) {
        style.width = this.width + 'px'
      }
      if (!Number(this.currentHeight)) {
        style.maxHeight = this.currentHeight
      }else {
        style.maxHeight = this.currentHeight + 'px'
      }
      return style
    }
  },
  methods: {
    resetTransformOrigin() {
      if (!this.popper) return

      let x_placement = this.popper.popper.getAttribute('x-placement')
      let placementStart = x_placement.split('-')[0]
      let placementEnd = x_placement.split('-')[1]
      const leftOrRight = x_placement === 'left' || x_placement === 'right'
      if(!leftOrRight){
        this.popper.popper.style.transformOrigin = placementStart==='bottom' || ( placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom'
      }
    },
    updatePosition() {
      const reference = this.$parent.$refs.reference
      const popper = this.$el
      if (this.popper) {
        this.$nextTick(() => {
          this.popper.update()
          this.popperStatus = true
        })
      }else {
        this.$nextTick(() => {
          this.popper = new Popper(reference, popper, {
            placement: this.placement,
            modifiers: {
              computeStyle:{
                gpuAcceleration: false
              },
              preventOverflow :{
                boundariesElement: 'window'
              }
            },
            onCreate: () => {
              this.resetTransformOrigin()
              this.$nextTick(this.popper.update())
            },
            onUpdate: () => {
              this.resetTransformOrigin()
            }
          })
        })

        // 如果父组件是select 需要把当前宽度等于父组件的宽度
        let parent = findComponentUpward(this, 'Select')
        if (parent) {
          this.width = parent.$el.clientWidth
        }
      }
    },
    beforeDestroy() {
      //do something before destroying vue instance
      if (this.popper) {
        this.popper.destroy()
      }
    },
    destroy () {
      if (this.popper) {
        setTimeout(() => {
          if (this.popper && !this.popperStatus) {
              this.popper.destroy()
              this.popper = null
          }
          this.popperStatus = false
        }, 300)
      }
    }
  }
}
</script>
