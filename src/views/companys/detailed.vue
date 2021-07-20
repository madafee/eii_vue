<template>
  <div ref="page">
    <div class="app-container">
      <div class="user-list" style="margin-top: 0;">
        <div class="detailed-title">基本信息</div>
        <table class="ntable" cellspacing="0">
          <tr>
            <td width="13%" class="tb">企业全称</td>
            <td colspan="5">{{dataList.name}}</td>
          </tr>
          <tr>
            <td width="13%" class="tb">注册号</td>
            <td width="20%">{{dataList.no}}</td>
            <td width="13%" class="tb">登记机关</td>
            <td width="20%">{{dataList.belongorg}}</td>
            <td width="13%" class="tb">法人名</td>
            <td width="20%"><span class="lan">{{dataList.opername}}</span></td>
          </tr>
          <tr>
            <td class="tb">成立日期</td>
            <td>{{dataList.startdate}}</td>
            <td class="tb">吊销日期</td>
            <td>{{dataList.enddate === '' ? '无' : dataList.enddate}}</td>
            <td class="tb">企业状态</td>
            <td>{{dataList.status}}</td>
          </tr>
          <tr>
            <td class="tb">省份</td>
            <td>{{dataList.province}}</td>
            <td class="tb">更新日期</td>
            <td>{{dataList.updateddate}}</td>
            <td class="tb">统一社会信用代码</td>
            <td>{{dataList.creditcode}}</td>
          </tr>
          <tr>
            <td class="tb">注册资本</td>
            <td>{{dataList.registcapi}}</td>
            <td class="tb">营业开始日期</td>
            <td>{{dataList.termstart}}</td>
            <td class="tb">营业结束日期</td>
            <td>{{dataList.teamend}}</td>
          </tr>
          <tr v-if="dataList.isonstock === '0'">
            <td class="tb">发照日期</td>
            <td>{{dataList.checkdate}}</td>
            <td class="tb">组织机构代码</td>
            <td>{{dataList.orgno}}</td>
            <td class="tb">是否上市</td>
            <td>未上市</td>
          </tr>
          <tr v-else>
            <td class="tb">发照日期</td>
            <td>{{dataList.checkdate}}</td>
            <td class="tb">组织机构代码</td>
            <td colspan="3">{{dataList.orgno}}</td>
          </tr>
          <tr>
            <td class="tb">企业类型</td>
            <td>{{dataList.enttypevalue}}</td>
            <td class="tb">实缴资本</td>
            <td colspan="3">{{dataList.reccap}}</td>
          </tr>
          <tr v-if="dataList.isonstock === '1'">
            <td class="tb">是否上市</td>
            <td>{{dataList.isonstock === '0' ? '未上市' : '上市'}}</td>
            <td class="tb">上市公司代码</td>
            <td>{{dataList.stocknumber}}</td>
            <td class="tb">上市类型</td>
            <td>{{dataList.stocktype}}</td>
          </tr>
          <tr>
            <td width="13%" class="tb">地址</td>
            <td colspan="5">{{dataList.address}}</td>
          </tr>
          <tr>
            <td width="13%" class="tb">经营范围</td>
            <td colspan="5">{{dataList.scope}}</td>
          </tr>
        </table>
        <div class="detailed-title" v-if="partnersdataList.length > 0">股东信息</div>
        <table class="ntable" cellspacing="0" v-if="partnersdataList.length > 0">
          <tr>
            <th width="56px">序号</th>
            <th>投资人姓名</th>
            <th>投资人类型</th>
            <th>出资比例</th>
            <th>认缴出资额</th>
            <th>认缴出资时间</th>
          </tr>
          <tr v-for="(item,index) in partnersdataList" :key="index">
            <td style="text-align: center;">{{index+1}}</td>
            <td style="text-align: left;">{{item.stockname}}</td>
            <td style="text-align: center;">{{item.stocktype}}</td>
            <td style="text-align: center;">{{item.stockpercent}}</td>
            <td style="text-align: center;">{{item.shouldcapi}}</td>
            <td style="text-align: center;">{{item.shouddate}}</td>
          </tr>
        </table>
        <div class="detailed-title">股权信息</div>
        <div class="detailed-bor" style="position: relative;">
          <div class="detailed-bor-info">
            <el-button type="primary" icon="el-icon-download" size="small" @click="goXlsx">下载</el-button>
          </div>
          <graphecharts :dialog-stocklist='stocklist' :dialog-id='myChartMapIda' v-if="stocklist.connects"></graphecharts>
        </div>
        <div class="detailed-title" v-if="stockchanges.length > 0">股权变更信息</div>
        <div class="detailed-changelist" v-if="stockchanges.length > 0">
          <table class="ntable" cellspacing="0">
            <tr><th class="tx" width="60">序号</th> <th width="200">变更日期</th><th>变更内容</th></tr>
            <tr v-for="(item,index) in stockchanges" :key="index">
              <td style="text-align: center;">{{index+1}}</td>
              <td style="text-align: center;">{{item.create_datetime}}</td>
              <td class="items" @click="compare(item)"><div v-for="(items,i) in item.change_info" :key="i">{{items}}</div></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <el-dialog title="变更内容" :visible.sync="bgdialogvisible" :destroy-on-close="true" :close-on-click-modal="false" top="20px" width="60%" append-to-body>
      <div style="padding:20px;">
        <div class="changeinfo">{{changeinfo}}</div>
        <table class="ntable" cellspacing="0">
          <tr><th width="50%">变更前</th><th width="50%">变更后</th></tr>
          <tr>
            <td style="text-align: center;">
              <graphecharts :dialog-stocklist='oldStocklist' :dialog-id='myChartMapIdb' v-if="oldStocklist.connects"></graphecharts>
            </td>
            <td style="text-align: center;">
              <graphecharts :dialog-stocklist='newStocklist' :dialog-id='myChartMapIdc' v-if="newStocklist.connects"></graphecharts>
            </td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { getCompanysDetailed } from '@/api/companys'
