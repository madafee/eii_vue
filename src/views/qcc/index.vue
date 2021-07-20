<template>
  <div ref="page">
    <sticky :z-index="10" :class-name="'sub-navbar draft'">
      <div style="text-align: center;">
        <el-input style="width:350px;margin-right:10px;" v-model="page.keyword" placeholder="检索关键字" clearable></el-input>
        <el-button class="common-button" type="primary" @click="getCompanysQccListBox()" v-preventReClick>查 询</el-button>
      </div>
    </sticky>
    <div class="app-container" v-if="dataList.length > 0" v-loading="loading">
      <div class="user-list" style="padding:0; margin-top: 0;">
        <div class="companys-title"><h4>为您找到 <span class="text-danger">{{totalCount}}</span> 条相关结果</h4></div>
        <div class="companys-box">
          <div class="companys-list" v-for="(item,index) in dataList" :key="index">
            <div class="companys-list-title"><span class="title" @click="companysDetailed(item.keyno)">{{item.name}}</span> <el-tag size="mini" effect="dark" type="">{{item.status}}</el-tag></div>
            <div class="companys-list-box">法定代表人：<span style="color: #128bed;margin-right: 30px;">{{item.opername}}</span>  成立日期： <span>{{item.startdate}}</span></div>
            <div class="companys-list-box">注册号：<span>{{item.no}}</span></span></div>
            <div class="companys-list-box">统一社会信用代码：<span>{{item.creditcode}}</span></div>
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
    <div class="not-yet" v-else>请输入查询数据！</div>
  </div>
</template>

<script>
/* eslint-disable */
import { getCompanysQccList } from '@/api/companys'
import Sticky from '@/components/Sticky' // 粘性header组件
export default {
  components: { Sticky },
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
      loading: false
    }
  },
  created() {
  },
  watch: {
  },
  methods: {
    getCompanysQccListBox() {
      var _this = this
      _this.loading = true
      getCompanysQccList(_this.page).then(response => {
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
      this.getCompanysQccListBox()
    },
    companysDetailed(id) {
      this.$router.push({ path: '/qcc/detailed?id=' + id })
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

