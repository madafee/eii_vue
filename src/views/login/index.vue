<template>
  <div class="login-container" :style="{backgroundImage: 'url(' + bg1 + ')'}">
    <div class="yyyy-login">
      <el-image :src="bg2"></el-image>
      <div class="yyyy-login-r">
        <div id="big">
          <div class="yyyy-login-h1">企业信息查询平台</div>
          <div class="yyyy-login-h3">Enterprise information inquiry platform</div>
          <el-form :model="loginForm" ref="loginForm" label-position="left" label-width="0px">
            <el-form-item prop="login">
              <svg-icon icon-class="user" class="use" />
              <el-input name="login" type="text" v-model="loginForm.login" autoComplete="on" id="login" placeholder="用户名" />
            </el-form-item>
            <el-form-item prop="passwd">
              <svg-icon icon-class="password" class="pas"></svg-icon>
              <el-input name="passwd" id="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                placeholder="密码"></el-input><span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"  class="eye"/></span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  id="btn" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
export default {
  name: 'login',
  directives: {
    focus: {
      update: function(el, { value }) {
        if (value) {
          el.focus()
        }
      },
      inserted: function(el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  data() {
    return {
      loginForm: {
        login: '',
        password: ''
      },
      loading: false,
      pwdType: 'password',
      code: '',
      logincutover: true,
      focusState: true,
      bg1: require('@/assets/images/login.png'),
      bg2: require('@/assets/images/login_left.png')
    }
  },
  watch: {
    focusState() {
      if (this.focusState === false) {
        this.focusState = true
      }
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    // 用户名密码登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 扫码登录
    submit() {
      this.focusState = true
      var code = this.code
      if (code) {
        this.loading = true
        this.$store.dispatch('loginCode', code).then(() => {
          this.loading = false
          this.$router.push({ path: '/' })
        }).catch(() => {
          this.loading = false
        })
      } else {
        console.log('error submit!!')
        return false
      }
    },
    // 切换登录
    cutover() {
      this.logincutover = !this.logincutover
    },
    blurState() {
      this.focusState = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /*@import "./../../styles/index.css";*/

  .login-container{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-image: url(./../../assets/images/login.png);
    background-size: cover;
  }
  h1{
    text-align: center;
    margin-top: 100px;
    font-size:42px;
    letter-spacing:4px;
    color: white;
    text-shadow: #3f648c 0.05em 0.05em 0.05em
  }
  h2{
    text-align: center;
    margin-top: 10px;
    font-size:36px;
    letter-spacing:4px;
    color: white;
    text-shadow: #3f648c 0.05em 0.05em 0.05em
  }
  #big{
    width: 370px;
    height: 300px;
    border:solid 2px white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 86px;
    border-radius: 10px;
  }
  #small{
    cursor: pointer;
    display:block;
    width:122px;
    height:122px;
    position:relative;
    position:relative;
    top:-61px;
    border:solid 0px ;
    margin: 0 auto;
    background:#354052;
    border-radius: 61px;

  }

  #login{
    position: relative;
    margin-left: 25px;
    display: inline-block;
    width: 324px;
    height: 43px;
    border-radius: 4px;
    font-size: 15px;

    padding-left: 45px;
    padding-top: 5px;
  }
  #password{
    position: relative;
    margin-left: 25px;
    display: inline-block;
    width: 324px;
    height: 43px;
    border-radius: 4px;
    font-size: 15px;
    margin-bottom: 16px;
 
    padding-left: 45px;
    padding-top: 5px;
  }
  #btn{
    position: relative;
    width: 324px;
    height: 36px;
    margin-left: 25px;
    color: white;
    font-size: 18px;
    border: none;
    line-height: 10px;
    background: #409eff;
  }
  #ewm{
    position: relative;
    top:32px;
    display: block;
    margin: 0 auto;
  }
  .use{
    position: absolute;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 25px;
    left: 35px;
    top: 10px;
    z-index: 999;
    color: #cccccc;
  }
   .pas{
    position: absolute;
    vertical-align: middle;
    width: 30px;
   display: inline-block;
   font-size: 19px;
   left: 38px;
   top: 13px;
   z-index: 999;
    color: #cccccc;
  }
 .eye{
   position: absolute;
   vertical-align: middle;
   width: 30px;
   display: inline-block;
   font-size: 19px;
   left: 320px;
   top: 13px;
   cursor: pointer;
   z-index: 999;
    color: #cccccc;
 }
 .logincutover{
   text-align: center;
 }
 .yyyy-login{
   width: 800px;
   height: 500px;
   position: absolute;
   left: 50%;
   top: 50%;
   margin: -250px 0 0 -400px;
   background: #ffffff;
   border-radius: 10px;
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
 }
 .yyyy-login-r{
   float: right;
   width: 420px;
 }
 .yyyy-login-h1{
   font-size: 20px;
   font-family: 微软雅黑;
   color: #474747;
   text-align: center;
   padding-bottom: 20px;
 }
 .yyyy-login-h3{
   font-size: 9px;
   font-family: 微软雅黑;
   color: #c7c7c7;
   text-transform:uppercase;
   text-align: center;
   padding-bottom: 40px;
 }
</style>
