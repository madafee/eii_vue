<template>
  <div ref="page" style="position: relative;">
    <sticky :z-index="10" :class-name="'sub-navbar draft'">
      <div class="sticky-left">
        <el-select placeholder="地区" v-model="value" size="small" clearable style="width:150px;">
          <el-option v-for="(item,index) in regionBox" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <span class="sticky-left-span">备案开始日期:</span>
        <el-date-picker style="width:140px;" size="small" v-model="page.start_date" type="date" value-format="yyyy-MM-dd" placeholder="开始时间"></el-date-picker>
        <span class="sticky-left-span">备案结束日期:</span>
        <el-date-picker style="width:140px;" size="small" v-model="page.end_date" type="date" value-format="yyyy-MM-dd" placeholder="结束时间"></el-date-picker>
        <el-input style="width:200px;margin-right:10px;margin-left:30px;" size="small" v-model="page.keyword" placeholder="检索关键字" clearable></el-input>
        <el-button class="common-button" type="primary" size="small" @click="getAnnouncementsBox()" v-preventReClick>查 询</el-button>
      </div>
    </sticky>
    <!-- <div class="searchbox">
      <div class="searchbox-list">
        <el-select placeholder="地区" v-model="value" size="small" clearable style="width:140px;">
          <el-option v-for="(item,index) in regionBox" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="searchbox-list">
        <el-date-picker style="width:140px;" size="small" v-model="page.start_date" type="date" value-format="yyyy-MM-dd" placeholder="开始时间"></el-date-picker>
      </div>
      <div class="searchbox-list">
        <el-date-picker style="width:140px;" size="small" v-model="page.end_date" type="date" value-format="yyyy-MM-dd" placeholder="结束时间"></el-date-picker>
      </div>
    </div> -->
    <div class="app-container">
      <div class="user-list" style="margin-top: 0;">
      <el-table :data="dataList" v-loading.body="listLoading" element-loading-text="Loading" fit stripe border class="table-fixed">
        <el-table-column label="名称" align="center" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="报告日期" align="center" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.report_date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备案日期" align="center" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.filed_date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="位置" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.location}}</span>
          </template>
        </el-table-column>
        <el-table-column label="来源" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.source}}</span>
          </template>
        </el-table-column>
        <el-table-column label="公告下载" align="center" width="150">
          <template slot-scope="scope">
            <a :href="scope.row.file" target="_blank"><svg-icon icon-class="excel" class="typefont" v-if="scope.row.type === 'xls' || scope.row.type === 'xlsx'" />
            <svg-icon icon-class="html" class="typefont" v-else-if="scope.row.type === 'html' || scope.row.type === 'htm'" />
            <svg-icon icon-class="pdf" class="typefont" v-else-if="scope.row.type === 'pdf'" />
            <svg-icon icon-class="ppt" class="typefont" v-else-if="scope.row.type === 'ppt' || scope.row.type === 'pptx'" />
            <svg-icon icon-class="rtf" class="typefont" v-else-if="scope.row.type === 'rtf'" />
            <svg-icon icon-class="txt" class="typefont" v-else-if="scope.row.type === 'txt'" />
            <svg-icon icon-class="word" class="typefont" v-else-if="scope.row.type === 'doc' || scope.row.type === 'docx'" />
            <svg-icon icon-class="xml" class="typefont" v-else-if="scope.row.type === 'xml'" />
            <svg-icon icon-class="page" class="typefont" v-else/></a>
          </template>
        </el-table-column>
      </el-table>
    <!-- 分页 -->
    <div class="page">
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
  </div>
</template>

<script>
/* eslint-disable */
import Sticky from '@/components/Sticky' // 粘性header组件
import { getAnnouncements } from '@/api/orders'

export default {
  components: { Sticky },
  data() {
    return {
      page: {
        page_size: 20,
        page_no: 1,
        start_date: '',
        end_date: '',
        keyword: ''
      },
      listLoading: false,
      dataList: [],
      totalCount: 0,
      currentPage: 1,
      value: '美国',
      regionBox:[
        {
          value: '美国',
          label: '美国'
        }
      ]
    }
  },
  created() {
    this.page.start_date = this.getNowFormatDateOld()
    this.page.end_date = this.getNowFormatDate()
  },
  watch: {
  },
  methods: {
    getAnnouncementsBox() {
      var _this = this
      if (_this.page.keyword !== '') {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var page = {
          page_size: _this.page.page_size,
          page_no: _this.page.page_no,
          keyword: _this.page.keyword,
          start_date: _this.page.start_date,
          end_date: _this.page.end_date
        }
        getAnnouncements(page).then(response => {
            loading.close();
          if (response.code === 'OK') {
            response.data.forEach(function(value, index, array) {
              var filename = value.file
              var index = filename.lastIndexOf(".")
              var suffix = filename.substr(index+1)
              value.type = suffix
            })
            _this.dataList = response.data
            _this.totalCount = response.count
          }
        })
      } else {
        this.$message({
          message: '请输入关键字：例如”dalian“或企业英文名',
          type: 'warning'
        });
      }

    },
    // 分页
    handleCurrentChange(val) {
      this.page.page_no = val
      this.datalist = []
      this.getAnnouncementsBox()
    },
    // 时间转化
    getNowFormatDate() {
      var date = new Date()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = date.getFullYear() + '-' + month + '-' + strDate
      return currentdate
    },
    // 时间转化
    getNowFormatDateOld() {
      var date = new Date()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = (date.getFullYear()-1) + '-' + month + '-' + strDate
      return currentdate
    }
  }
}
</script>
<style>
.width120{
  width: 150px;
}
.page{
  padding: 10px 0 0 0;
}
.searchbox{
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px;
  z-index: 99999;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.searchbox-list{
  margin-bottom: 10px;
}
.typefont{
  font-size: 22px;
}
.sticky-left-span{
  font-size: 12px;
  margin-left: 10px;
}
</style>

