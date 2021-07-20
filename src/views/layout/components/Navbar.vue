<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb @description="description"></breadcrumb>
    <!-- <el-tooltip
      v-if="path !== 'dashboard'"
      class="description"
      placement="left-start">
      <div slot="content" v-html="content" class="contentwidth"></div>
      <i class="el-icon-info"></i>
    </el-tooltip> -->
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data() {
    return {
      name: null,
      path: null,
      content: null,
      descriptionBox: this.$dictsdescription
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    description(data) {
      var _this = this
      _this.name = data[data.length - 1].name
      _this.path = String(data[data.length - 1].path).replace(/[/]/g, '')
      _this.content = _this.$dictsdescription[_this.path]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  float: left;
  height: 49px;
  line-height: 49px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 49px;
    float: left;
    padding: 0 10px;
    margin-left: 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
.description{
  float: right;
  color: #E6A23C;
  margin-right: 30px;
  margin-top: 10px;
  padding-top: 5px;
  cursor: pointer;
}
.contentwidth{
  max-width: 350px;
}
</style>

