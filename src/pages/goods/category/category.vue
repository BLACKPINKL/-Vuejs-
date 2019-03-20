<template>
  <section class="goods-category">
      <v-Card>
        <Table :thead="thead">
          <template v-slot:tbody>
            <tr
            v-for="(item, index) in categoryList"
            :key="index">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>
                <button class="btn btn-success" @click="setCategoryNanme">修改名称</button>
                <router-link :to="'/goods/category/children/' + item.id" class="btn btn-primary">查看子品类</router-link>
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
export default {
  mixins: [common, category],
  components: {
    'Table': table
  },
  data() {
    return {
      thead: ['品类ID', '品类名称', '操作'],
      categoryList: []
    }
  },
  created() {
    //do something after creating vue instance
    this.loadCategoryList()
  },
  methods: {
    loadCategoryList() {
      this.getCategoryList().then((res) => {
        this.categoryList = res.data
      })
      .catch((err) => {
        this.TipsModal({
          text: err || err.msg
        })
      })
    },
    setCategoryNanme() {
      // TODO: 
    }
  },
  computed: {

  }
}
</script>
