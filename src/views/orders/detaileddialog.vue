<template>
  <div>
    <el-dialog title="查询详情" :visible.sync="dialogGenerateVisible" :destroy-on-close="true" :close-on-click-modal="false" top="20px" width="800px" append-to-body>
      <div id="personnel" style="padding: 20px 20px 10px;" class="clearfix">
        <div class="orders-title clearfix">
          <div class="orders-title-list">工单编号：{{sizeForm.id}}</div>
          <div class="orders-title-list">进度状态：{{sizeForm.status}}</div>
          <div class="orders-title-list">提交时间：{{sizeForm.create_datetime}}</div>
          <div class="orders-title-list" style="text-align: right;">
            <!-- <el-tag effect="dark" size="mini" type="warning" @click="goOrdersEdit()" class="cur" v-if="sizeForm.status_id === 1">更新状态</el-tag>
            <el-tag effect="dark" size="mini" type="success" v-else>已更新</el-tag> -->
            <el-tag effect="dark" size="mini" type="warning" @click="goOrdersEdit()" class="cur">已解决</el-tag>
          </div>
        </div>
        <div class="orders-title clearfix">
          <div class="orders-title-b">沟通记录</div>
          <div class="orders-list" style="max-height:350px;overflow: auto;">
            <div class="orders-list-li clearfix" v-for="(item,index) in sizeForm.records" :key="index">
              <el-avatar shape="square" size="small" icon="el-icon-user-solid" style="float:left; color:#000;" v-if="item.type_id === 1"></el-avatar>
              <el-avatar shape="square" size="small" icon="el-icon-user" style="float:left; color:#000;" v-else></el-avatar>
              <div class="orders-records">
                <div class="orders-records-title clearfix">
                  <div class="orders-records-title-l">{{item.user}}</div>
                  <div class="orders-records-title-r">{{item.create_datetime}}</div>
                </div>
                <div class="orders-records-cen">{{item.content}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="orders-title clearfix" v-if="sizeForm.status_id !== 4">
          <el-input v-model="content" type="textarea" :rows="4" autocomplete="off" style="width:100%" placeholder="请输入内容"></el-input>
          <div class="addrecords">
            <el-button type="primary" @click="addrecordsBox" size="small" v-preventReClick>提 交</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { getOrdersr, editOrders, addOrdersRecords } from '@/api/orders'
export default {
  components: { },
  props: {
    dialogVisible: {
      type: Array
    }
  },
  data() {
    return {
      dataList: [],
      dialogGenerateVisible: false,
      sizeForm: {},
      roleBox: [],
      fit: 'cover',
      id: '',
      content: '',
      bg1: require('@/assets/temporary_images/t.png')
    }
  },
  created() {
  },
  watch: {
    dialogVisible() {
      var _this = this
      _this.dialogGenerateVisible = true
      _this.id = this.dialogVisible[0].id
      _this.getClientBox(this.dialogVisible[0].id)
    }
  },
  methods: {
    getClientBox(id) {
      var _this = this
      getOrdersr(id).then(response => {
        if (response.code === 'OK') {
          _this.sizeForm = response.data[0]
        }
      })
    },
    goOrdersEdit() {
      var _this = this
      var data = {
        status_id: 4
      }
      editOrders(_this.id, data).then(response => {
        if (response.code === 'OK') {
          _this.$message({
            message: '更新成功！',
            type: 'success'
          })
          _this.dialogGenerateVisible = true
          _this.$emit('editsuccess', true)
        }
      })
    },
    addrecordsBox(){
      var _this = this
      var id = _this.id
      var data = {
        content: _this.content
      }
      addOrdersRecords(id, data).then(response => {
        if (response.code === 'OK') {
          _this.$message({
            message: '新增成功！',
            type: 'success'
          })
          _this.content = ''
          _this.getClientBox(id)
        }
      })
    }
  }
}
</script>
<style>
.width150{
  width: 250px;
}
.hr {
  border-top:1px solid #ccc;padding-bottom:5px;margin-top:2px;
}
/* .redItem .el-form-item__label{
  color: #F56C6C;
} */
#personnel .el-form-item--small.el-form-item{
    margin-bottom: 2px;
}
.avatarBox{
  float: left;
  text-align: center;
  width: 100px;
}
.avatarimage{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.orders-title{
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding:20px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-bottom: 20px;
}
.orders-title-list{
  float: left;
  width: 25%;
}
.orders-title-b{
  font-weight: bold;
}
.orders-records{
  float: right;
  background: #f6f6fb;
  border-radius: 5px;
  width: 680px;
  padding:15px 20px;
  color: #526075;
}
.orders-records-title-l{
  float: left;
}
.orders-records-title-r{
  float: right;
}
.orders-records-cen{
  padding-top: 15px;
}
.orders-list-li{
  padding-top: 20px;
}
.addrecords{
  text-align: right;
  padding-top: 10px;
}
</style>