import Sticky from '@/components/Sticky' // 粘性header组件
import { getDictsDictsKey } from '@/utils/auth'
import graphecharts from './graphecharts'
var baseURLStr = window.g.APIURL
export default {
  components: { Sticky,graphecharts},
  data() {
    return {
      page: {
        keyword: '',
        page_size: 20,
        page_no: 1,
      },
      loading: false,
      id: '',
      dataList: {},
      stocklist: {},
      stockchanges: [],
      bgdialogvisible: false,
      newStocklist: {},
      oldStocklist: {},
      myChartMapIda: 'myChartMapIda',
      myChartMapIdb: 'myChartMapIdb',
      myChartMapIdc: 'myChartMapIdc',
      changeinfo: '',
      partnersdataList: []
    }
  },
  created() {
    var _this = this
    _this.id = this.$route.query.id
    _this.getDetailedBox(this.$route.query.id)
  },
  watch: {
  },
  methods: {
    getDetailedBox(id){
      var _this = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var dictsAll = JSON.parse(getDictsDictsKey())
      var enterpriseBox = []
      dictsAll.forEach(function(value, index, array) {
        if (value.name === 'enterprisetype') {
          value.dict.forEach(function(v, i, a) {
            enterpriseBox.push(v)
          })
        }
      })
      getCompanysDetailed(id).then(response => {
        loading.close();
        if (response.code === 'OK') {
          enterpriseBox.forEach(function(value, index, array) {
            if (response.data[0].enttype === value.id) {
              response.data[0].enttypevalue = value.value
            }
          })
          _this.dataList = response.data[0]
          _this.partnersdataList = response.data[0].partners
          _this.stockchanges = response.data[0].stockchanges
          _this.stocklist = response.data[0].stocklist
        }
      })
    },
    compare(data) {
      var _this = this
      _this.bgdialogvisible = true
      var htmlBox = ''
      data.change_info.forEach(function(v, i, a) {
        if ((i+1) === data.change_info.length) {
          htmlBox += v
        } else {
          htmlBox += v + '，'
        }
      })
      _this.changeinfo = htmlBox
      _this.newStocklist = data.new_stocklist
      _this.oldStocklist = data.old_stocklist
    },
    goXlsx() {
      var company_name = this.dataList.name
      var is_xlsx = new Date().getTime()
      window.location = baseURLStr + '/companys/qcc/stock/export?company_name=' + company_name + '&is_xlsx=' + is_xlsx
    }
  }
}
</script>
<style>
.detailed-title{
  height: 28px;
  padding-bottom: 15px;
  font-size: 16px;
  color: #000;
  font-weight: 600;
}
.ntable{
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  border-top: #e4eef6 1px solid;
  border-right: #e4eef6 1px solid;
}
.ntable .tb {
    background: #f2f9fc;
}
.ntable td {
    padding: 10px 10px 11px 10px;
    border-bottom: #e4eef6 1px solid;
    border-left: #e4eef6 1px solid;
    word-break: break-all;
    font-size: 14px;
    line-height: 1.6;
    color: #222;
    word-wrap: break-word;
}
.ntable th {
    text-align: center;
    background: #f2f9fc;
    border-bottom: #e4eef6 1px solid;
    border-left: #e4eef6 1px solid;
    border-collapse: collapse;
    padding: 12px 2px 12px 2px;
    font-weight: normal;
    color: #333;
    line-height: 19px;
    white-space: nowrap;
    font-size: 14px;
}
.lan{
  color: #128bed;
}
.items:hover{
  cursor: pointer;
  color: #128bed;
}
.detailed-bor{
  border: #e4eef6 1px solid;
  margin-bottom: 20px;
}
.changeinfo{
  line-height: 22px;
  padding-bottom: 20px;
}
.detailed-bor-info{
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 999;
}
</style>

