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
            :items-per-page="5"
            v-model="pagination"
            :max-size="maxSize"
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
  export default {
    mixins: [common, user],
    data() {
      return {
        page: {
          pageSize: 10,
          pageNum: 1
        },
        userData: {},
        pagination: {
          // 点击的那一页
          currentPage: 1
        },
        // 一共显示多少条页码
        totalItems: 15,
        // 一页展示多少条数据
        itemsPage: 10,
        maxSize: 5
      }
  },
    created() {
      //do something after creating vue instance
      this.loadUserList(this.page)
    },
    methods: {
      loadUserList(page) {
        this.getUserList(page).then((res) => {
          this.userData = res.data
          // userData.pages(总页码) => 总数据(this.userData.total) / (一页展示多少条数据)pagesize
          this.totalItems = this.userData.pages
          this.itemsPage = this.userData.pageSize
        })
        .catch((err) => {
          this.modalShow('dialog', {
            text: err.msg,
            buttons: [
              { title: '确定', handler: () => this.modalHide() }
            ]
          })
        })
      },
      pageChanged: function() {
          this.page.pageNum = this.pagination.currentPage
          this.loadUserList(this.page)
      },
      // select 改变pageSize
      setPageSize(e) {
        console.log(e.target.value);
        this.page.pageSize = e.target.value
        this.loadUserList(this.page)
      }
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
