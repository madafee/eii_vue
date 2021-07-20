<template>
  <div class="user-add">
    <div class="user-add-box">
      <el-form ref="form" :label-position="labelPosition" :model="form" label-width="100px">
          <div id="title">
            <h3>{{form.title}}</h3>
          </div>
          <div class="detailedpadding">
            <span v-html="form.detail"></span>
          </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    childData: {
      type: Number,
      default: true
    }
  },
  data() {
    return {
      form: {
        title: '',
        detail: '',
        create_datetime: '',
        clicks: ''
      },
      labelPosition: 'left',
      message: this.$dictsmessage.packagesArray
    }
  },
  created() {
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style>
.userdetailed .el-form-item{
  border-bottom: 1px dotted #dcdfe6;
  margin-bottom: 0;
  margin-top: 10px;
  min-height: 50px;
}
.user-add{
  background: #fff;
}
.user-title{
  font-size: 16px;
  color: #354052;
  height: 47px;
  line-height: 47px;
  border-bottom: 2px solid #dcdfe6;
  padding: 0 20px;
  font-weight: bold;
}
.user-title-img{
  float: left;
  background: #fe8800;
  width: 6px;
  height: 18px;
  margin: 13px 10px 0 0;
}
.userinput{
  width: 260px;
}
.usertextarea{
  width: 360px;
}
.user-basic{
  border-bottom: 1px dotted #dfdfdf;
  margin-bottom: 20px;
}
.textred{
  color: red;
  font-weight: bold;
}
.textgreen{
  color: #13ce66;
  font-weight: bold;
}
#title{
  display: flex;
  justify-content:center;
}
</style>
