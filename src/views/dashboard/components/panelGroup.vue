<template>
  <div class="app-container" ref="page" style="padding:0 0 0;">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in statisticsPlanlist" :key="index">
        <div class="grid-content bg-purple">
          <div class="grid-content-title clearfix"><div class="grid-content-title-box">{{item.name}}</div></div>
          <div class="grid-content-main">
            <el-row>
              <el-col :span="24">
                <div class="border-r">
                  <div class="grid-content-main-number"><count-up :start="0" :end="item.count" :duration="4"></count-up></div>
                  <div class="grid-content-main-title">{{item.name}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="grid-content-main-ico"><svg-icon class="amount-svg" icon-class="inventorys" style="width:1.2em;height:1.2em;"></svg-icon></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getStatistic } from '@/api/orders'
import CountUp from '@/components/CountUp/index'
export default {
  name: 'departmentsummary',
  components: {
    CountUp
  },
  data() {
    return {
      statisticsPlanlist: []
    }
  },
  created() {
    this.statisticsPlan()
  },
  methods: {
    statisticsPlan() {
      getStatistic().then(response => {
        if (response.code === 'OK') {
          this.statisticsPlanlist = response.data[0].status_data
        }
      })
    }
  }
}
</script>

<style>
.el-row {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #4d94ff;
    position: relative;
    padding: 13px 0 0;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 160px;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
    margin-bottom: 20px;
  }
  .grid-content:hover .grid-content-main-ico{
    color: #fff;
    background: #4d94ff;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .grid-content-title{
    height: 36px;
    line-height: 36px;
  }
  .grid-content-title-box{
    height: 36px;
    background: #fff;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
    padding: 0 15px 0 10px;
    color: #4d94ff;
    font-size: 16px;
    display: inline-block;
  }
  .grid-content-main{
    text-align: center;
    color: #fff;
    padding-top: 23px;
  }
  .border-r{
    height: 60px;
  }
  .grid-content-main-number{
    font-size: 30px;
    padding: 3px 0;
  }
  .grid-content-main-title{
    font-size: 16px;
  }
  .color-yellow{
    color: #fffb00;
  }
  .grid-content-main-ico{
    background: #94bfff;
    color: #4d94ff;
    font-size: 34px;
    height: 58px;
    width: 58px;
    border-radius: 29px;
    position: absolute;
    right: 13px;
    top: 13px;
    text-align: center;
  }
</style>