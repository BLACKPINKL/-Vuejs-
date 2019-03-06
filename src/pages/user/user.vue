<template>
  <section class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="row">
          <div class="col-sm-6">
            <label class="page-option">
              Show
              <select class="form-control input-sm">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              entries
            </label>
          </div>
          <div class="col-sm-6">456</div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="table-responsive">
              <table class="table table-bordered dataTable no-footer">
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
          <uib-pagination
           :total-items="bigTotalItems"
           v-model="pagination2"
           :max-size="maxSize"
           class="pagination-md"
           :boundary-link-numbers="true">
            </uib-pagination>
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
          pageSize: 15,
          pageNum: 1
        },
        userData: {},
        totalItems: 64,
        pagination1: { currentPage: 4 },
        pagination2: { currentPage: 1 },
        maxSize: 5,
        bigTotalItems: 175
      }
  },
    created() {
      //do something after creating vue instance
      this.getUserList()
    },
    methods: {
      getUserList() {
        this.userList(this.page).then((res) => {
          console.log(res);
          this.userData = res.data
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
      setPage: function(pageNo) {
        console.log('pageNo', pageNo);
          this.pagination1.currentPage = pageNo;
      },
      pageChanged: function() {
          console.log('Page changed to: ' + this.pagination1.currentPage);
      },
      pageLabelHtml: function (pageNo) {
          return "<b>" + pageNo + "</b>";
      }
    }
  }
</script>

<style lang="less">
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
