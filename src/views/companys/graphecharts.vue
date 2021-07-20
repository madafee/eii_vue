<template>
  <div class="index">
    <div :id="id" :style="{width: '100%', height: '500px'}"></div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'index',
  props: {
    dialogStocklist: {
      type: Object
    },
    dialogId: {
      type: String
    }
  },
  data() {
    return {
      id: this.dialogId
    }
  },
  computed:{
  },
  created() {
  },
  mounted(){
    this.drawMap();
  },
  watch: {
  },
  methods: {
    drawMap(){
      var _this = this
      var color =['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#D47F00', '#00FFFF', '#D4FF55', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#7FBF55', '#a5c2d5', '#cbab4f', '#76a871', '#a56f8f', '#c12c44', '#9f7961', '#76a871', '#6f83a5', '#b3d74c', '#74aae3', '#5cdec6', '#3526de', '#9d65ee', '#a8b3e3', '#6bc1b7', '#6e98d6', '#F0F8FF', '#FAEBD7', '#00FFFF', '#7FFFD4', '#F0FFFF', '#F5F5DC', '#FFE4C4', '#000000', '#FFEBCD', '#0000FF', '#8A2BE2', '#A52A2A', '#DEB887', '#5F9EA0', '#7FFF00', '#D2691E', '#FF7F50', '#6495ED', '#FFF8DC', '#DC143C', '#00FFFF', '#00008B', '#008B8B', '#B8860B', '#A9A9A9', '#A9A9A9', '#006400', '#BDB76B', '#8B008B', '#556B2F', '#FF8C00', '#9932CC', '#8B0000', '#E9967A', '#8FBC8F', '#483D8B', '#2F4F4F', '#2F4F4F', '#00CED1', '#9400D3', '#FF1493', '#00BFFF', '#696969', '#696969', '#1E90FF', '#B22222', '#FFFAF0', '#228B22', '#FF00FF', '#DCDCDC', '#F8F8FF', '#FFD700', '#DAA520', '#808080', '#808080', '#008000', '#ADFF2F', '#F0FFF0', '#FF69B4', '#CD5C5C', '#4B0082', '#FFFFF0', '#F0E68C', '#E6E6FA', '#FFF0F5', '#7CFC00', '#FFFACD', '#ADD8E6', '#F08080', '#E0FFFF', '#FAFAD2', '#D3D3D3', '#D3D3D3', '#90EE90', '#FFB6C1', '#FFA07A', '#20B2AA', '#87CEFA', '#778899', '#778899', '#B0C4DE', '#FFFFE0', '#00FF00', '#32CD32', '#FAF0E6', '#FF00FF', '#800000', '#66CDAA', '#0000CD', '#BA55D3', '#9370DB', '#3CB371', '#7B68EE', '#00FA9A', '#48D1CC', '#C71585', '#191970', '#F5FFFA', '#FFE4E1', '#FFE4B5', '#FFDEAD', '#000080', '#FDF5E6', '#808000', '#6B8E23', '#FFA500', '#FF4500', '#DA70D6', '#EEE8AA', '#98FB98', '#AFEEEE', '#DB7093', '#FFEFD5', '#FFDAB9', '#CD853F', '#FFC0CB', '#DDA0DD', '#B0E0E6', '#800080', '#663399', '#FF0000', '#BC8F8F', '#4169E1', '#8B4513', '#FA8072', '#F4A460', '#2E8B57', '#FFF5EE', '#A0522D', '#C0C0C0', '#87CEEB', '#6A5ACD', '#708090', '#708090', '#FFFAFA', '#00FF7F', '#4682B4', '#D2B48C', '#008080', '#D8BFD8', '#FF6347', '#40E0D0', '#EE82EE', '#F5DEB3', '#FFFFFF', '#F5F5F5', '#FFFF00', '#9ACD32']
      var dialogStocklist = _this.dialogStocklist
      dialogStocklist.points.forEach(function(value, index, array) {
        value.symbolSize = 50,
        value.itemStyle = {
          normal: {
            color: color[index]
          }
        }
      })
      dialogStocklist.connects.forEach(function(value, index, array) {
        var val= value.value+'%'
        value.target = value.dest
        value.name = val
        value.value = val
      })
      console.log(dialogStocklist)
      var id = _this.dialogId
      let myChart = this.$echarts.init(document.getElementById(id))
      myChart.setOption({
          title: {},
          tooltip: {},
          series: [
              {
                  type: 'graph',
                  layout: 'circular',
                  symbolSize: 80,
                  roam: true,
                  edgeSymbol: ['circle', 'arrow'],
                  edgeSymbolSize: [4, 10],
                  edgeLabel: {
                      normal: {
                          textStyle: {
                              fontSize: 20
                          }
                      }
                  },
                  force: {
                      repulsion: 2500,
                      edgeLength: [10, 50]
                  },
                  draggable: true,
                  edgeLabel: {
                      normal: {
                          show: true,
                          formatter: function (x) {
                              return x.data.name;
                          }
                      }
                  },
                  label: {
                      normal: {
                          show: true,
                          textStyle: {
                          }
                      }
                  },
                  label: {
                      normal: {
                          show: true,
                          formatter: function (x) {
                            console.log(x)
                            return x.data.name+'\n'+x.data.percent+'%';
                          }
                      }
                  },
                  data: dialogStocklist.points,
                  links: dialogStocklist.connects
              }
          ]
      });
    }
  }
}
</script>

<style scoped>
</style>
