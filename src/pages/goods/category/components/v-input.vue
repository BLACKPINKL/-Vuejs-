<template>
  <div class="text">
    <input type="text" v-model.trim="name">
    <p class="errMsg" v-if="vaildateStatus">{{ errMsg }}</p>
    <button class="btn btn-default btn-md" @click="getName">ok</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      errMsg: '',
      vaildateStatus: false
    }
  },
  methods: {
    getName() {
      if (!this.name) {
        this.errMsg = '你搞咩啊!'
        this.vaildateStatus = true
        return
      }
      this.vaildateStatus = false
      this.$emit('close', this.name)
    }
  }
}
</script>
<style lang="less" scoped>
.text {
  display: flex;
  flex-wrap: wrap;
  input {
    color: #555;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    outline: none;
    border: 1px solid #ccc;
    &:focus {
      border: 2px solid #009688;
    }
  }
  .errMsg {
    width: 100%;
    color: #f30;
    padding-top: 10px;
  }
}
</style>
