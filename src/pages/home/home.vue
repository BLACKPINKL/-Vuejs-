<template>
  <div class="home">
    <div class="col-md-6">
      <v-chart :options="userCount"></v-chart>
    </div>
    <div class="col-md-6">
    <v-chart :options="goodsCount"></v-chart>
    </div>
    <div class="col-md-6">
    <v-chart :options="orderCount"></v-chart>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
// 饼图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/visualMap'
// 折线图
import 'echarts/lib/chart/line'
  export default {
    data() {
      return {
        userCount: {
          title : {
              text: '用户总数',
              subtext: '纯属虚构'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
              data:['注册量','在线量']
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'注册量',
                  type:'bar',
                  data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                  markPoint : {
                      data : [
                          {type : 'max', name: '最大值'},
                          {type : 'min', name: '最小值'}
                      ]
                  },
                  markLine : {
                      data : [
                          {type : 'average', name: '平均值'}
                      ]
                  }
              },
              {
                  name:'在线量',
                  type:'bar',
                  data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                  markPoint : {
                      data : [
                          {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                          {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                      ]
                  },
                  markLine : {
                      data : [
                          {type : 'average', name : '平均值'}
                      ]
                  }
              }
          ]
        },
        goodsCount: {
          backgroundColor: '#fff',
          title: {
              text: '商品销售统计',
              left: 'center',
              top: 20,
              textStyle: {
                  color: '#000'
              }
          },

          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                  colorLightness: [0, 1]
              }
          },
          series : [
              {
                  name:'商品购买来源',
                  type:'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:[
                      {value:335, name:'直接购物'},
                      {value:310, name:'海外代购'},
                      {value:274, name:'微商推销'},
                      {value:235, name:'视频广告'},
                      {value:400, name:'搜索引擎'}
                  ].sort(function (a, b) { return a.value - b.value; }),
                  roseType: 'radius',
                  label: {
                      normal: {
                          textStyle: {
                              color: '#000'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          lineStyle: {
                              color: '#283643'
                          },
                          smooth: 0.2,
                          length: 10,
                          length2: 20
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: '#c23531',
                          shadowBlur: 200,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  },

                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                      return Math.random() * 200;
                  }
              }
          ]
        },
        orderCount: {
          title: {
            text: '订单总数'
          },
          tooltip: {
           trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }]
        }
      }
    }
  }
</script>

<style lang="less">
  .echarts {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    margin-top: 30px;
  }
</style>
