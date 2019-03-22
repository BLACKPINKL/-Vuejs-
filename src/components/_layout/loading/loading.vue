<template>
  <div class="spinner">
    <div :class="'rect' + (parseInt(index) + 1)"
     v-for="(item, index) in items"
     :key="index"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    //do something after creating vue instance
    this.loadSpinner()
  },
  methods: {
    loadSpinner() {
      for (var i = 0; i < 5; i++) {
        this.items.push(i)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.spinner {
  height: 60px;
  text-align: center;
  font-size: 10px;
  div {
    background-color: #67CF22;
    height: 100%;
    width: 6px;
    margin-right: 6px;
    display: inline-block;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }
  .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
}

@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>
