<template>
  <div ref="page">
    <div class="warp">
      <table class="ntable" cellspacing="0">
        <tr><th width="30%">企业名称</th><th width="55%">变更内容</th><th width="15%">日期</th></tr>
        <tr v-for="(item,index) in listData" :key="index" @click="godetailed(item.company_id)">
          <td style="text-align: left;">
            <div class="cur">{{item.company_name}}</div>
          </td>
          <td style="text-align: left;">
            <div class="infoBox">{{item.info}}</div>
          </td>
          <td style="text-align: center;">{{item.create_datetime}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import { getStockchangesList } from '@/api/companys'
  export default {
    name: '',
    components: {},
    data () {
      return {
        listData: [],
      }
    },
    created() {
      this.getStockchanges()
    },
    methods: {
      getStockchanges() {
        var _this = this
        var page = {
          page_size: 10,
          page_no: 1,
        }
        getStockchangesList(page).then(response => {
        _this.loading = false
          if (response.code === 'OK') {
            var data = response.data
            data.forEach(function(value, index, array) {
              var htmlBox = ''
              value.change_info.forEach(function(v, i, a) {
                if ((i+1) === value.change_info.length) {
                  htmlBox += v
                } else {
                  htmlBox += v + '，'
                }
              })
              value.info = htmlBox
              value.create_datetime = value.create_datetime.slice(0,10)
            })
            _this.listData = data
          }
        })
      },
      godetailed(id) {
        this.$router.push({ path: '/companys/detailed?id=' + id })
      }
    }
  }
</script>

<style lang="scss" scoped>
.warp {
  margin: 0 auto;
  padding: 10px;
}
.ntable{
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  border-top: #e4eef6 1px solid;
  border-right: #e4eef6 1px solid;
}
.ntable .tb {
    background: #f2f9fc;
}
.ntable td {
    padding: 10px 10px 11px 10px;
    border-bottom: #e4eef6 1px solid;
    border-left: #e4eef6 1px solid;
    word-break: break-all;
    font-size: 14px;
    line-height: 1.6;
    color: #222;
    word-wrap: break-word;
}
.ntable th {
    text-align: center;
    background: #f2f9fc;
    border-bottom: #e4eef6 1px solid;
    border-left: #e4eef6 1px solid;
    border-collapse: collapse;
    padding: 12px 2px 12px 2px;
    font-weight: normal;
    color: #333;
    line-height: 19px;
    white-space: nowrap;
    font-size: 14px;
}
.lan{
  color: #128bed;
}
.items:hover{
  cursor: pointer;
  color: #128bed;
}
.detailed-bor{
  border: #e4eef6 1px solid;
  margin-bottom: 20px;
}
.cur{
  cursor: pointer;
}
.cur:hover{
  cursor: pointer;
  color: #128bed;
}
.infoBox{
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* ! autoprefixer: off */ 
  -webkit-box-orient: vertical;
  /* autoprefixer: on */ 
  cursor: pointer;
}
.infoBox:hover{
  cursor: pointer;
  color: #128bed;
}
</style>