<template>
  <vue-seamless-scroll :data="listData" class="warp">
    <ul class="item">
      <li v-for="(item, index) in listData" :key="index" class="clearfix" @click="godetailed(item.company_id)">
        <span class="titlename" v-text="item.company_name" style="width:25%; float:left"></span>
        <span class="title" v-text="item.info" style="width:60%; float:left"></span>
        <span class="date" v-text="item.create_datetime" style="width:15%; float:right"></span>
      </li>
    </ul>
  </vue-seamless-scroll>
</template>

<script>
/* eslint-disable */
  import vueSeamlessScroll from 'vue-seamless-scroll'
  import { getStockchangesList } from '@/api/companys'
  export default {
    name: 'Example01Basic',
    components: {
      vueSeamlessScroll
    },
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
          page_size: 200,
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
            console.log(data)
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
    height: 300px;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      li,
      a {
        justify-content: space-between;
        font-size: 15px;
        cursor: pointer;
        border: 1px solid #eee;
        margin: 10px;
      }
    }
  }
  .titlename{
    line-height: 22px;
    padding: 5px;
  }
  .title{
    line-height: 22px;
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
    padding: 5px;
  }
  .date{
    text-align: center;
    padding: 5px;
  }
</style>