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
              <!-- 一级分类 :value="oneCategorySelected()" v-model="newProductInfo.parentCategoryId"-->
              <Select
              class="cate-select"
              dropHeight="none"
              :disabled="isDisabled"
              v-model="newProductInfo.parentCategoryId">
                <virtual-scroll :size="34" :remain="10" v-if="flag.oneCategoryList">
                  <Option
                    v-for="item in category.oneCategoryList"
                    :value="item.id"
                    :key="item.id">
                    {{ item.name }}
                  </Option>
                </virtual-scroll>
              </Select>
              <!-- 二级分类  :value="twoCategorySelected()"-->
              <Select
              v-if="isTwoSelected"
              dropHeight="350"
              v-model="newProductInfo.categoryId"
              class="cate-select"
              :disabled="isDisabled">
              <virtual-scroll :size="34" :remain="10" v-if="flag.twoCategoryList">
                <Option
                  :value="item1.id"
                  v-for="item1 in category.twoCategoryList"
                  :key="item1.id">
                  {{item1.name}}
                </Option>
                </virtual-scroll>
              </Select>
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
            <label class="col-md-2 control-label">商品图片</label>
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
                    <svg-icon iconName="close" className="svg-close"/>
                  </div>
                </li>
              </ul>
              <div class="file-upload-box" v-if="!isGoodsDetail">
                <file-upload
                class="upload-img"
                :crop="false"
                @imageuploaded="imageuploaded"
                url="/manage/product/upload.do"
                inputOfFile="upload_file"
                />
                <svg-icon iconName="upload" className="svg-upload"/>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-2 control-label">商品详情</label>
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
import virtualScroll from 'vue-virtual-scroll-list'
import editor from 'components/editor/editor'
export default {
  components: {
    fileUpload: VueCoreImageUpload,
    editor,
    virtualScroll
  },
  name: 'goods-add',
  mixins: [categoryEdit, categoryDetail],
  data() {
    return {
      category: {
        oneCategoryList: [],
        twoCategoryList: []
      },
      flag: {
        oneCategoryList: false,
        twoCategoryList: false
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
    if (this.$route.name === 'GoodsAdd') {
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
          this.flag[cateName] = true
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
      this.uploadImg.splice(index, 1)
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
      return this.newProductInfo.parentCategoryId ? true: false
    },
    getEditorHtml() {
      return this.newProductInfo.detail
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
  &:disabled {
    cursor: not-allowed;
  }
  [readonly] {
    cursor: not-allowed;
  }
}
.cate-select {
  width: 220px;
  margin-right: 10px;
}

.file-upload-box {
  position: relative;
  border-radius: 5px;
  width: 100px;
  height: 100px;
  border: 1px solid #d7d7d7;
  background-color: #f8f8f8;
  overflow: hidden;
  transition: border-color .25s;
  &:hover {
    border-color: #1cc09f;
  }
  .upload-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: transparent;
    z-index: 30;
  }
  .svg-upload {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 50px;
  }
}
.uploadImgBox {
  padding: 0;
  margin-bottom: 10px;
  overflow: hidden;
  li {
    float: left;
    list-style: none;
    width: 100px;
    height: 100px;
    position: relative;
    margin-right: 10px;
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
      .svg-close {
        display: none;
        font-size: 30px;
      }
      &:hover {
        cursor: pointer;
        background-color: rgba(0,0,0,.3);
        .svg-close {
          display: block;
          fill: #fff;
        }
      }
    }
  }
}
</style>
