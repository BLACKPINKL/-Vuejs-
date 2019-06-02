<template>
  <div class="row">
    <div class="baseCount">
      <div class="count-body"
      v-for="(item, index) in countList"
      :key="index">
        <div class="body-left"><svg-icon :iconName="item.icon"></svg-icon></div>
        <div class="body-right">
          <count-to
           :startVal='item.startVal'
           :endVal='item.endVal'
           :duration='item.duration'
           ></count-to>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <v-Card>
        <Ve-histogram :settings="histogramOp" width="100%" :data="histogramData"></Ve-histogram>
      </v-Card>
    </div>
    <div class="col-md-6">
      <v-Card>
        <Ve-pie :data="pieData" width="100%"></Ve-pie>
      </v-Card>
    </div>
    <div class="col-md-12">
      <v-Card>
        <Ve-line :data="lineData" width="100%"></Ve-line>
      </v-Card>
    </div>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VePie from 'v-charts/lib/pie.common'
import { getBaseCount } from 'service/statistic-service'
import CountTo from 'vue-count-to'
  export default {
    components: {
      VeLine,
      VeHistogram,
      VePie,
      CountTo
    },
    name: 'statistic',
    created() {
      this.loadBaseCount()
    },
    data() {
      this.histogramOp = {
        axisSite: { right: ['下单率'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['数值', '比率']
      }
      return {
        countList: [
          { startVal: 0, endVal: 100, duration: 3000, name: '用户总数', icon: 'yonghu' },
          { startVal: 0, endVal: 100, duration: 2000, name: '商品总数', icon: 'shangpin' },
          { startVal: 0, endVal: 110, duration: 1000, name: '订单总数', icon: 'wodedingdan' }
        ],
        baseCount: {},
        baseCountKeys: [],
        lineData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        histogramData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        pieData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        }
      }
    },
    methods: {
      loadBaseCount() {
        getBaseCount().then((res) => {
          this.baseCount = res.data
          this.baseCountKeys = Object.keys(this.baseCount)
          this.countList.forEach((item, i) => {
            item.endVal = this.baseCount[this.baseCountKeys[i]]
          })
        })
        .catch((err) => {
          this.uTerrTips(err.msg || err.response.message)
        })
      }
    }
}
</script>

<style lang="less" scoped>
.baseCount {
  display: flex;
  align-items: center;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
  background-color: #fff;
  margin: 0 15px 0 15px;
  margin-bottom: 15px;
  .count-body {
    flex: auto;
    height: 140px;
    display: flex;
    align-items: center;
    // padding-right: 20px;
    .body-left {
      display: flex;
      align-items: center;
      background-color: rgb(45, 140, 240);
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      padding: 10px;
      height: 100%;
      fill: #fff;
      font-size: 25px;
    }
    .body-right {
      width: 100%;
      text-align: center;
      span {
        color: #1cc09f;
        // color: rgb(220, 147, 135);
        font-size: 45px;
      }
      p {
        text-align: center;
        margin: 0;
        padding-top: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
