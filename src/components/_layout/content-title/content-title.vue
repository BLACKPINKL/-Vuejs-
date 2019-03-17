<template>
  <section class="content-title">
    <div>
      <h1><i class="fa fa-dashboard"></i>{{title}}</h1>
      <p>A free and open source Bootstrap 4 admin template</p>
    </div>
    <div class="title-link">
      <i class="fa fa-home fa-lg"></i>
      <a href="javascript:;">&nbsp;/&nbsp;{{title}}</a>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Charts'
    }
  }
}
</script>
<style lang="less">
@import './content-title.less';
</style>
