<template>
  <div ref="page">
    <sticky :z-index="10" :class-name="'sub-navbar draft'">
      <div style="text-align: center;">
        <el-input style="width:350px;margin-right:10px;" v-model="page.keyword" placeholder="检索关键字" clearable></el-input>
        <el-button class="common-button" type="primary" @click="companysListBox()" v-preventReClick>查 询</el-button>
      </div>
      <div class="sticky-right-new">
        <el-button class="common-button" size="small" type="primary" @click="addCompanys()" v-preventReClick v-permission="[$authsmessage.ADMIN]">新增企业</el-button>
        <el-button class="common-button" size="small" type="primary" @click="changeExport()" v-preventReClick>导出股权变更</el-button>
      </div>
    </sticky>
    <div class="app-container" v-if="dataList.length > 0" v-loading="loading">
      <div class="user-list" style="padding:0; margin-top: 0;">
        <div class="companys-title"><h4>为您找到 <span class="text-danger">{{totalCount}}</span> 条相关结果</h4></div>
        <div class="companys-box">
          <div class="companys-list" v-for="(item,index) in dataList" :key="index">
            <div class="companys-list-title"><span class="title" @click="companysDetailed(item.id)">{{item.name}}</span> <el-tag size="mini" effect="dark" type="">{{item.status}}</el-tag></div>
            <div class="companys-list-box">法定代表人：<span style="color: #128bed;margin-right: 30px;">{{item.opername}}</span>  成立日期： <span>{{item.startdate}}</span></div>
            <div class="companys-list-box">注册号：<span>{{item.no}}</span></span></div>
            <div class="companys-list-box">统一社会信用代码：<span>{{item.creditcode}}</span></div>
            <div class="companys-button">
              <el-button type="primary" size="small" plain @click="deleteCompanySqcc(item.id)" v-preventReClick v-permission="[$authsmessage.ADMIN]">删除</el-button>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="page" style="padding: 20px;">
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :page-size="page.page_size"
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="not-yet" v-else>暂无数据！</div>
    <qccdialog :dialog-visible='qccdialogData' @editsuccess="editsuccess"></qccdialog>
    <el-dialog title="导出股权变更" :visible.sync="changeExportVsible" :destroy-on-close="true" :close-on-click-modal="false" width="400px">
      <div class="padding20">
         <el-form ref="form" label-width="100px" size="medium">
           <el-form-item label="开始时间：">
            <el-date-picker style="width:200px;" size="small" v-model="start_date" type="date" value-format="yyyy-MM-dd" placeholder="请输入开始时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker style="width:200px;" size="small" v-model="end_date" type="date" value-format="yyyy-MM-dd" placeholder="请输入结束时间"></el-date-picker>
          </el-form-item>
         </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeExportVsible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="goXlsx" size="small" v-preventReClick>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { getCompanysList, deleteCompanys } from '@/api/companys'
import Sticky from '@/components/Sticky' // 粘性header组件
import qccdialog from './qccdialog'
import permission from '@/directive/permission/index.js' // 权限判断指令
var baseURLStr = window.g.APIURL
export default {
  directives: { permission },
  components: { Sticky, qccdialog },
  data() {
    return {
      page: {
        keyword: '',
        page_size: 20,
        page_no: 1,
      },
      dataList: [],
      totalCount: 0,
      currentPage: 1,
      listLoading: false,
      qccdialogData: [],
      qccdialogvisible: true,
      loading: false,
      changeExportVsible: false,
      start_date: '',
      end_date: ''
    }
  },
  created() {
    this.companysListBox()
  },
  watch: {
  },
  methods: {
    companysListBox() {
      var _this = this
      _this.loading = true
      getCompanysList(_this.page).then(response => {
      _this.loading = false
        if (response.code === 'OK') {
          _this.dataList = response.data
          _this.totalCount = response.count
          _this.listLoading = false
        }
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.page.page_no = val
      this.dataList = []
      this.companysListBox()
    },
    addCompanys() {
      var qccdialogData = {
        qccdialogvisible: !this.qccdialogvisible,
        id: ''
      }
      this.qccdialogData = Array(qccdialogData)
    },
    editsuccess(data) {
      if (data === true) {
        this.companysListBox()
      }
    },
    deleteCompanySqcc(id) {
      var _this = this
      deleteCompanys(id).then(response => {
        if (response.code === 'OK') {
          _this.companysListBox()
        }
      })
    },
    companysDetailed(id) {
      this.$router.push({ path: '/companys/detailed?id=' + id })
    },
    changeExport(){
      var _this = this
      _this.changeExportVsible = true
      _this.start_date = ''
      _this.end_date = ''
    },
    goXlsx() {
      var _this = this
      var start_date = _this.start_date
      var end_date = _this.end_date
      var is_xlsx = new Date().getTime()
      window.location = baseURLStr + '/companys/stock/change/export?start_date=' + start_date + '&end_date=' + end_date + '&is_xlsx=' + is_xlsx
      _this.changeExportVsible = false
    }
  }
}
</script>
<style>
.kfz{
  text-align: center;
}
.companys-box{
  position: relative;
}
.companys-title{
  color: #333;
  background: #fcfcfc;
  border-bottom: 1px solid #eee;
}
.companys-title h4 {
  margin-top: 0px;
  margin-bottom: 0px;
  line-height: 32px;
  font-weight: normal;
  display: inline-block;
  line-height: 50px;
  margin-left: 15px;
  font-size: 15px;
}
.text-danger {
    color: #FD485E;
}
.companys-list{
  position: relative;
  padding: 20px;
  border-bottom: 1px solid #eee;
}
.companys-list-title{
  padding-bottom: 5px;
}
.companys-list-title span.title{
  font-size: 18px;
  color: #222;
  font-weight: bold;
  cursor: pointer;
}
.companys-list-title span.title:hover{
  color: #128bed;
}
.page{
  padding: 20px;
}
.companys-list-box{
  margin-top: 6px;
  color: #999;
  font-size: 14px;
}
.companys-list-box span{
  color: #000;
}
.companys-list-box span.fr{
  color: #128bed;
  margin-right: 30px;
}
.sticky-right-new{
  position: absolute;
  right: 20px;
  top: 0;
}
.not-yet{
  text-align: center;
  padding: 20px;
}
.companys-button{
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>

