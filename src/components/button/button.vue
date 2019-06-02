<template>
  <button :class="classes" :disabled="disabled">
    <template v-if="loading">
      <svg-icon iconName="loading" className="fei-btn-loading"/>
    </template>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String
    },
    // large 大尺寸 small 小尺寸
    // 默认中尺寸
    size: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes() {
      return [
        'fei-btn',
        {
          [`fei-btn-${this.type}`]: this.type,
          [`fei-btn-${this.size}`]: this.size,
          'fei-btn-disabled': this.disabled
        },
        `${this.className}`
      ]
    }
  }
}
</script>

<style lang="less">
@white: #fff;
@success: #1cc09f;
@info: #2db7f5;
@primary: #2d8cf0;
@warning: #FFB610;
@danger: #E1112C;

.fei-btn {
  // mixin在类中定义可以在其子元素或更深层嵌套中使用
  // 如果在外部定义 只能在第一层中使用
  .hover(@color, @background, @borColor) {
    color: @color;
    // 兼容icon图标
    fill: @color;
    background: @background;
    border-color: @borColor;
  }
  .size-large() {
    &-large {
      padding: 10px 18px;
    }
  }
  .size-small() {
    &-small {
      font-size: 12px;
      padding: 3px 10px;
    }
  }
  .disabled() {
    &-disabled {
      cursor: not-allowed;
      color: #c5c8ce;
      background-color: #f7f7f7;
      border-color: #dcdee2;
    }

  }
  display: inline-block;
  padding: 6px 15px;
  color: #515a6e;
  white-space: nowrap;
  border: 1px solid #dcdee2;
  outline: none;
  border-radius: 4px;
  background: #FAFBFC;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  transition: color .25s linear,background .25s linear,border .25s linear;
  &:hover {
    .hover(#515a6e, @white, @success);
  }
  .size-large();
  .size-small();
  .disabled();
  &-success {
    .hover(@white, @success, @success);
    .size-large();
    .size-small();
    .disabled();
    &:hover {
      .hover(@white, #47cb89, #47cb89);
    }
  }
  &-info {
    .hover(@white, @info, @info);
    .size-large();
    .size-small();
    .disabled();
    &:hover {
      .hover(@white, #57c5f7, #57c5f7);
    }
  }
  &-primary {
    .hover(@white, @primary, @primary);
    .size-large();
    .size-small();
    .disabled();
    &:hover {
      .hover(@white, #57c5f7, #57c5f7);
    }
  }
  &-warning {
    .hover(@white, @warning, @warning);
    .size-large();
    .size-small();
    .disabled();
    &:hover {
      .hover(@white, #FFC02A, #FFC02A);
    }
  }
  &-danger {
    .hover(@white, @danger, @danger);
    .size-large();
    .size-small();
    .disabled();
    &:hover {
      .hover(@white, #E54124, #E54124);
    }
  }

  // loading
  &-loading {
    animation: btn-loading 1s linear infinite;
  }
}

@keyframes btn-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
