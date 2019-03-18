<template>
  <div class="row">
    <div class="baseCount">
      <div class="count-body">
        <div class="body-left"><i class="fa fa-user fa-3x"></i></div>
        <div class="body-right">
          <span>151</span>
          <p>用户总数</p>
        </div>
      </div>
      <div class="count-body">
        <div class="body-left"><i class="fa fa-user fa-3x"></i></div>
        <div class="body-right">
          <span>151</span>
          <p>用户总数</p>
        </div>
      </div>
      <div class="count-body">
        <div class="body-left"><i class="fa fa-user fa-3x"></i></div>
        <div class="body-right">
          <span>151</span>
          <p>用户总数</p>
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
    <div class="col-md-6">
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
  export default {
    components: {
      VeLine,
      VeHistogram,
      VePie
    },
    data() {
      this.histogramOp = {
        axisSite: { right: ['下单率'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['数值', '比率']
      }
      return {
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
    }
  }
</script>

<style lang="less">
.baseCount {
  display: flex;
  align-items: center;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
  background-color: #fff;
  margin: 0 15px 0 15px;
  margin-bottom: 15px;
  .count-body {
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 20px;
    .body-left {
      display: flex;
      align-items: center;
      background-color: rgb(45, 140, 240);
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      padding: 10px;
      height: 100%;
      color: #fff;
    }
    .body-right {
      span {
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
