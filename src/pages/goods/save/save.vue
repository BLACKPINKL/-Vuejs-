<template>
  <section class="product-save">
    <div class="form-horizontal">
        <div class="card">
          <div class="form-group">
            <label for="productName" class="col-md-2 control-label">商品名称</label>
              <div class="col-md-5">
                <input type="text"
                class="form-control input-md"
                id="productName"
                v-model.trim="newProductInfo.name"
                placeholder="请输入商品名称"
                :disabled="isDisabled"/>
              </div>
          </div>
          <div class="form-group">
            <label for="productSub" class="col-md-2 control-label">商品描述</label>
            <div class="col-md-5">
              <input type="text"
              class="form-control input-md"
              id="productSub"
              v-model.trim="newProductInfo.subtitle"
              placeholder="请输入商品描述"
              :disabled="isDisabled">
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-2 control-label">所属分类</label>
            <div class="col-md-10">
              <select class="form-control cate-select"
              v-model="newProductInfo.parentCategoryId"
              :disabled="isDisabled">
                <option value="">请选择一级分类</option>
                <option
                :value="item.id"
                v-for="(item, index) in category.oneCategoryList"
                :key="index"
                :selected="item.id === newProductInfo.parentCategoryId">
                {{ item.name }}
              </option>
              </select>
              <select
              v-show="isTwoSelected"
              v-model="newProductInfo.categoryId"
              class="form-control cate-select"
              :disabled="isDisabled">
                <option value="" disabled>请选择二级分类</option>
                <option
                :value="item1.id"
                v-for="(item1, index2) in category.twoCategoryList"
                :key="index2"
                :selected="item1.id === newProductInfo.categoryId">{{item1.name}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="productPrice" class="col-md-2 control-label">商品价格</label>
            <div class="col-md-3">
              <div class="input-group">
                <input type="text"
                class="form-control input-md"
                id="productPrice"
                v-model.number="newProductInfo.price"
                placeholder="请输入商品价格"
                :disabled="isDisabled">
                <span class="input-group-addon">元</span>
                </div>
            </div>
          </div>
          <div class="form-group">
            <label for="productQuantiy" class="col-md-2 control-label">商品库存</label>
            <div class="col-md-3">
              <div class="input-group">
                <input type="text"
                class="form-control input-md"
                id="productQuantiy"
                v-model.number="newProductInfo.stock"
                placeholder="请输入商品库存"
                :disabled="isDisabled">
                <span class="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="col-md-2 control-label">商品图片</label>
            <file-upload
            :class="['btn', 'btn-primary']"
            :crop="false"
            @imageuploaded="imageuploaded"
            url="/manage/product/upload.do"
            inputOfFile="upload_file"
            v-if="isGoodsDeatil"
            ></file-upload>
            <div
            class="uploadImgBox"
            v-for="(item, index) in getUploadImg"
            :key="index">
              <img
              class="uploadImg"
              :src="newProductInfo.imageHost ? newProductInfo.imageHost + item : item"
              >
              <div class="imgMask" @click="removeUploadImg(index)" v-if="isGoodsEdit"><i class="fa fa-close fa-lg"></i></div>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="col-md-2 control-label">商品详情</label>
            <editor
            :uploadPath="uploadPath"
            :uploadFileName="uploadFileName"
            @uploadSuccess="uploadSuccess"
            :editorUploadImg="editorUploadImg"
            :editorHtml="getEditorHtml"
            @getContext="getContext"
            :disabledEditor="isGoodsDeatil"/>
        </div>
          <div class="form-group" v-if="isGoodsDeatil">
            <div class="col-md-12">
              <div style="text-align: center">
              <button class="btn btn-lg" @click="submitNewGoods">提交</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
import common from 'utils/common'
import goods from 'service/goods-service'
import category from 'service/category-service'
import VueCoreImageUpload from 'vue-core-image-upload'
import editor from 'components/editor/editor'
export default {
  mixins: [common, goods, category],
  components: {
    fileUpload: VueCoreImageUpload,
    editor
  },
  data() {
    return {
      category: {
        oneCategoryList: [],
        twoCategoryList: []
      },
      newProductInfo: {
        categoryId: 0,
        name: '',
        subtitle: '',
        subImages: [],
        detail: '',
        price: 1,
        stock: 1,
        status: 1,
        parentCategoryId: 0,
      },
      twoSelected: false,
      uploadPath: '/manage/product/richtext_img_upload.do',
      uploadFileName: 'upload_file',
      editorUploadImg: '',
      uploadImg: [],
      editorHtml: '',
      isGoodsDeatil: true
    }
  },
  watch: {
    // 监视一级分类id 如果变了 则渲染二级分类
    'newProductInfo.parentCategoryId': {
      handler(val, oldVal) {
        this.loadCategoryList({categoryId: parseInt(val)}, 'twoCategoryList')
      }
    }
  },
  created() {
    // 根据路径进行判断
    // 如果是 /goods/save 则渲染添加商品页
    if (this.$route.path == '/goods/save') {
      this.loadCategoryList(this.newProductInfo.parentCategoryId, 'oneCategoryList')
    }
    // 判断是否是编辑页
    else if(this.$route.path.includes('edit')){
      this.loadGoodsEdit({productId: this.$route.params.categoryId})
      this.loadCategoryList(this.newProductInfo.parentCategoryId, 'oneCategoryList')
    }
    // 判断是否是详情页
    else if(this.$route.path.includes('detail')){
      this.isGoodsDeatil = false
      this.loadGoodsEdit({productId: this.$route.params.categoryId})
      this.loadCategoryList(this.newProductInfo.parentCategoryId, 'oneCategoryList')
    }
  },
  methods: {
    // 图片上传成功
    imageuploaded(res) {
      this.uploadImg.push(res.data.url)
      this.newProductInfo.subImages.push(res.data.url.replace('http://img.happymmall.com/', ''))
    },
    // 渲染select 分类
    loadCategoryList(categoryId, cateName) {
      this.getCategoryList(categoryId).then((res) => {
        this.category[cateName] = res.data
      })
      .catch((err) => {
        this.TipsModal({
          text: err.msg || err
        })
      })
    },
    // 渲染编辑商品页
    loadGoodsEdit(productId) {
      this.getGoodsEdit(productId).then((res) => {
        res.data.isGoodsEdit = true
        this.newProductInfo = res.data
        this.newProductInfo.subImages = this.newProductInfo.subImages.split(',')
      })
      .catch((err) => {
        this.TipsModal({
          text: err.msg || err
        })
      })
    },
    // 提交表单
    submitNewGoods() {
      let subImages = this.joinArr(this.newProductInfo.subImages, ',')
      let vaildate = this.checkNewGoodsInfo(this.newProductInfo)
      let that = this
      if (!vaildate.status) {
        this.TipsModal({
          text: vaildate.msg
        })
      }else {
        this.newProductInfo.subImages = subImages
        // 说明是编辑页面 把没用的字段删除
        if (this.newProductInfo.isGoodsEdit) {
          delete this.newProductInfo.mainImage
          delete this.newProductInfo.createTime
          delete this.newProductInfo.updateTime
          delete this.newProductInfo.imageHost
        }
        this.saveNewGoods(this.newProductInfo).then((res) => {
          this.handleModal({
            text: res.data,
            buttons: [
              {
                title: '确定',
                handler() {
                  that.$router.push('/goods')
                  that.modalHide()
                }
              }
            ]
          })
        })
        .catch((err) => {
          this.TipsModal({
            text: err || err.msg
          })
        })
      }
    },
    // 删除uploadImg
    removeUploadImg(index) {
      this.newProductInfo.subImages.splice(index, 1)
    },
    // 富文本图片上传成功回调
    uploadSuccess(value) {
      this.editorUploadImg = value.file_path
    },
    // 获取富文本中的html内容
    getContext(html) {
      this.newProductInfo.detail = html
    }
  },
  computed: {
    // 判断一级分类是否被选中 如果选择 返回true
    isTwoSelected() {
      return this.newProductInfo.parentCategoryId ?
      this.twoSelected = true
      :
      this.twoSelected = false
    },
    // 获取商品上传图片
    getUploadImg() {
      return this.uploadImg = this.newProductInfo.subImages
    },
    // 获取detail html内容
    getEditorHtml() {
      return this.editorHtml = this.newProductInfo.detail
    },
    isDisabled() {
      return this.isGoodsDeatil ? false : true
    }
  }
}
</script>

<style lang="less" scoped>
.fa-close {
  display: none;
  color: #fff;
}
  .form-control {
    width: 100%;
    &:focus {
      border: 1px solid #1cc09f;
    }
    &:disabled {
      cursor: not-allowed;
    }
    [readonly] {
      cursor: not-allowed;
    }
  }
  .cate-select {
    width: 200px;
    display: inline-block;
    margin-right: 15px;
  }
  .uploadImgBox {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    .uploadImg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .imgMask {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      &:hover {
        cursor: pointer;
        background-color: rgba(0,0,0,.2);
        .fa-close {
          display: block;
        }
      }
    }
  }
</style>
