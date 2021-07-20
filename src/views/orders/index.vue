<template>
  <div ref="page">
    <sticky :z-index="10" :class-name="'sub-navbar draft'">
      <div class="sticky-left">
        <el-select v-model="page.status_id" placeholder="查询状态" size="small" clearable @change="statusChange" class="width120">
          <el-option v-for="(item,index) in statusBox" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="sticky-right">
        <el-button class="common-button" size="small" type="primary" @click="addOrders()" v-preventReClick>新增自助查询</el-button>
      </div>
    </sticky>
    <div class="app-container">
      <div class="user-list">
      <el-table :data="dataList" v-loading.body="listLoading" element-loading-text="Loading" fit stripe border class="table-fixed">
        <el-table-column label="工单编号" align="center" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="查询内容" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.initiator}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.create_datetime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.update_datetime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="100">
          <template slot-scope="scope">
            <!-- <el-tag effect="dark" size="mini" type="warning" @click="goOrdersEdit(scope.row.id)" class="cur">更新状态</el-tag> -->
            <el-tag effect="dark" size="mini" type="warning" @click="goDetailed(scope.row.id)" class="cur">详细</el-tag>
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

    <el-dialog title="新增自助查询" :visible.sync="addOrdersVisible" :destroy-on-close="true" :close-on-click-modal="false" top="20px" width="450px" @close="$reset('form')" append-to-body>
      <div style="padding: 20px 20px 10px;" class="clearfix">
        <el-form ref="form" :model="sizeForm" :inline="true" label-width="110px" size="small">
          <el-form-item label="查询企业地区：" class="redItem">
						<el-select v-model="sizeForm.area_id" placeholder="请选择地区" style="width:250px">
								<el-option v-for="(item,index) in areaBox" :key="index" :label="item.value" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
          <el-form-item label="具体查询内容：" class="redItem">
            <el-input v-model="sizeForm.content" type="textarea" :rows="4" autocomplete="off" style="width:250px" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrdersVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addOrdersBox" size="small" v-preventReClick>确 定</el-button>
      </div>
    </el-dialog>
    <detaileddialog :dialog-visible='detaileddialogData' @editsuccess="editsuccess"></detaileddialog>
  </div>
</template>

<script>
/* eslint-disable */
import Sticky from '@/components/Sticky' // 粘性header组件
import { getOrdersList, postOrders, editOrders } from '@/api/orders'
import { getDictsDictsKey } from '@/utils/auth'
import detaileddialog from './detaileddialog'

export default {
  components: { Sticky, detaileddialog },
  data() {
    return {
      page: {
        page_size: 20,
        page_no: 1,
        status_id: ''
      },
      listLoading: false,
      dataList: [],
      totalCount: 0,
      currentPage: 1,
      editdialogData: [],
      editdialogvisible: true,
      areaBox: [],
      addOrdersVisible: false,
      sizeForm: {
        area_id: '',
        content: ''
      },
      detaileddialogData: [],
      detaileddialogvisible: true
    }
  },
  created() {
    this.dictsAllBox()
    this.getOrdersBox()
  },
  watch: {
  },
  methods: {
    getOrdersBox() {
      var _this = this
      var page = {
        page_size: _this.page.page_size,
        page_no: _this.page.page_no,
        status_id: _this.page.status_id
      }
      getOrdersList(page).then(response => {
        if (response.code === 'OK') {
          _this.dataList = response.data
          _this.totalCount = response.count
        }
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.page.page_no = val
      this.datalist = []
      this.getOrdersBox()
    },
    dictsAllBox() {
      var _this = this
      var dictsAll = JSON.parse(getDictsDictsKey())
      var areaBox = []
      var statusBox = []
      dictsAll.forEach(function(value, index, array) {
        if (value.name === 'area') {
          value.dict.forEach(function(v, i, a) {
            areaBox.push(v)
          })
        }
        if (value.name === 'orderstatus') {
          value.dict.forEach(function(v, i, a) {
            statusBox.push(v)
          })
        }
      })
      _this.statusBox = statusBox
      console.log(statusBox)
      _this.areaBox = areaBox
    },
    addOrders() {
      this.addOrdersVisible = true
    },
    addOrdersBox(){
      var _this = this
      var data = _this.sizeForm
      postOrders(data).then(response => {
        if (response.code === 'OK') {
          _this.$message({
            message: '添加成功！',
            type: 'success'
          })
          _this.getOrdersBox()
          _this.addOrdersVisible = false
          _this.sizeForm = {
            area_id: '',
            content: ''
          }
        }
      })
    },
    goOrdersEdit(id) {
      var _this = this
      var data = {
        status_id: 4
      }
      editOrders(id, data).then(response => {
        if (response.code === 'OK') {
          _this.$message({
            message: '更新成功！',
            type: 'success'
          })
          _this.getOrdersBox()
        }
      })
    },
    goDetailed(id) {
      var detaileddialogData = {
        detaileddialogvisible: !this.detaileddialogvisible,
        id: id
      }
      this.detaileddialogData = Array(detaileddialogData)
    },
    editsuccess(data) {
      if (data === true) {
        this.getOrdersBox()
      }
    },
    statusChange(){
      var _this = this
      _this.getOrdersBox()
    }
  }
}
</script>
<style>
.width120{
  width: 150px;
}
</style>

