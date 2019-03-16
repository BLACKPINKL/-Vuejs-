<template>
  <div
  ref="editor"
  style="text-align:left">
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  props: {
    uploadPath: {
      type: String
    },
    uploadFileName: {
      type: String
    },
    editorUploadImg: {
      type: String,
      default: ''
    },
    editorHtml: {
      type: String,
      default: ''
    },
    disabledEditor: {
      type: Boolean,
      default: true
    },
    uploadSuccess: {
      type: Function
    },
    getContext: {
      type: Function
    }
  },
  data() {
    return {
      editor: null,
      html: ''
    }
  },
  watch: {
    getHtml(val) {
      // 设置html内容
      this.editor.txt.html(val)
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.editor = new E(this.$refs.editor)
    let that = this
    // 获取富文本中的html内容
    that.editor.customConfig.onchange = (html) => {
      that.$emit('getContext', html)
    }
    // 富文本 图片上传
    that.editor.customConfig.uploadImgServer = that.uploadPath
    that.editor.customConfig.uploadFileName = that.uploadFileName
    that.editor.customConfig.uploadImgHooks = {
      // 成功回调
      customInsert(insertImg, result, editor) {
        if (result.success) {
          that.$emit('uploadSuccess', result)
          // 插入图片
          insertImg(that.editorUploadImg)
        }
      }
    }
    that.editor.create()
    // 禁用编辑
    that.editor.$textElem.attr('contenteditable', that.disabledEditor)
  },
  computed: {
    getHtml() {
      return this.html = this.editorHtml
    }
  }
}
</script>
