<template>
  <div>
    <el-dialog title="修改专家" :visible.sync="dialogExpertVisible" :destroy-on-close="true" :close-on-click-modal="false" top="20px" width="600px" @close="$reset('form')" append-to-body>
      <div id="personnel" style="padding: 20px 20px 10px;">
        <el-form ref="form" :model="sizeForm" :inline="true" label-width="120px" size="small">
          <el-form-item label="登陆名：" class="redItem">
            <el-input v-model="sizeForm.login" autocomplete="off" class="width150" placeholder="请输入登陆名" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密码：" class="redItem">
            <el-input v-model="sizeForm.password" autocomplete="off" class="width150" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" class="redItem">
            <el-input v-model="sizeForm.name" autocomplete="off" class="width150" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="角色：" class="redItem">
            <el-select v-model="sizeForm.role" placeholder="请选择角色" class="width150">
              <el-option v-for="(item,index) in roleBox" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位：" class="redItem">
            <el-input v-model="sizeForm.position" autocomplete="off" class="width150" placeholder="请输入职位"></el-input>
          </el-form-item>
          <el-form-item label="级别：" class="redItem">
            <el-input v-model="sizeForm.rank" autocomplete="off" class="width150" placeholder="请输入级别"></el-input>
          </el-form-item>
          <el-form-item label="专业领域：" class="redItem">
            <Tinymce ref="editor" v-model="sizeForm.profession" :height="150" v-if="dialogExpertVisible" />
          </el-form-item>
          <el-form-item label="简介：" class="redItem">
            <Tinymce ref="editor" v-model="sizeForm.comment" :height="150" v-if="dialogExpertVisible" />
          </el-form-item>
          <el-form-item label="启用 / 停用：">
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
import Tinymce from '@/components/Tinymce'
import { getExpert, putExpert } from '@/api/expert'
import { getDictsDictsKey } from '@/utils/auth'
export default {
  components: { Tinymce },
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
        login:'',
        password: '',
        name: '',
        role: '',
        is_valid: true,
        position: '',
        rank: '',
        profession: '',
        comment: '',
        avatar: ''
      },
      roleBox: []
    }
  },
  created() {
    console.log( JSON.parse(getDictsDictsKey()))
  },
  watch: {
    dialogVisible() {
      var _this = this
      _this.dialogExpertVisible = true
      _this.getStaffsBox(this.dialogVisible[0].id)
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
          console.log( _this.sizeForm.is_valid)
          var sizeForm = {
            password: _this.sizeForm.password,
            name: _this.sizeForm.name,
            role_id: role_id,
            is_valid: _this.sizeForm.is_valid === true ? 1 : 0,
            position: _this.sizeForm.position,
            rank: _this.sizeForm.rank,
            profession: _this.sizeForm.profession,
            comment: _this.sizeForm.comment,
            avatar: _this.sizeForm.avatar
          }
          putExpert(sizeForm, id).then(response => {
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
          return false
        }
      })
    },
    getStaffsBox(id) {
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
      getExpert(id).then(response => {
        if (response.code === 'OK') {
          var sizeForm = {
            login: response.data[0].login,
            password: '',
            name: response.data[0].name,
            role: response.data[0].role,
            is_valid: (response.data[0].is_valid === 1) ? true : false,
            position: response.data[0].position,
            rank: response.data[0].rank,
            profession: response.data[0].profession,
            comment: response.data[0].comment,
            avatar: response.data[0].avatar
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

