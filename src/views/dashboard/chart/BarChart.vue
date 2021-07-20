<template>
  <div>
    <chart
      :options="bar"
      ref="bar"
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
import 'echarts/lib/chart/bar'
import theme from '@/utils/theme.js'

import { getData } from './data/bar'

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
      default: '600px'
    }
  },
  data() {
    return {
      bar: {},
      theme: theme
    }
  },
  watch: {
    childData() {
      this.changeMethods()
    }
  },
  mounted() {
      this.changeMethods()
  },
  methods: {
    changeMethods() {
      this.bar = getData(this.childData)
    }
  }
}

</script>
<style>
</style>