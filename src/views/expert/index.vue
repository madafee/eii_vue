<template>
  <div ref="page">
    <sticky :z-index="10" :class-name="'sub-navbar draft'">
      <div class="sticky-left">
        <el-input style="width:150px;margin-right:10px;" size="small" v-model="page.keyword" placeholder="检索关键字" clearable></el-input>
        <el-button class="common-button" size="small" type="primary" @click="search()" v-preventReClick>查 询</el-button>
      </div>
      <!-- <div class="sticky-right"></div> -->
    </sticky>
    <div class="app-container">
      <el-table :data="dataList" v-loading.body="listLoading" element-loading-text="Loading" fit stripe border class="table-fixed">
        <el-table-column label="登陆名" align="center" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.login}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.avatar}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="姓名" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.role}}</span>
          </template>
        </el-table-column>
        <el-table-column label="职位" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.position}}</span>
          </template>
        </el-table-column>
        <el-table-column label="级别" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.rank}}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业领域" align="center">
          <template slot-scope="scope">
            <span class="content-html" v-html="scope.row.profession"></span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="简介" align="center">
          <template slot-scope="scope">
            <span v-html="scope.row.comment"></span>
          </template>
        </el-table-column> -->
        <el-table-column label="有效/无效" align="center" width="100">
          <template slot-scope="scope">
            <el-tag size="mini" type="success" v-if="scope.row.is_valid === 1">有效</el-tag>
            <el-tag size="mini" type="danger" v-else-if="scope.row.is_valid === 0">无效</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-tag effect="dark" size="mini" type="warning" @click="goExpertEdit(scope.row.id)" class="cur">修改</el-tag>
            <el-tag effect="dark" size="mini" @click="goDetailed(scope.row.id)" class="cur">详情</el-tag>
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
    <editdialog :dialog-visible='editdialogData' @editsuccess="editsuccess"></editdialog>
    <detaileddialog :dialog-visible='detaileddialogData'></detaileddialog>
  </div>
</template>

<script>
/* eslint-disable */
import { getExpertList } from '@/api/expert'
import Sticky from '@/components/Sticky' // 粘性header组件
import editdialog from './editdialog'
import detaileddialog from './detaileddialog'
export default {
  components: { Sticky, editdialog, detaileddialog },
  data() {
    return {
      page: {
        keyword: '',
        page_size: 20,
        page_no: 1,
      },
      listLoading: false,
      dataList: [],
      totalCount: 0,
      currentPage: 1,
      detailed: {},
      id: null,
      editdialogData: [],
      editdialogvisible: true,
      detaileddialogData: [],
      detaileddialogvisible: true
    }
  },
  created() {
    this.expertListBox()
  },
  watch: {
  },
  methods: {
    expertListBox() {
      var _this = this
      getExpertList(_this.page).then(response => {
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
      this.datalist = []
      this.expertListBox()
    },
    goExpertEdit(id) {
      var editdialogData = {
        editdialogvisible: !this.editdialogvisible,
        id: id
      }
      this.editdialogData = Array(editdialogData)
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
        this.expertListBox()
      }
    },
    search() {
      this.expertListBox()
    }
  }
}
</script>
<style>
.page{
  padding: 10px 0 0 0;
}
</style>

