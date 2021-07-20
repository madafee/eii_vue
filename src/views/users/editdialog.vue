<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogExpertVisible" :destroy-on-close="true" :close-on-click-modal="false" top="20px" width="500px" @close="$reset('form')" append-to-body>
      <div id="personnel" style="padding: 20px 20px 10px;">
        <el-form ref="form" :model="sizeForm" :inline="true" label-width="120px" size="small">
          <el-form-item label="登陆名：" class="redItem">
            <el-input v-model="sizeForm.login" autocomplete="off" class="width150" placeholder="请输入登陆名" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="密码：" class="redItem">
            <el-input v-model="sizeForm.password" autocomplete="off" class="width150" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" class="redItem">
            <el-input v-model="sizeForm.name" autocomplete="off" class="width150" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别：" class="redItem">
            <el-radio-group v-model="sizeForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="角色：" class="redItem">
            <el-select v-model="sizeForm.role" placeholder="请选择角色" class="width150">
              <el-option v-for="(item,index) in roleBox" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门：" class="redItem">
            <el-input v-model="sizeForm.department" autocomplete="off" class="width150" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="职务：" class="redItem">
            <el-input v-model="sizeForm.position" autocomplete="off" class="width150" placeholder="请输入职务"></el-input>
          </el-form-item>
          <el-form-item label="电话：" class="redItem">
            <el-input v-model="sizeForm.mobile" autocomplete="off" class="width150" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="启用 / 停用：" v-if="isDisabled">
            <el-switch v-if="sizeForm.is_valid === true"
              v-model="sizeForm.is_valid"
              active-text="启用"
              inactive-text="">
            </el-switch>
            <el-switch v-else-if="sizeForm.is_valid === false"
              v-model="sizeForm.is_valid"
              active-text="停用"
              inactive-text="">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogExpertVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="batchClick" size="small" v-preventReClick>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { getUser, editUser, addUser } from '@/api/user'
import { getDictsDictsKey } from '@/utils/auth'
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
      dialogExpertVisible: false,
      sizeForm: {
        login: '',
        password:'',
        name: '',
        role: '',
        is_valid: true,
        department: '',
        position: '',
        mobile: '',
        gender: 1
      },
      roleBox: [],
      title: '增加用户',
      id: '',
      isDisabled: false
    }
  },
  created() {
    console.log( JSON.parse(getDictsDictsKey()))
  },
  watch: {
    dialogVisible() {
      var _this = this
      _this.dialogExpertVisible = true
      _this.dictsAllBox()
      if (this.dialogVisible[0].id) {
        _this.title = '修改用户'
        _this.isDisabled = true
        _this.id = this.dialogVisible[0].id
        _this.getStaffsBox(this.dialogVisible[0].id)
      } else {
        _this.title = '增加用户'
        _this.isDisabled = false
        _this.id = ''
        _this.sizeForm = {
          login: '',
          password:'',
          name: '',
          role: '',
          is_valid: true,
          department: '',
          position: '',
          mobile: '',
          gender: 1
        }
      }
    }
  },
  methods: {
    batchClick() {
      var _this = this
      var id = _this.dialogVisible[0].id
      this.$refs['form'].validate((valid) => {
        if (valid) {
          var role_id = null
          _this.roleBox.forEach(function(value, index, array) {
            if (value.value === _this.sizeForm.role) {
              role_id = value.id
            }
          })
          if (id !== '') {
            var sizeForm = {
              password: _this.sizeForm.password,
              name: _this.sizeForm.name,
              role_id: role_id,
              is_valid: _this.sizeForm.is_valid === true ? 1 : 0,
              position: _this.sizeForm.position,
              department: _this.sizeForm.department,
              mobile: _this.sizeForm.mobile,
              gender: _this.sizeForm.gender
            }
            editUser(sizeForm, id).then(response => {
              if (response.code === 'OK') {
                _this.$message({
                  message: '修改成功！',
                  type: 'success'
                })
                _this.dialogExpertVisible = false
                _this.$emit('editsuccess', true)
              }
            })
          } else {
            var sizeForm = {
              login: _this.sizeForm.login,
              password: _this.sizeForm.password,
              password: _this.sizeForm.password,
              name: _this.sizeForm.name,
              role_id: role_id,
              is_valid: _this.sizeForm.is_valid === true ? 1 : 0,
              position: _this.sizeForm.position,
              department: _this.sizeForm.department,
              mobile: _this.sizeForm.mobile,
              gender: _this.sizeForm.gender
            }
            addUser(sizeForm).then(response => {
              if (response.code === 'OK') {
                _this.$message({
                  message: '添加成功！',
                  type: 'success'
                })
                _this.dialogExpertVisible = false
                _this.$emit('editsuccess', true)
              }
            })
          }
          
        } else {
          return false
        }
      })
    },
    dictsAllBox() {
      var _this = this
      var dictsAll = JSON.parse(getDictsDictsKey())
      var roleBox = []
      dictsAll.forEach(function(value, index, array) {
        if (value.name === 'role') {
          value.dict.forEach(function(v, i, a) {
            if (v.id !== 1) {
              roleBox.push(v)
            }
          })
        }
      })
      _this.roleBox = roleBox
    },
    getStaffsBox(id) {
      var _this = this
      getUser(id).then(response => {
        if (response.code === 'OK') {
          var sizeForm = {
            login: response.data[0].login,
            password: '',
            name: response.data[0].name,
            role: response.data[0].role,
            is_valid: (response.data[0].is_valid === 1) ? true : false,
            department: response.data[0].department,
            position: response.data[0].position,
            mobile: response.data[0].mobile,
            gender: Number(response.data[0].gender)
          }
          _this.sizeForm = sizeForm
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
</style>

