<template>
  <section class="product-save">
    <!-- TODO: 添加商品页面 -->
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
              v-model="newProductInfo.id"
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
                v-model="newProductInfo.price"
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
                v-model="newProductInfo.stock"
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
            <textarea rows="3" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <div class="col-md-12">
              <div style="text-align: center">
              <button class="btn btn-lg" @click="saveNewGoods">提交</button>
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
import VueCoreImageUpload from 'vue-core-image-upload';
export default {
  mixins: [common, goods, category],
  components: {
    fileUpload: VueCoreImageUpload
  },
  data() {
    return {
      uploadImg: [],
      category: {
        oneCategoryList: [],
        twoCategoryList: []
      },
      newProductInfo: {
        categoryId: 0,
        name: '',
        subtitle: '',
        mainImage: '',
        subImages: '',
        detail: '',
        price: 1,
        stock: 1,
        status: 1,
        id: 1,
      },
      twoSelected: false,
      fileList: {}
    }
  },
  created() {
    this.loadCategoryList(this.newProductInfo.categoryId, 'oneCategoryList')
  },
  methods: {
    // 图片上传成功
    imageuploaded(res) {
      console.log(res);
      this.uploadImg.push(res.data.url)
      console.log(this.uploadImg);
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
    saveNewGoods() {
      console.log('submit');
    },
    changeSelected(e) {
      if (!e.target.value) {
        this.newProductInfo.categoryId = 0
        return
      }
      this.newProductInfo.categoryId = e.target.value
      this.loadCategoryList({categoryId: this.newProductInfo.categoryId}, 'twoCategoryList')
    }

  },
  computed: {
    getTwoSelected() {
      return this.newProductInfo.categoryId ? this.twoSelected = true : this.twoSelected = false
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
