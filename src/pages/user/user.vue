<template>
  <section class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="row">
          <div class="col-sm-6">
            <label class="page-option">
              Show
              <select @input="setPageSize" class="form-control input-sm">
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
            :items-per-page="getItemsPage"
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
      </div>
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
      //do something after creating vue instance
      this.loadUserList(this.page)
      // console.log(this.aaa);
      // console.log(this.getItemsPage);
    },
    methods: {
      loadUserList(page) {
        this.getUserList(page).then((res) => {
          this.userData = res.data
          // userData.total(总数据)
          // this.totalItems = this.userData.total
          // this.itemsPage = this.userData.pageSize
          this.setPage({
            total: this.userData.total,
            pageSize: this.userData.pageSize
          })
          console.log(this.page);
        })
        .catch((err) => {
          this.TipsModal({
            text: err.msg || err.statusText
          })
        })
      },
      pageChanged: function() {
        console.log(this.paginationOp.currentPage);
          this.setCurrentPage(this.paginationOp.currentPage)
          this.loadUserList(this.page)
      },
      // select 改变pageSize
      setPageSize(e) {
        this.setPageSize(e.target.value)
        this.loadUserList(this.page)
      },
      ...mapMutations(['setPage', 'setCurrentPage'])
    },
    computed: {
      // ...mapState(),
      ...mapState(['page', 'setPageSize', 'totalItems']),
      ...mapGetters(['getItemsPage', 'getPageNum'])
    }
  }
</script>

<style lang="less">
  @import '../../style/pagination.less';
  .card {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
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
  }
</style>
