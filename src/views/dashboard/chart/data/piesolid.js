/* eslint-disable */
export function getData(data) {
  return {
    color: data[0].colors,
    title: {
      text: '',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: data[0].legenddata
    },
    series: [
      {
        name: '数量',
        type: 'pie',
        radius: data[0].radius,
        center: ['50%', '50%'],
        labelLine: {
            show: true
        },
        data: data[0].xAxisdata,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}
