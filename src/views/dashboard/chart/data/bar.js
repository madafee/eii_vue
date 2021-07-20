/* eslint-disable */
export function getData(data) {
  return {
    color: ['#4d94ff', '#0073A6'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '8%',
        containLabel: true
    },
    calculable: true,
    xAxis: [
        {
            type: 'value'
        }
    ],
    yAxis: [
        {
            type: 'category',
            data: data[0].xAxisdata
        }
    ],
    series: [
        {
            type: 'bar',
            data: data[0].series
        }
    ]
  }
}
