<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <div class="main-top">
        <navbar></navbar>
        <div class="main-top-menu">
          <el-dropdown style="float:right; margin-left:20px;" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-user-solid" style="font-size:18px;"></i>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="edit" icon="el-icon-setting">修改密码</el-dropdown-item> -->
              <el-dropdown-item command="logout" icon="el-icon-switch-button">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- <tags-view></tags-view> -->
      <app-main></app-main>
      <el-dialog title="修改密码" :visible.sync="editVisible" top="20px" width="250px" @close="$reset('form')">
        <div class="padding20">
          <el-form ref="form" :model="sizeForm" :rules="rules">
            <el-form-item prop="password">
              <el-input style="width:200px;" v-model="sizeForm.password" placeholder="请输入新密码"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="batchClick('form')" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from '@/views/layout/components'
import Carousel from '@/components/Carousel/Carousel'
import { getDepartmentsKey, getUserdata } from '@/utils/auth' // 验权
import { editPassword } from '@/api/user'
export default {
  data: function() {
    return {
      departmentsList: getUserdata()[0].departments,
      value: Number(getDepartmentsKey()),
      sizeForm: {
        password: ''
      },
      editVisible: false,
      rules: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Carousel,
    TagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  mounted: function() {
  },
  methods: {
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    userdepartments() {
      window.sessionStorage.setItem('Admin-Data-departments', this.value)
      // var url = this.$route.path
      // this.$router.push({ path: url })
      this.$router.go(0)
    },
    handleCommand(command) {
      if (command === 'edit') {
        this.editVisible = true
      } else if (command === 'logout') {
        this.logout()
      }
    },
    batchClick(formName) {
      var _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editPassword(_this.sizeForm).then(response => {
            if (response.code === 'OK') {
              this.editVisible = false
              _this.$message({
                message: '修改密码成功！',
                type: 'success'
              })
              _this.logout()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.main-top{
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid #e3e3e3;
  padding:0 20px 0 0; 
  font-size: 14px;
  background: #fff;
}
.main-top-time{
  float: left;
  font-size: 14px;
  width: 200px;
  height: 40px;
}
.main-top-menu{
  float: right;
}
.main-top-menu-box{
  float: left;
  margin: 0 10px;
  cursor: pointer;
}
.main-top-menu-icon{
  margin: 0 3px;
  position: relative;
  top: 5px;
}
.top{
  position: absolute;
  margin-left: 30px;
  height: 40px;
  overflow: hidden;
}
.right-menu-item{
  float: left;
}
</style>
