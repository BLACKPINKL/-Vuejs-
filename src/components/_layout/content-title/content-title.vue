<template>
  <section class="content-title">
    <div>
      <h1><svg-icon iconName="biaotitubiao" className="biaoti"></svg-icon>&nbsp;{{title}}</h1>
      <p>A free and open source Vue.js admin template</p>
    </div>
    <div class="title-link">
      <svg-icon iconName="home"></svg-icon>
      <a href="javascript:;">&nbsp;/&nbsp;{{title}}</a>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less">
@import './content-title.less';
</style>
