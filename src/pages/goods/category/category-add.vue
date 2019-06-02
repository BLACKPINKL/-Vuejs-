<template>
  <section>
    <div class="from">
      <div class="from-item">
        <label for="" class="from-item-label">所属品类</label>
          <div class="from-item-content">
            <select class="from-item-select" v-model="parentId">
              <option value="">/ 所有</option>
              <option v-for="(item, index) in categoryList"
               :key="index"
               :value="item.id"
               >/ 所有 {{ item.name }}</option>
            </select>
          </div>
      </div>
    <div class="from-item">
      <label for="categoryName" class="from-item-label">品类名称</label>
        <div class="from-item-content">
          <input type="text"
          class="from-item-input"
          id="categoryName"
          placeholder="请输入商品名称"
          v-model.trim="categoryName"/>
        </div>
    </div>
    <div class="from-item">
      <div class="" style="text-align: right">
        <Button type="primary" @click.native="handleClick">提交</Button>
      </div>
    </div>
  </div>
  </section>
</template>

<script>
import {getCategoryList, vaildateAddCate} from 'service/category-service'
export default {
  data() {
    return {
      categoryList: [],
      categoryName: '',
      parentId: ''
    }
  },
  name: 'category-add',
  methods: {
    loadCategoryList(categoryId) {
      getCategoryList(categoryId).then((res) => {
        this.categoryList = res.data
      })
      .catch((err) => {
        this.uTerrTips(err.msg || err.response.message)
      })
    },
    handleClick() {
      let categoryInfo = {
        categoryName: this.categoryName,
        parentId: this.parentId
      }
      let vaildateStatus = vaildateAddCate(categoryInfo)
      if (vaildateStatus.status) {
        this.$emit('close', categoryInfo)
      }
      // 验证不通过
      else {
        this.uTerrTips(vaildateStatus.msg)
      }
    }
  }
}
</script>

<style lang="less">
.from {
  // mixin
  .from-components-base(@color, @border-color) {
    display: inline-block;
    width: 100%;
    outline: none;
    padding: 5px 10px;
    color: @color;
    border: 1px solid #c0c4cc;
    border-radius: 4px;
    transition: border .25s linear, border-color .25s linear;
    &:focus {
      border-color: @border-color;
    }
  }
  // mixin end

  margin: 0 auto;
  width: 60%;
  &-item {
    margin-bottom: 20px;
    &-label {
      line-height: 36px;
      text-align: left;
      width: 70px;
      padding: 0 12px 0 0;
      color: #606266;
      margin: 0;
      float: left;
    }
    &-content {
      margin-left: 80px;
      .from-item-select {
        .from-components-base(#606266, #2d8cf0);
      }
      .from-item-input {
        .from-components-base(#606266, #1cc09f);
      }
    }

  }
}
</style>
