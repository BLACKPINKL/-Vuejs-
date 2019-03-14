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
                placeholder="请输入商品名称">
              </div>
          </div>
          <div class="form-group">
            <label for="productSub" class="col-md-2 control-label">商品描述</label>
            <div class="col-md-5">
              <input type="text"
              class="form-control input-md"
              id="productSub"
              v-model.trim="newProductInfo.subtitle"
              placeholder="请输入商品描述">
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-2 control-label">所属分类</label>
            <div class="col-md-10">
              <select class="form-control cate-select" @input="changeSelected">
                <option value="">请选择一级分类</option>
                <option
                :value="item.id"
                v-for="(item, index) in category.oneCategoryList"
                :key="index">
                {{ item.name }}
              </option>
              </select>
              <select
              v-show="getTwoSelected"
              v-model="newProductInfo.categoryId"
              class="form-control cate-select">
                <option value="" disabled>请选择二级分类</option>
                <option
                :value="item1.id"
                v-for="(item1, index2) in category.twoCategoryList"
                :key="index2">{{item1.name}}</option>
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
                placeholder="请输入商品价格">
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
                placeholder="请输入商品库存">
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
            ></file-upload>
            <img
            width="80px"
            height="80px"
            :src="item"
            v-for="(item, index) in uploadImg" :key="index">
          </div>
          <div class="form-group">
            <label for="" class="col-md-2 control-label">商品详情</label>
            <editor
            :uploadPath="uploadPath"
            :uploadFileName="uploadFileName"
            @uploadSuccess="uploadSuccess"
            :editorUploadImg="editorUploadImg"
            @getContext="getContext"/>
        </div>
          <div class="form-group">
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
      uploadImg: []
    }
  },
  created() {
    this.loadCategoryList(this.newProductInfo.parentCategoryId, 'oneCategoryList')
  },
  methods: {
    // 图片上传成功
    imageuploaded(res) {
      this.uploadImg.push(res.data.url)
      this.newProductInfo.subImages.push(res.data.url.replace('http://img.happymmall.com/', ''))
    },
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
    // 提交表单
    submitNewGoods() {
      console.log('submit');
      let subImages = this.joinArr(this.newProductInfo.subImages, ',')
      let vaildate = this.checkNewGoodsInfo(this.newProductInfo)
      let that = this
      if (!vaildate.status) {
        this.TipsModal({
          text: vaildate.msg
        })
      }else {
        this.newProductInfo.subImages = subImages
        this.saveNewGoods(this.newProductInfo).then((res) => {
          this.handleModal({
            text: res.data,
            buttons: [
              {
                title: '确定',
                handler() {
                  that.$router.push('/goods')
                  this.modalHide()
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
    changeSelected(e) {
      if (!e.target.value) {
        this.newProductInfo.parentCategoryId = 0
        return
      }
      this.newProductInfo.parentCategoryId = parseInt(e.target.value)
      this.loadCategoryList({categoryId: this.newProductInfo.parentCategoryId}, 'twoCategoryList')
    },
    // 富文本图片上传成功回调
    uploadSuccess(value) {
      this.editorUploadImg = value.file_path
    },
    getContext(html) {
      this.newProductInfo.detail = html
    }
  },
  computed: {
    getTwoSelected() {
      return this.newProductInfo.parentCategoryId ? this.twoSelected = true : this.twoSelected = false
    }
  }
}
</script>

<style lang="less" scoped>
  .form-control {
    width: 100%;
    &:focus {
      border: 1px solid #1cc09f;
    }
  }
  .cate-select {
    width: 200px;
    display: inline-block;
    margin-right: 15px;
  }
</style>
