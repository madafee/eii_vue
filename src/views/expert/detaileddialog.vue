<template>
  <div>
    <el-dialog title="专家信息" :visible.sync="dialogGenerateVisible" :destroy-on-close="true" :close-on-click-modal="false" top="20px" width="600px" @close="$reset('form')" append-to-body>
      <div id="personnel" style="padding: 20px 20px 10px;" class="clearfix">
        <div class="avatarBox">
          <div>
            <el-image
              class="avatarimage"
              :fit="fit"
              :src="url" 
              :preview-src-list="srcList">
            </el-image>
          </div>
          <el-tag size="mini" type="success" v-if="sizeForm.is_valid === 1">有效</el-tag>
          <el-tag size="mini" type="danger" v-else-if="sizeForm.is_valid === 0">无效</el-tag>
        </div>
        <el-form ref="form" :model="sizeForm" label-width="100px" size="small" style="float:left; width:400px;">
          <el-form-item label="登陆名：" class="redItem">{{sizeForm.login}}</el-form-item>
          <el-form-item label="姓名：" class="redItem">{{sizeForm.name}}</el-form-item>
          <el-form-item label="角色：" class="redItem">{{sizeForm.role}}</el-form-item>
          <el-form-item label="职位：" class="redItem">{{sizeForm.position}}</el-form-item>
          <el-form-item label="级别：" class="redItem">{{sizeForm.rank}}</el-form-item>
          <el-form-item label="专业领域：" class="redItem"><div class="content-html" v-html="sizeForm.profession"></div></el-form-item>
          <el-form-item label="简介：" class="redItem"><div class="content-html" v-html="sizeForm.comment"></div></el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { getExpert } from '@/api/expert'
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
        position: '',
        rank: '',
        profession: '',
        comment: '',
        avatar: ''
      },
      roleBox: [],
      fit: 'cover',
      url: '',
      srcList: []
    }
  },
  created() {
  },
  watch: {
    dialogVisible() {
      var _this = this
      _this.dialogGenerateVisible = true
      _this.getExpertBox(this.dialogVisible[0].id)
    }
  },
  methods: {
    getExpertBox(id) {
      var _this = this
      getExpert(id).then(response => {
        if (response.code === 'OK') {
          var srcList = []
          _this.sizeForm = response.data[0]
          _this.url = response.data[0].avatar,
          srcList.push(response.data[0].avatar)
          _this.srcList = srcList
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

