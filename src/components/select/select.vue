<template lang="html">
  <div :class="selectedSty" v-clickoutside="handleClcikoutside">
    <div ref="reference" :class="referenceSty" @click="handleClick">
      <span :class="[prefixCls + '-label']">{{label}}</span>
      <svg-icon
      iconName="zuojiantou"
      :className="prefixCls + '-arrow'"/>
      <input type="hidden" value="">
    </div>
    <transition name="transition-drop">
      <Drop
      ref="drop"
      :maxHeight="getDropHeight"
      :placement="placement"
      v-show="currentActive"
      :className="[prefixCls + '-drop']">
      <ul :class="[prefixCls + '-list']">
        <slot/>
      </ul>
      </Drop>
    </transition>
  </div>
</template>

<script>
import Drop from '../dropdown/components/drop'
import { findComponentsDownward } from 'utils'
import clickoutside from '../../directive/clickoutside'
const prefixCls = 'select'
export default {
  name: 'Select',
  components: {
    Drop
  },
  directives: {
    clickoutside
  },
  provide() {
    return {
      'select': this
    }
  },
  model: {
    event: 'change',
    prop: 'selectedVal'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    // 三种字体大小 large small default
    size: {
      type: String,
      default: 'default'
    },
    selectedVal: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: [String, Number],
      default: '请选择'
    },
    dropHeight: {
      type: [String, Number],
      default: 200
    }
  },
  watch: {
    placeholder(val) {
      this.currentPlaceholder = val
    },
    currentActive(val) {
      if (val) {
        this.$refs.drop.updatePosition()
      }else {
        this.$refs.drop.destroy()
      }
    },
    value: {
      handler(val) {
        this.currentSelectedVal = val
        this.setSelected()
      }
    },
    // 外部v-model的值
    selectedVal(val) {
      this.currentSelectedVal = val
      this.setSelected()
    },
    cachedOptions(val) {
      this.$nextTick(() => {
        this.setSelected()
      })
    }
  },
  data() {
    return {
      prefixCls,
      currentActive: false,
      label: '请选择',
      currentSelectedVal: this.selectedVal,
      selected: false,
      cachedOptions: [],
      selectedOp: null,
      currentPlaceholder: this.placeholder
    }
  },
  mounted() {
    //do something after mounting vue instance
    if (this.value) {
      this.setSelected()
    }
    this.setSelected()
    this.$on('on-selected', (op) => {
      if (op.label) {
        this.label = op.label
        this.$emit('change', op.value)
        this.$emit('on-change', op.value)
      }else {
        this.label = op.value
        this.$emit('change', op.value)
        this.$emit('on-change', op.value)
      }
      this.selected = true
      this.handleClose()
    })
  },
  computed: {
    selectedSty() {
      return [
        `${prefixCls}`,
        {[`${prefixCls}-selected`]: this.selected},
        {[`${prefixCls}-disabled`]: this.disabled}
      ]
    },
    referenceSty() {
      return [
        this.prefixCls + '-wrap',
        `${this.prefixCls}-wrap-${this.size}`
      ]
    },
    getDropHeight() {
      return this.dropHeight
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) return
      this.currentActive = !this.currentActive
    },
    handleClcikoutside(e) {
      this.handleClose()
    },
    handleClose() {
      this.currentActive = false
    },
    getOptions(value) {
      let option;
      for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
        let cachedOption = this.cachedOptions[i]
        let isEqual = cachedOption.currentValue === value
        if (isEqual){
          option = cachedOption
          break
        }
      }
      if (option) return option
      let label = value ? value : this.label

      let newOption = {
        value: value,
        getOptionSlot: label
      }
      return newOption
    },
    setSelected() {
      let option = this.getOptions(this.selectedVal)
      if (option.created) {
        this.label = option.getOptionSlot
      }
      this.label = option.getOptionSlot
      this.selectedOp = option
    }
  }
}
</script>

<style lang="less">
@import './style/index';
</style>
