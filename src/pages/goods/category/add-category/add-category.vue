<template>
  <section>
    <div class="form-horizontal">
      <div class="form-group">
        <label for="" class="col-md-2 control-label">所属品类</label>
          <div class="col-md-4">
            <select class="form-control" v-model="parentId">
              <option value="">/ 所有</option>
              <option v-for="(item, index) in categoryList"
               :key="index"
               :value="item.id"
               >/ 所有 {{ item.name }}</option>
            </select>
          </div>
      </div>
    <div class="form-group">
      <label for="categoryName" class="col-md-2 control-label">品类名称</label>
        <div class="col-md-4">
          <input type="text"
          class="form-control input-md"
          id="categoryName"
          placeholder="请输入商品名称"
          v-model.trim="categoryName"/>
        </div>
    </div>
    <div class="form-group">
      <div class="col-md-4" style="text-align: right">
        <button class="btn btn-success" @click="addCategory">提交</button>
      </div>

    </div>
  </div>
  </section>
</template>

<script>
import common from 'utils/common'
import category from 'service/category-service'
export default {
  mixins: [common, category],
  data() {
    return {
      categoryList: [],
      categoryName: '',
      parentId: ''
    }
  },
  created() {
    this.loadCategoryList()
  },
  methods: {
    loadCategoryList(categoryId) {
      this.getCategoryList(categoryId).then((res) => {
        this.categoryList = res.data
      })
      .catch((err) => {
        this.TipsModal({
          text: err || err.msg
        })
      })
    },
    addCategory() {
      let categoryInfo = {
        categoryName: this.categoryName,
        parentId: this.parentId
      }
      let vaildateStatus = this.vaildateAddCate(categoryInfo)
      if (vaildateStatus.status) {
        let key = this.$dlg.mask('数据正在提交中')
        let that = this
        this.addCate(categoryInfo).then((res) => {
          this.$dlg.close(key)
          this.$dlg.alert('添加成功', function() {
            that.$router.push({ path: '/goods/category' })
          },
          {messageType: 'success'})
        })
        .catch((err) => {
          this.$dlg.alert(err || err.msg, {
            messageType: 'error'
          })
        })
      }
      // 验证不通过
      else {
        this.$dlg.alert(vaildateStatus.msg, {
          messageType: 'error'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form-control {
  width: 100%;
}
</style>
