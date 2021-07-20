<template>
  <div class="app-container" ref="page">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="24">
        <panel-group></panel-group>
      </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-row>
          <!-- <el-col :span="18">
            <div class="childbox" v-if="cpuListPie.length > 0">
              <bar-chart :child-data="cpuListPie"></bar-chart>
            </div>
          </el-col> -->
          <el-col :span="24">
            <div class="childbox" style="position: relative;padding-bottom:30px;">
              <div class="childbox-title">最新股权变更企业</div>
              <stockchanges></stockchanges>
              <span class="more"><el-button type="primary" size="small" @click="more">更多<i class="el-icon-d-arrow-right el-icon--right"></i></el-button></span>
            </div>
          </el-col>
        </el-row>
    </el-row>
    <stockchanges-list :dialog-visible='stockchangesData'></stockchanges-list>
  </div>
</template>

<script>
/* eslint-disable */
import { getStatistic } from '@/api/orders'
import panelGroup from './components/panelGroup'
import stockchanges from './components/stockchanges'
import stockchangesList from './components/stockchangesList'
import BarChart from '@/views/dashboard/chart/BarChart'
export default {
  name: 'dashboard',
  components: { panelGroup, BarChart, stockchanges,stockchangesList },
  data() {
    return {
      cpuListPie: [],
      stockchangesData: [],
      stockchangescdialogvisible: true,
    }
  },
  created() {
    this.statisticsPlan()
  },
  methods: {
    statisticsPlan() {
      getStatistic().then(response => {
        if (response.code === 'OK') {
          // this.cpuListPie = response.data[0].area_data
          var xAxisdata = []
          var series = []
          response.data[0].area_data.forEach(function(value, index, array) {
            xAxisdata.push(value.name)
            series.push(value.count)
          })
          var cpudatabox = {
            xAxisdata: xAxisdata,
            series: series
          }
          console.log(cpudatabox)
          this.cpuListPie = Array(cpudatabox)
        }
      })
    },
    more() {
      var stockchangesData = {
        stockchangescdialogvisible: !this.stockchangescdialogvisible,
        id: ''
      }
      this.stockchangesData = Array(stockchangesData)
    }
  }
}
</script>

<style>

.el-card__body{
  padding:10px;
}
.indexdialog .el-dialog__body{
  padding: 10px 20px;
}
.el-table th{
   background-color: #ebf5ff;
}
.search{
  background: #fff;
}
.center{
  text-align: center;
  margin-top: 22px;
}
.el-form-item{
  margin-top: 22px;
}
.user-list{
  background: #fff;
  padding: 20px;
  margin-top: 20px;
}
.user-list-nav{
  text-align: right;
}
.user-list-bottomnav{
  padding-top: 20px;
}
.addlist{
  color: #7ecd58;
  width: 14px;
  height: 16px;
  margin: 0 5px;
  cursor: pointer;
}
.editlist{
  color: #e6a23c;
  width: 14px;
  height: 16px;
  margin: 0 5px;
  cursor: pointer;
}
.deletelist{
  color: #ff6060;
  width: 14px;
  height: 16px;
  margin: 0 5px;
  cursor: pointer;
}
.page{
  padding: 20px 0 0 0;
}
.dialog{
  width: 1000px;
  margin-left: 500px;
}
.userinput{
  width: 260px;
}
.index-table{
  /* border: 1px solid #ebeef5;
  background: #fff;
  padding:10px; */
  margin-bottom: 20px;
}
.fr{
  float: right;
  cursor: pointer;
}
.amount-left{
  float: left;
  width: 20%;
}
.amount-right{
  float: right;
  width: 70%;
  text-align: right;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: bold;
}
.number{
  color: #000;
}
.amount-margin{
  margin-bottom: 10px;
  height: 75px;
}
.amount-svg{
  margin-top: 7px;
}
.childbox{
  background: #fff;
  margin: 10px;
  border-radius: 5px;
}
.childbox-title{
  padding: 15px;
  color: #333;
  background: #fcfcfc;
  border-bottom: 1px solid #eee;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.more{
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
</style>