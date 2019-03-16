<template>
  <section class="goods">
    <!-- 商品搜索 -->
    <div class="row">
      <div class="col-md-6">
          <select class="form-control" v-model="selected">
            <option disabled value="">请选择</option>
            <option :value="id">按商品ID查询</option>
            <option :value="name">按商品名称查询</option>
          </select>
          <input type="text" class="form-control" v-model.trim="searchVal" placeholder="输入ID或名称">
          <button class="btn btn-sm btn-primary" @click="searchProduct">查询</button>
      </div>
      <div class="col-md-6">
        <div style="text-align: right">
          <router-link to="goods/save" class="btn btn-md btn-primary">添加商品</router-link>
        </div>
      </div>
    </div>
    <Table :thead="thead">
      <template v-slot:tbody>
        <tr v-for="(item, index) in goodsData.list" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>
          <td>
            {{item.status == 1 ? '上架' : '下架'}}
            <button
              @click="goodsUpperToggle(item.status, item.id)"
              class="btn btn-warning btn-sm">
              {{item.status == 1 ? '下架' : '上架'}}
          </button>
          </td>
          <td>
            <router-link class="btn btn-success btn-sm" :to="'/goods/detail/' + item.id">查看</router-link>
            <router-link class="btn btn-primary btn-sm" :to="'/goods/edit/' + item.id">编辑</router-link>
          </td>
        </tr>
      </template>
    </Table>
    <div class="row">
      <div class="col-sm-12">
        <div class="pagination-box" style="text-align: right">
        <uib-pagination
        :totalItems="totalItems"
        :items-per-page="page.pageSize"
        v-model="pagination"
        :max-size="5"
        class="pagination-md"
        :boundary-links="true"
        :force-ellipses="true"
        @change="pageChanged">
       </uib-pagination>
       </div>
      </div>
    </div>
    <dialog />
  </section>
</template>

<script>
import table from 'components/table-list/table-list.vue'
import common from 'utils/common'
import goods from 'service/goods-service'
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  mixins: [common, goods],
  components: {
    'Table': table
  },
  data() {
    return {
      thead: ['商品ID', '商品名称', '价格', '状态', '操作'],
      goodsData: {},
      pagination: { currentPage: 1 },
      searchVal: '',
      selected: '',
      id: 'productId',
      name: 'productName'
    }
  },
  created() {
    this.loadGoodsList(this.page)
  },
  methods: {
    loadGoodsList(page) {
      this.getGoodsList(page).then((res) => {
        this.goodsData = res.data
        this.setPageTotal(this.goodsData.total)
      })
      .catch((err) => {
        this.TipsModal({
          text: err.msg || err.statusText
        })
      })
    },
    pageChanged() {
      this.setPageNum(this.pagination.currentPage)
      this.loadGoodsList(this.page)
    },
    goodsUpperToggle(status, productId) {
      let text = status == 1 ?
          '你确定要下架该商品？' :
          '你确定要上架该商品？',
          newStatus = status == 1 ? 2 : 1,
          productInfo = {
            productId,
            status: newStatus
          },
          that = this
      this.handleModal({
        text,
        handler() {
          // 修改商品上架或下架
          that.setGoodsStatus(productInfo).then((res) => {
            that.TipsModal({
              text: res.data
            })
            that.loadGoodsList(that.page)
          })
          .catch((err) => {
            that.TipsModal({
              text: err.msg || err.statusText
            })
          })
        }
      })
    },
    searchProduct() {
      let productSelected = this.selected,
          productSearchVal = this.searchVal,
          that = this,
          productOp = {
            pageSize: that.page.pageSize,
            pageNum: that.page.pageNum
          }
      if (!productSelected || !productSearchVal ) {
        this.loadGoodsList(this.page)
        return false
      }
      productOp[productSelected] = productSearchVal
      this.getSearchProduct(productOp).then((res) => {
        this.goodsData = res.data
      })
      .catch((err) => {
        this.TipsModal({
          text: err.msg || err
        })
      })
    },
    ...mapMutations(['setPageNum', 'setPageTotal'])
  },
  computed: {
    ...mapState(['page', 'totalItems'])
  }
}
</script>

<style lang="less">
.goods {
  .form-control {
      width: 40%;
      &:focus {
        border: 2px solid #1cc09f;
      }
  }
}
</style>
