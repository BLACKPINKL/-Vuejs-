<template>
  <section class="goods-category">
      <v-Card>
        <div class="goods-category-from" style="text-align: right">
          <Button type="primary"  @click.native="handleAddCate">
            <svg-icon iconName="tianjia"/>
            添加品类
          </Button>
        </div>
          <div>
            <Table
            :loading="loading"
            :columns="columns"
            :data="sliceCategoryList"/>
          </div>
          <div class="pagination-box">
            <Pagination
              ref="Pagination"
              :pageTotal="totalItems"
              @pageChange="pageChanged">
            </Pagination>
         </div>
      </v-Card>
  </section>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
import Table from 'components/table'
import Button from 'components/button'
import svgIcon from 'components/_layout/icon-svg/icon-svg'
import AddCate from './category-add'
import {getCategoryList, addCate, setName} from 'service/category-service'
export default {
  components: {
    Table
  },
  name: 'category',
  data() {
    return {
      edittingId: -1, //自定义编辑时的标志
      editVal: '', //修改的值
      oldEditVal: '',
      columns: [
        { key: 'id', title: 'ID', align: 'center', width: 100 },
        { key: 'name', title: '品类名称', render: (h, {row, index, column}) => {
          const vnodes = []
          if (this.edittingId === index) {
            vnodes.push(
              <input
                type="text"
                class="input-edit"
                onInput={(e) => this.handleInput(e)}
                value={this.editVal}/>,
              <Button
                size="small"
                type="warning"
                style="margin-left: 15px"
                nativeOnClick={(e) => this.handleCancel(e)}>
                <svg-icon iconName="quxiao"/>
                取消
              </Button>
            )
          }else {
            vnodes.push(<span>{(row[column.key])}</span>)
          }
          return vnodes
        }},
        { key: 'handler', title: '操作', align: 'center', width: 250, render: (h, {row, index, column}) => {
          const vnodes = []
          if (this.edittingId === index) {
            vnodes.push(
              <Button
                size="small"
                type="success" nativeOnClick={(e) => this.handleSave(row)}>
                <svg-icon iconName="tijiao"/>
                保存修改
              </Button>
            )
          } else {
            vnodes.push(
              <Button
                size="small"
                type="primary" nativeOnClick={(e) => this.handleEdit(row, index)}>
                <svg-icon iconName="bianji"/>
                修改名称
              </Button>
            )
          }

          if (this.isCategory) {
            vnodes.push(
              <router-link
                to={'category-children/' + row.id}
                style="margin-left: 15px">
                <Button type="success" size="small">
                  <svg-icon iconName="chaxun"/>
                  查看子品类
                </Button>
              </router-link>
            )
          }
          return vnodes
        }}
      ],
      categoryList: [],
      sliceCategoryList: [],
      isCategory: true
    }
  },
  created() {
    this.loadCategoryList()
  },
  watch: {
    '$route': {
      handler(to) {
        // 判断当前路由是否是子品类
        if (to.name === 'CategoryChildren') {
            this.isCategory = false
            this.loadCategoryList({categoryId: to.params.id})
        }else {
          this.isCategory = true
          this.loadCategoryList()
        }
      },
      immediate: true
    }
  },
  methods: {
    // 前端分页逻辑
    pagination(pageNum = 1) {
      let pageSize = this.page.pageSize
      // 总页数
      let totalItems = Math.ceil(this.categoryList.length / pageSize)
      this.setPageTotal(totalItems)
      // 剪切的起始值
      let startPage = (pageNum - 1) * pageSize
      // 剪切的终止值
      let endPage = startPage + pageSize
      let data = this.categoryList.slice(startPage, endPage)
      this.sliceCategoryList = data
    },
    loadCategoryList(categoryId) {
      getCategoryList(categoryId).then((res) => {
        this.categoryList = res.data
        this.pagination()
      })
      .catch((err) => {
        this.uTerrTips(err.msg || err.response.message)
      })
    },
    // 弹出添加品类组件框
    handleAddCate() {
      this.$dlg.modal(AddCate, {
        width: 500,
        height: 250,
        title: '添加品类',
        // 点击提交验证通过的回调
        callback: categoryInfo => {
          // 调用接口 添加品类
          let key = this.uTmaskTips('数据正在提交中')
          addCate(categoryInfo).then((res) => {
            this.uTclosemaskTips(key)
            this.uThanlerTips('添加成功', () => {
              // 传入参数 0相当于刷新当前页面
              this.$router.go(0)
            })
          })
          .catch((err) => {
            this.uTerrTips(err.msg || err.response.message)
          })
        }
      })
    },
    // 修改品类名称
    setCategoryName(categoryInfo) {
      let key = this.uTmaskTips('数据发送中...')
      return setName(categoryInfo).then((res) => {
        this.uTclosemaskTips(key)
        this.uTsuccessTips('修改成功')
        return res
      })
      .catch((err) => {
        this.uTerrTips(err.msg || err.response.message)
      })
    },
    // 编辑时输入文本触发
    handleInput(e) {
      let val = e.target.value
      this.editVal = val
    },
    //点击编辑按钮时触发
    handleEdit(row, i) {
      this.edittingId = i
      this.editVal = row.name
      // 保存原始值
      this.oldEditVal = row.name
    },
    // 点击保存触发
    handleSave(row) {

      if (!this.editVal) {
        this.uTerrTips('修改名称不能为空！')
        return
      }
      // 如果新的值和原始值相等 停止执行并隐藏输入框
      if (this.editVal === this.oldEditVal) {
        this.handleCancel()
        return
      }
      // 调用接口发给后端
      this.setCategoryName({
        categoryId: row.id,
        categoryName: this.editVal
      }).then(res => {
        this.handleCancel()
        // 小bug  当数据修改成功时，此时需要手动更新当前分页
        this.pagination(page.pageNum)
        // 在更新视图  不然数据显示的一页的，而页码是修改的那一页
        loadCategoryList()
      })
    },
    // 取消编辑
    handleCancel(e) {
      this.edittingId = -1
      this.editVal = ''
    },
    pageChanged(pageNum) {
      // 修改当前页码
      this.setPageNum(pageNum)
      this.pagination(pageNum)
    },
    ...mapMutations(['setPageNum', 'setPageTotal'])
  },
  computed: {
    // 获取vuex state数据
    ...mapState(['page', 'totalItems', 'loading'])
  }
}
</script>

<style lang="less">
div.v-dialog{
  div.v-dialog-content {
    overflow: inherit;
  }
}
div.v-dialog{
  div.v-dialog-body {
    overflow: inherit;
  }
}
.goods-category-from {
  margin-bottom: 15px;
}
.input-edit {
  outline: none;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding-left: 5px;
  display: inline-block;
  width: 50%;
  transition: border-color .3s;
  &:focus {
    border-color: #1cc09f;
  }
}
</style>
