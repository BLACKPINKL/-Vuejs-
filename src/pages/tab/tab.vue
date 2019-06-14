<template>
  <v-Card>
    <Tabs value="pane1">
      <Tabs-pane name="pane1" label="pane1">
        <Ve-radar :data="chartData"></ve-radar>
      </Tabs-pane>
      <Tabs-pane name="pane2" label="pane2">

      </Tabs-pane>
      <Tabs-pane name="pane3" label="pane3">123</Tabs-pane>
      <Tabs-pane name="pane4" label="pane4">123</Tabs-pane>
    </Tabs>
  </v-Card>
</template>

<script>
import Tabs from 'components/tabs'
import VeRadar from 'v-charts/lib/radar.common'
export default {
  name: 'tab',
  components: {
    Tabs,
    TabsPane: Tabs.Pane,
    VeRadar
  },
  data() {

    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  }
}
</script>
