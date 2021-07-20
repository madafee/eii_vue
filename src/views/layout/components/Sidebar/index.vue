<template>
  <scroll-bar>
    <el-popover
      ref="popover4"
      placement="right"
      trigger="hover">
      <div class="departmentlist-title">企业信息查询平台</div>
      <div class="departmentlist"><span>姓名：</span>{{userdata[0].name}}</div>
      <div class="departmentlist"><span>角色：</span>{{userdata[0].role}}</div>
      <div class="departmentlist"><span>登录名：</span>{{userdata[0].login}}</div>
      <!-- <div class="departmentlist"><span>所属科室：</span>{{userdata[0].department}}</div> -->
    </el-popover>
    <div class="admin-user" v-if="openeduser" v-popover:popover4>
      <div class="adminImg-box">
        <img class="adminImg" src="@/assets/temporary_images/tp001.png" style="width:60px; height:60px">
      </div>
      <div class="admin-user-box">
        <div class="info"><span class="name">{{userdata[0].name}}</span></div>
        <div>{{userdata[0].role}}</div>
      </div>
    </div>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import { getUserdata } from '@/utils/auth' // 获取个人信息

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    isCollapse() {
      this.openeduser = this.sidebar.opened
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      userdata: getUserdata(),
      openeduser: true
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style>
.logo{
  height: 49px;
  line-height: 49px;
  color: #fff;
  font-size: 20px;
  overflow: hidden;
  border-bottom: 1px solid #2d3949;
  text-align: center;
}
.logoImg{
  position: relative;
  top: 3px;
  margin-right: 3px;
}
.admin-user{
  height: 99px;
  border-top: 1px solid #3b4658;
  border-bottom: 1px solid #2d3949;
  color: #fff;
  font-size: 12px;
  padding-top: 5px;
  padding-left: 5px;
}
.adminImg-box{
  text-align: center;
  width: 66px;
  height: 66px;
  float: left;
  margin: 10px 10px 0 5px;
}
.adminImg{
  width: 66px;
  height: 66px;
  border-radius: 33px;
  float: left;
  margin: 0 0 10px 0;
}
.admin-user-box{
  float: left;
  margin: 15px 0 0 0;
  width: 90px;
  overflow: hidden;
}
.admin-user-box .name{
  font-size: 16px;
  color: #5d9cec;
}
.admin-user-box .info{
  padding: 10px 0;
}
.departmentlist{
  height: 24px;
  line-height: 24px;
}
.departmentlist span{
  float: left;
  width: 70px;
  text-align: right;
  color: #000000
}
.departmentlist-title{
  border-bottom: 1px solid #ccc;
  padding:0 0 5px 0;
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
