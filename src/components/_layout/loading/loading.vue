<template>
  <div class="spinner">
    <div :class="'rect' + (index + 1)"
    v-for="(item, index) in loadingList"
    :key="index"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingList: []
    }
  },
  created() {
    //do something after creating vue instance
    this.loadSpinner()
  },
  methods: {
    loadSpinner() {
      for (var i = 0; i < 5; i++) {
        this.loadingList.push(i)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './loading.less';
</style>
