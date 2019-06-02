<template>
  <section class="goods">
    <v-Card>
    <!-- 商品搜索 -->
    <div class="row goods-from">
      <div class="col-md-6">
          <select class="form-control" v-model="selected">
            <option disabled value="">请选择</option>
            <option :value="id">按商品ID查询</option>
            <option :value="name">按商品名称查询</option>
          </select>
          <input type="text" class="form-control" v-model.trim="searchVal" placeholder="输入ID或名称">
          <Button
            @click.native="searchProduct"
            type="success">
            <svg-icon iconName="chaxun"/>
            搜索
          </Button>
      </div>
      <div class="col-md-6">
        <div style="text-align: right">
          <router-link to="add">
            <Button type="primary">
              <svg-icon iconName="tianjia"/>
              添加商品
            </Button>
          </router-link>
        </div>
      </div>
    </div>
    <Table
    :loading="loading"
    :columns="columns"
    :data="goodsData.list"/>
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
  </section>
</template>

<script>
import Table from 'components/table'
import Tag from 'components/tag'
import Button from 'components/button'
import {getGoodsList, setGoodsStatus, getSearchProduct} from 'service/goods-service'
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  components: {
    Table
  },
  name: 'goods',
  data() {
    return {
      columns: [
        { key: 'id', title: 'ID', align: 'center', width: 100 },
        { key: 'name', title: '商品名称' },
        { key: 'price', title: '价格', width: 100, align: 'center' },
        { key: 'status', title: '状态', width: 100, align: 'center', render: (h, {row, index}) => {
          return (
            <Tag type={row.status == 1 ? 'success' : 'warning'}>
              {row.status == 1 ? '上架' : '下架'}
            </Tag>
          )
        }},
        { key: 'handler', title: '操作', align: 'center', width: 220, render: (h, {row, index}) => {
          return (
            <div class="table-handler">
              <Button
                type="warning"
                size="small"
                nativeOnClick={(e) => this.goodsUpperToggle(row.status, row.id)}>
                {row.status == 1 ? '下架' : '上架'}
              </Button>
              <router-link
                style="margin-left: 15px"
                to={'detail/' + row.id}>
                <Button type="primary" size="small">
                  查看
                </Button>

              </router-link>
              <router-link
                style="margin-left: 15px"
                to={'edit/' + row.id}>
                <Button size="small">
                  编辑
                </Button>
              </router-link>
            </div>
          )
        }}
      ],
      goodsData: {},
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
      getGoodsList(page).then((res) => {
        this.goodsData = res.data
        this.setPageTotal(this.goodsData.pages)
      })
      .catch((err) => {
        this.uTerrTips(err.msg || err.response.message)
      })
    },
    pageChanged(pageNum) {
      this.setPageNum(pageNum)
      this.loadGoodsList(this.page)
    },
    // 修改商品上架或下架
    setStatus(productInfo) {
      setGoodsStatus(productInfo).then((res) => {
        this.uTsuccessTips(res.data)
        this.loadGoodsList(this.page)
      })
      .catch((err) => {
        this.uTerrTips(err.msg || err.response.message)
      })
    },
    goodsUpperToggle(status, productId) {
      let text = status == 1 ?
          '你确定要下架该商品？' :
          '你确定要上架该商品？',
          newStatus = status == 1 ? 2 : 1,
          productInfo = {
            productId,
            status: newStatus
          }
      this.uTconfirmTips(text, () => {
        this.setStatus(productInfo)
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
      getSearchProduct(productOp).then((res) => {
        this.goodsData = res.data
      })
      .catch((err) => {
        this.uTerrTips(err.msg || err.response.message)
      })
    },
    ...mapMutations(['setPageNum', 'setPageTotal'])
  },
  computed: {
    ...mapState(['page', 'totalItems', 'loading'])
  }
}
</script>

<style lang="less" scoped>
  .goods-from {
    margin-bottom: 15px;
  }
  .form-control {
      width: 40%;
      display: inline-block;
      &:focus {
        border: 1px solid #1cc09f;
      }
  }

</style>
