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
            <div class="table-responsive">
              <table class="table table-bordered table-hover dataTable no-footer">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>邮箱</th>
                    <th>电话</th>
                    <th>注册时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in userData.list" :key="index">
                    <td>{{item.id}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.phone}}</td>
                    <td>{{item.createTime}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="pagination-box">
            <uib-pagination
            :totalItems="totalItems"
            :items-per-page="page.pageSize"
            v-model="paginationOp"
            :max-size="5"
            class="pagination-md"
            :boundary-links="true"
            :force-ellipses="true"
            @change="pageChanged">
           </uib-pagination>
           </div>
          </div>
        </div>
      </v-Card>
    </div>
    <!-- 模态框 -->
    <dialog />
  </section>
</template>

<script>
import common from 'utils/common'
import user from 'service/user-service'

import {
  mapState,
  mapMutations,
  mapGetters
} from 'vuex'

  export default {
    mixins: [common, user],
    data() {
      return {
        userData: {},
        paginationOp: {
          currentPage: 1
        }
      }
    },
    created() {
      this.loadUserList(this.page)
    },
    methods: {
      loadUserList(page) {
        this.getUserList(page).then((res) => {
          this.userData = res.data
          // 修改总页数
          this.setPageTotal(this.userData.total)
        })
        .catch((err) => {
          this.TipsModal({
            text: err.msg || err.statusText
          })
        })
      },
      pageChanged: function() {
        // 修改当前页码
        this.setPageNum(this.paginationOp.currentPage)
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
      ...mapState(['page', 'totalItems'])
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
        border: 2px solid #1cc09f;
      }
    }
  }
</style>
