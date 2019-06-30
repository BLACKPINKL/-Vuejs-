<template lang="html">
  <div :class="[preFixCls]" v-clickoutside="onClickoutside">
    <div ref="reference" :class="[preFixCls + '-rel']" @click.stop="handleClick"><slot/></div>
    <transition name="transition-drop">
      <Drop
        ref="drop"
        :placement="placement"
        :className="[preFixCls + '-drop']"
        v-show="currentVisible">
        <slot name="list"/>
      </Drop>
    </transition>
  </div>
</template>

<script>
import Drop from './components/drop'
import clickoutside from '../../directive/clickoutside'
const preFixCls = 'dropdown'
export default {
  name: 'dropdown',
  components: {
    Drop
  },
  directives:{clickoutside},
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    }
  },
  data() {
    return {
      preFixCls,
      currentVisible: false
    }
  },
  watch: {
    currentVisible(val) {
      if (val) {
        this.$refs.drop.updatePosition()
      }else {
        this.$refs.drop.destroy()
      }
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.$on('on-selected', (key) => {
      this.handleClose()
      this.$emit('on-click', key)
    })
  },
  methods: {
    handleClick() {
      //点击显示menu、
      this.currentVisible = !this.currentVisible
    },
    onClickoutside(e) {
      this.handleClose()
    },
    handleClose() {
      this.currentVisible = false
    }
  }
}
</script>

<style lang="less">
@import './style/index';
</style>
