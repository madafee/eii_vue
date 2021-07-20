<template>
  <div>
    <el-dialog title="用户信息" :visible.sync="dialogGenerateVisible" :destroy-on-close="true" :close-on-click-modal="false" top="20px" width="400px" @close="$reset('form')" append-to-body>
      <div id="personnel" style="padding: 20px 20px 10px;" class="clearfix">
        <el-form ref="form" :model="sizeForm" label-width="100px" size="small">
          <el-form-item label="登陆名：" class="redItem">{{sizeForm.login}}</el-form-item>
          <el-form-item label="姓名：" class="redItem">{{sizeForm.name}}</el-form-item>
          <el-form-item label="性别：" class="redItem">{{sizeForm.gender === 1 ? '男' : '女'}}</el-form-item>
          <el-form-item label="角色：" class="redItem">{{sizeForm.role}}</el-form-item>
          <el-form-item label="部门：" class="redItem">{{sizeForm.department}}</el-form-item>
          <el-form-item label="职务：" class="redItem">{{sizeForm.position}}</el-form-item>
          <el-form-item label="电话：" class="redItem">{{sizeForm.mobile}}</el-form-item>
          <el-form-item label="有效性：" class="redItem">
            <el-tag size="mini" type="success" v-if="sizeForm.is_valid === 1">有效</el-tag>
            <el-tag size="mini" type="danger" v-else-if="sizeForm.is_valid === 0">无效</el-tag>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { getUser } from '@/api/user'
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
      sizeForm: {
        login: '',
        name: '',
        role: '',
        is_valid: '',
        address: '',
        mobile: ''
      },
      roleBox: [],
      fit: 'cover'
    }
  },
  created() {
  },
  watch: {
    dialogVisible() {
      var _this = this
      _this.dialogGenerateVisible = true
      _this.getClientBox(this.dialogVisible[0].id)
    }
  },
  methods: {
    getClientBox(id) {
      var _this = this
      getUser(id).then(response => {
        if (response.code === 'OK') {
          _this.sizeForm = response.data[0]
        }
      })
    },
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
</style>

