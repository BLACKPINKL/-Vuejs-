<template>
  <div class="bg-loading" :style="styles">
    <div class="spinner1">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    styles: {
      type: Object
    }
  }
}
</script>

<style lang="less">
.postion {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.bg-loading {
  .postion();
  z-index: -1000;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dcdee2;
  background-color: hsla(0,0%,100%,.9);
}
.spinner1 {
  width: 60px;
  height: 60px;
  position: relative;
}

.double-bounce1,
.double-bounce2 {
  .postion();
  border-radius: 50%;
  background-color: #1cc09f;
  opacity: 0.6;
  animation: bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1.0s;
}

@-webkit-keyframes bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes bounce {
  0%, 100% {
    transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
  }
}
</style>
