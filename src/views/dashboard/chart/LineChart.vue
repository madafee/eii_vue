<template>
  <div style="padding:10px 0;">
    <chart
      :options="line"
      ref="line"
      auto-resize
      :style="{height:height,width:width}"
    />
  </div>
</template>

<script>
/* eslint-disable */
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import "echarts/lib/component/markLine";
import 'echarts/lib/chart/line'
import theme from '@/utils/theme.js'
import { getData } from './data/line'

export default {
  components: {
    chart: ECharts
  },
  props: {
    childData: {
      type: Array,
      default: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      line: {},
      theme: theme
    }
  },
  watch: {
    childData() {
      this.changeMethods()
    }
  },
  mounted() {
  },
  methods: {
    changeMethods() {
      this.line = getData(this.childData)
    }
  }
}

</script>
<style>
</style>