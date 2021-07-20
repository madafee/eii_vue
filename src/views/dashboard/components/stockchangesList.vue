<template>
  <div>
    <el-dialog title="最新股权变更企业" :visible.sync="qccdialogvisible" :destroy-on-close="true" :close-on-click-modal="false" top="20px" width="60%" append-to-body>
      <div class="stockchanges-list">
        <el-table :data="qccdataList" element-loading-text="Loading" fit stripe border class="table-fixed">
          <el-table-column label="变更企业" align="left" width="200">
            <template slot-scope="scope">
              <span class="cur" @click="godetailed(scope.row.company_id)">{{scope.row.company_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="变更内容" align="left">
            <template slot-scope="scope">
              <span>{{scope.row.info}}</span>
            </template>
          </el-table-column>
          <el-table-column label="变更日期" align="center" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.create_datetime}}</span>
            </template>
          </el-table-column>
        </el-table>
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
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { getStockchangesList } from '@/api/companys'
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
        page_size: 10,
        page_no: 1,
      }
      _this.getStockchanges()
    }
  },
  methods: {
    getStockchanges(){
      var _this = this
      getStockchangesList(_this.qccpage).then(response => {
        if (response.code === 'OK') {
          var data = response.data
            data.forEach(function(value, index, array) {
              var htmlBox = ''
              value.change_info.forEach(function(v, i, a) {
                if ((i+1) === value.change_info.length) {
                  htmlBox += v
                } else {
                  htmlBox += v + '，'
                }
              })
              value.info = htmlBox
              value.create_datetime = value.create_datetime.slice(0,10)
            })
          _this.qccdataList = data
          _this.qcctotalCount = response.count
        }
      })
    },
    // 分页
    qccChange(val) {
      this.qccpage.page_no = val
      this.qccdataList = []
      this.getStockchanges()
    },
    godetailed(id) {
      this.$router.push({ path: '/companys/detailed?id=' + id })
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
.stockchanges-list{
  padding: 10px 10px 0 10px;
}

.cur{
  cursor: pointer;
}
.cur:hover{
  cursor: pointer;
  color: #128bed;
}
</style>

