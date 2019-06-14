<template>
  <v-Card>
    <Tabs value="pane1">
      <Tabs-pane name="pane1" label="pane1">
        <vCharts :options="polar"></vCharts>
      </Tabs-pane>
      <Tabs-pane name="pane2" label="pane2">
        2
      </Tabs-pane>
      <Tabs-pane name="pane3" label="pane3">3</Tabs-pane>
      <Tabs-pane name="pane4" label="pane4">4</Tabs-pane>
    </Tabs>
  </v-Card>
</template>

<script>
import Tabs from 'components/tabs'
import vCharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import polar from './data/polar'
export default {
  name: 'tab',
  components: {
    Tabs,
    TabsPane: Tabs.Pane,
    vCharts
  },
  data() {
    return {
      polar
    }
  }
}
</script>
