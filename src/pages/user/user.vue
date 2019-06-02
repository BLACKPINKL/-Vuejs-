<template>
  <section class="row">
    <div class="col-md-12">
      <v-Card>
        <div class="row">
          <div class="col-sm-6">
            <label class="page-option">
              Show
              <select @input="getPageSize" class="form-control input-sm">
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              entries
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <Table
            :loading="loading"
            :columns="columns"
            :data="userData.list"/>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="pagination-box">
              <Pagination
                :pageTotal="totalItems"
                @pageChange="pageChanged">
              </Pagination>
           </div>
          </div>
        </div>
      </v-Card>
    </div>
  </section>
</template>

<script>
// import table from 'components/table-list/table-list'
import Table from 'components/table'
import { getUserList, test } from 'service/user-service'
import {
  mapState,
  mapMutations,
  mapGetters
} from 'vuex'
  export default {
    components: {
      Table
    },
    name: 'user',
    data() {
      return {
        columns: [
          { key: 'id', title: 'ID', align: 'center', width: 100 },
          { key: 'username', title: '用户名' },
          { key: 'email', title: '邮箱', align: 'center' },
          { key: 'phone', title: '电话', align: 'center' },
          { key: 'createTime', title: '注册时间', align: 'center', width: 170 }
        ],
        userData: {}
      }
    },
    created() {
      this.loadUserList(this.page)
    },
    methods: {
      loadUserList(page) {
        getUserList(page).then((res) => {
          this.userData = Object.freeze(res.data)
          // this.userData = res.data
          // 修改总页数
          this.setPageTotal(this.userData.pages)
        })
        .catch((err) => {
          this.uTerrTips(err.msg || err.response.message)
        })
      },
      pageChanged(pageNum) {
        // 修改当前页码
        this.setPageNum(pageNum)
        this.loadUserList(this.page)
      },
      // select 改变pageSize
      getPageSize(e) {
        this.setPageSize(e.target.value)
        this.loadUserList(this.page)
      },
      // 获取修改state数据的方法
      ...mapMutations(['setPageSize', 'setPageNum', 'setPageTotal'])
    },
    computed: {
      // 获取vuex state数据
      ...mapState(['page', 'totalItems', 'loading'])
    }
  }
</script>

<style lang="less" scoped>
  .page-option {
    margin-bottom: 10px;
    white-space: nowrap;
    text-align: left;
    font-weight: normal;
    font-size: 13px;
    select {
      width: 75px;
      display: inline-block;
      &:focus {
        border: 1px solid #1cc09f;
      }
    }
  }
</style>
