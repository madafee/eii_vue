<template>
  <div style="padding:10px 0;">
    <chart
      :options="pie"
      ref="pie"
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
import 'echarts/lib/chart/pie'
import theme from '@/utils/theme.js'

import { getData } from './data/piesolid'

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
      default: '120px'
    }
  },
  data() {
    return {
      pie: {},
      theme: theme
    }
  },
  watch: {
  },
  mounted() {
      this.changeMethods()
  },
  methods: {
    changeMethods() {
      this.pie = getData(this.childData)
    }
  }
}

</script>
<style>
</style>