<template>
  <span :class="classes"><slot></slot></span>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes() {
      return [
        'tag',
        { [`tag-${this.type}`]: this.type }
      ]
    }
  }
}
</script>

<style lang="less">
.tag {
  display: inline-block;
  height: 35px;
  line-height: 35px;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 12px;
  white-space: normal;
  color: #1cc09f;
  background-color: rgba(64,158,255,.1);
  border: 1px solid transparent;
  &-success {
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }
  &-info {
    background-color: rgba(144,147,153,.1);
    border-color: rgba(144,147,153,.2);
    color: #909399;
  }
  &-warning {
    background-color: rgba(230,162,60,.1);
    border-color: rgba(230,162,60,.2);
    color: #e6a23c;
  }
  &-danger {
    background-color: rgba(245,108,108,.1);
    border-color: rgba(245,108,108,.2);
    color: #f56c6c;
  }
}
</style>
