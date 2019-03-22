<template>
  <section class="goods-category">
      <v-Card>
        <div class="col-md-12" style="text-align: right">
          <router-link to="/goods/category/save" class="btn btn-primary">添加品类</router-link>
        </div>
        <Table :thead="thead">

          <template v-slot:tbody>
            <VLoding v-if="loading"></VLoding>
            <tr
            v-for="(item, index) in categoryList"
            :key="index">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>
                <button class="btn btn-success" @click="setCategoryNanme(item.id)">修改名称</button>
                <router-link v-if="isCategory" :to="'/goods/category/children/' + item.id" class="btn btn-primary">查看子品类</router-link>
              </td>
            </tr>
          </template>
        </Table>
      </v-Card>
  </section>
</template>

<script>
import table from 'components/table-list/table-list.vue'
import common from 'utils/common'
import category from 'service/category-service'
import VInput from './components/v-input'
import VLoding from 'components/_layout/loading/loading'
export default {
  mixins: [common, category],
  components: {
    'Table': table,
    VLoding
  },
  data() {
    return {
      thead: ['品类ID', '品类名称', '操作'],
      categoryList: [],
      isCategory: true,
      loading: true
    }
  },
  created() {
    this.loadCategoryList()
  },
  watch: {
    '$route'(to, from){
      // 判断当前路由是否是子品类
      if (to.name === 'categoryChildren') {
          this.isCategory = false
          this.loadCategoryList({categoryId: to.params.id})
        }else {
          // 反之则渲染一级品类
          this.isCategory = true
          this.loadCategoryList()
        }
    }
  },
  methods: {
    loadCategoryList(categoryId) {
      this.getCategoryList(categoryId).then((res) => {
        this.categoryList = res.data
        this.loading = false
      })
      .catch((err) => {
        this.TipsModal({
          text: err || err.msg
        })
      })
    },
    // 修改品类名称
    setCategoryNanme(categoryId) {
      let that = this
      this.$dlg.modal(VInput, {
        width: 350,
        height: 350,         
        title: '请输入新的品类名称',
        callback(categoryName) {
          let categoryInfo = {
            categoryId,
            categoryName
          }
          let key = that.$dlg.mask('数据发送中')
          that.setName(categoryInfo).then((res) => {
            that.$dlg.close(key)
            that.$dlg.alert('修改成功', { messageType: 'success' })
          })
          .catch((err) => {
            that.$dlg.alert(err || err.msg, { messageType: 'error' })
          })
        }                  
      })
    }
  }
}
</script>

<style lang="less">
.my-dialog {
  input {
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #ddd;
    color: #555;
    outline: none;
    &:focus {
      border: 2px solid #1cc09f;
    }
  }
  .err {
    color: #f30;
    padding-top: 10px;
  }
}
</style>
