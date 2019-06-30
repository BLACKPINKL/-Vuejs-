<template>
  <div class="row">
    <div class="baseCount">
      <div class="count-body"
      v-for="(item, index) in countList"
      :key="index">
        <div class="body-left"><svg-icon :iconName="item.icon"/></div>
        <div class="body-right">
          <count-to
           :startVal="item.startVal"
           :endVal="item.endVal"
           :duration="item.duration"
           />
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <v-Card>
        <v-charts :options="bar" :autoresize="true"/>
      </v-Card>
    </div>
    <div class="col-md-6">
      <v-Card>
        <v-charts :options="pie" :autoresize="true"/>
      </v-Card>
    </div>
    <div class="col-md-12">
      <v-Card>
        <v-charts :options="gauge" :autoresize="true"/>
      </v-Card>
    </div>
  </div>
</template>

<script>
import vCharts from 'vue-echarts'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/chart/pie'

import bar from './data/bar'
import pie from './data/pie'
import gauge from './data/gauge'
import { getBaseCount } from 'service/statistic-service'
import CountTo from 'vue-count-to'
  export default {
    components: {
      vCharts,
      CountTo
    },
    name: 'statistic',
    created() {
      this.loadBaseCount()
    },
    data() {
      return {
        countList: [
          { startVal: 0, endVal: 500, duration: 3000, name: '用户总数', icon: 'yonghu' },
          { startVal: 0, endVal: 500, duration: 2000, name: '商品总数', icon: 'shangpin' },
          { startVal: 0, endVal: 550, duration: 1000, name: '订单总数', icon: 'wodedingdan' }
        ],
        baseCount: {},
        baseCountKeys: [],
        bar,
        pie,
        gauge
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
