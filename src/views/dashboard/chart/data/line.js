/* eslint-disable */
export function getData(data) {
  return {
    color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
    // title: {
    //   text: data[0].title
    // },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: data[0].legenddata
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      top: '8%',
      containLabel: true
    },
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data[0].xAxisdata
    },
    yAxis: {
      type: 'value'
    },
    series:data[0].series
  }
}
// series的数据里
// smooth: true,
// markLine: {
//   Symbol: 'none',
//   label: {
//     position: 'end',
//     formatter: "警戒线"
//   },
//   data : [{
//     silent:false,             //鼠标悬停事件  true没有，false有
//     lineStyle:{               //警戒线的样式  ，虚实  颜色
//         type:"solid",
//         color:"rgba(238, 99, 99)"
//     },
//     name: '警戒线',
//     yAxis: '30'
//   }]
// }