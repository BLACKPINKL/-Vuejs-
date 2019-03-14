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
    uploadSuccess: {
      type: Function
    },
    getContext: {
      type: Function
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    //do something after mounting vue instance
    let editor = new E(this.$refs.editor),
        that = this
    // 获取富文本中的html内容
    editor.customConfig.onchange = (html) => {
      that.$emit('getContext', html)
    }
    // 富文本 图片上传
    editor.customConfig.uploadImgServer = that.uploadPath
    editor.customConfig.uploadFileName = that.uploadFileName
    editor.customConfig.uploadImgHooks = {
      // 成功回调
      customInsert(insertImg, result, editor) {
        if (result.success) {
          that.$emit('uploadSuccess', result)
          // 插入图片
          insertImg(that.editorUploadImg)
        }
      }
    }
    editor.create()
  }
}
</script>
