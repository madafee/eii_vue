<template>
  <div>
    <el-dialog title="查询公司列表" :visible.sync="qccdialogvisible" :destroy-on-close="true" :close-on-click-modal="false" top="20px" width="800px" append-to-body>
      <div style="text-align: center; padding:20px 0">
        <el-input style="width:350px;margin-right:10px;" v-model="qccpage.keyword" placeholder="检索关键字" clearable></el-input>
        <el-button class="common-button" type="primary" @click="getQccListBox()" v-preventReClick>查 询</el-button>
      </div>
      <div class="qcc-list" v-if="qccdataList.length > 0">
        <div class="companys-title"><h4>为您找到 <span class="text-danger">{{qcctotalCount}}</span> 条相关结果</h4></div>
        <div class="companys-box" style="overflow-x: hidden; word-break:break-all;height:500px;">
          <div class="companys-list" v-for="(item,index) in qccdataList" :key="index">
            <div class="companys-list-title"><span class="title">{{item.name}}</span> <el-tag size="mini" effect="dark" type="">{{item.status}}</el-tag></div>
            <div class="companys-list-box">法定代表人：<span style="color: #128bed;margin-right: 30px;">{{item.opername}}</span>  成立日期： <span>{{item.startdate}}</span></div>
            <div class="companys-list-box">注册号：<span>{{item.no}}</span></span></div>
            <div class="companys-list-box">统一社会信用代码：<span>{{item.creditcode}}</span></div>
            <div class="companys-button">
              <el-button type="primary" size="small" plain @click="addCompanySqcc(item.keyno)" v-preventReClick>添加</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div class="page" v-if="qccdataList.length > 0" style="padding: 20px;">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="qccpage.page_size"
          :current-page.sync="qcccurrentPage"
          @current-change="qccChange"
          :total="qcctotalCount">
        </el-pagination>
      </div>
      <div class="not-yet" v-else>暂无数据！</div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { getQccList, addCompanys } from '@/api/companys'
export default {
  components: { },
  props: {
    dialogVisible: {
      type: Array
    }
  },
  data() {
    return {
      qccdataList: [],
      qccdialogvisible: false,
      qccpage: {
        keyword: '',
        page_size: 10,
        page_no: 1,
      },
      qcctotalCount: 0,
      qcccurrentPage: 1,
    }
  },
  created() {
  },
  watch: {
    dialogVisible() {
      var _this = this
      _this.qccdialogvisible = true
      _this.qccdataList = [],
      _this.qccpage = {
        keyword: '',
        page_size: 10,
        page_no: 1,
      }
      _this.qcctotalCount = 0
    }
  },
  methods: {
    getQccListBox(){
      var _this = this
      getQccList(_this.qccpage).then(response => {
        if (response.code === 'OK') {
          _this.qccdataList = response.data
          _this.qcctotalCount = response.count
        }
      })
    },
    // 分页
    qccChange(val) {
      this.qccpage.page_no = val
      this.qccdataList = []
      this.getQccListBox()
    },
    addCompanySqcc(keyno) {
      var _this = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var data = {
        keyword: keyno,
        is_track: 1
      }
      addCompanys(data).then(response => {
        loading.close();
        if (response.code === 'OK') {
          _this.qccdialogvisible = false
          _this.qccdataList = [],
          _this.qccpage = {
            keyword: '',
            page_size: 10,
            page_no: 1,
          }
          _this.qcctotalCount = 0
          _this.$emit('editsuccess', true)
        }
      })
    }
  }
}
</script>
<style>
.qcc-list{
  margin:0 20px;
  border: 1px solid #eee;
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

