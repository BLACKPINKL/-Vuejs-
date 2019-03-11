<template>
  <section class="goods">
    <Table :thead="thead">
      <template v-slot:tbody>
        <tr v-for="(item, index) in goodsData.list" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>
          <td>
            {{item.status == 1 ? '上架' : '下架'}}
            <button @click="goodsUpperToggle" class="btn btn-warning btn-sm">{{item.status == 1 ? '下架' : '上架'}}</button>
          </td>
          <td>
            <router-link class="btn btn-success btn-sm" to="goods/detail">查看</router-link>
            <router-link class="btn btn-primary btn-sm" to="goods/edit">编辑</router-link>
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
      pagination: { currentPage: 1 }
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
    goodsUpperToggle() {
      // TODO: 点击按钮商品上架或下架
      console.log('上架或下架');
    },
    ...mapMutations(['setPageNum', 'setPageTotal'])
  },
  computed: {
    ...mapState(['page', 'totalItems'])
  }
}
</script>
