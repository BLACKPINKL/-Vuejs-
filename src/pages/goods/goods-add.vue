<template>
  <section class="product-save">
    <div class="form-horizontal">
      <v-Card>
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
                <option disabled value="0">请选择一级分类</option>
                <option
                :value="item.id"
                v-for="(item, index) in category.oneCategoryList"
                :key="index"
                :selected="item.id == newProductInfo.parentCategoryId">
                {{ item.name }}
              </option>
              </select>
              <select
              v-show="isTwoSelected"
              v-model="newProductInfo.categoryId"
              class="form-control cate-select"
              :disabled="isDisabled">
                <option value="0" disabled>请选择二级分类</option>
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
            <div class="col-md-10">
              <ul class="uploadImgBox">
                <li v-for="(item, index) in uploadImg"
                :key="index">
                  <img
                  class="uploadImg"
                  :src="baseUrl + item"
                  >
                  <div class="imgMask"
                  @click="removeUploadImg(index)"
                  v-if="!isGoodsDetail">
                    <svg-icon iconName="close" className="svg-close"></svg-icon>
                  </div>
                </li>
              </ul>
              <div class="file-upload-box">
                <file-upload
                class="upload-img"
                :crop="false"
                @imageuploaded="imageuploaded"
                url="/manage/product/upload.do"
                inputOfFile="upload_file"
                v-if="!isGoodsDetail"
                ></file-upload>
                <svg-icon iconName="upload" className="svg-upload"></svg-icon>
              </div>
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
            :disabledEditor="isEditorDisabled"/>
        </div>
          <div class="form-group" v-if="!isGoodsDetail">
            <div class="col-md-12">
              <div style="text-align: center">
                <Button type="primary" size="large" @click.native="submitNewGoods">
                  <svg-icon iconName="tijiao"/>
                  提交
                </Button>
              </div>
            </div>
          </div>
        </v-Card>
    </div>
  </section>
</template>

<script>
import categoryEdit from './mixins/category-edit'
import categoryDetail from './mixins/category-detail'
import {checkNewGoodsInfo, saveNewGoods} from 'service/goods-service'
import {getCategoryList} from 'service/category-service'
import VueCoreImageUpload from 'vue-core-image-upload'
import editor from 'components/editor/editor'
export default {
  components: {
    fileUpload: VueCoreImageUpload,
    editor
  },
  name: 'goods-add',
  mixins: [categoryEdit, categoryDetail],
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
        price: '',
        stock: '',
        status: 1,
        parentCategoryId: 0
      },
      twoSelected: false,
      uploadPath: '/manage/product/richtext_img_upload.do',
      uploadFileName: 'upload_file',
      editorUploadImg: '',
      uploadImg: [],
      baseUrl: 'http://img.happymmall.com/'
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
    // 根据路由名称进行判断
    // 如果是 /goods/add 则渲染添加商品页
    if (this.$route.name == 'GoodsAdd') {
      this.loadCategoryList(this.newProductInfo.parentCategoryId, 'oneCategoryList')
    }
  },
  methods: {
    // 图片上传成功
    imageuploaded(res) {
      this.uploadImg.push(res.data.uri)
      this.newProductInfo.subImages.push(res.data.uri)
    },
    // 渲染select 分类
    loadCategoryList(categoryId, cateName) {
      getCategoryList(categoryId).then((res) => {
        this.category[cateName] = res.data
      })
      .catch((err) => {
        this.uTerrTips(err.msg || err.response.message)
      })
    },
    // 提交表单
    submitNewGoods() {
      // 保存图片的字段转成字符串
      let subImages = this.uTjoinArr(this.newProductInfo.subImages, ',')
      // 校验表单
      let vaildate = checkNewGoodsInfo(this.newProductInfo)
      let that = this
      if (!vaildate.status) {
        this.uTerrTips(vaildate.msg)
      }
      // 校验通过
      else {
        this.newProductInfo.subImages = subImages
        // 说明是编辑页面 把没用的字段删除 mixins edit
        this.removeNewProductInfo()

        saveNewGoods(this.newProductInfo).then((res) => {
          this.uThanlerTips(res.data, () => {
            this.$router.push('/goods')
          })
        })
        .catch((err) => {
          this.uTerrTips(err.msg || err.response.message)
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
    getEditorHtml() {
      return this.newProductInfo.detail
    }
  }
}
</script>

<style lang="less" scoped>
  @import './goods-add.less';
</style>
