<template>
  <div class="main-top-time" >
    <svg-icon class="main-top-menu-icona" icon-class="sound" style="width:20px;height:20px;display: inline-block;"></svg-icon>
    <div class="top">
        <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="item in datalist" :key="item.index">
          <p @click="detail(item.id)">{{item.title}}</p>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
    <div class="newsdialog">
      <el-dialog title="" :visible.sync="dialogDetailed" width="60%" status-icon>
        <detailed :child-data="detailedId"></detailed>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import '@/styles/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import detailed from './detailed'
export default {
  data: function() {
    return {
      page: {
        page_size: '10',
        page_no: 1,
        type: ''
      },
      dialogDetailed: false, // 详细信息dialog
      detailedId: '', // 详细信息dialog
      swiperOption: {
        notNextTick: true,
        autoplay: true,
        speed: 1200,
        direction: 'vertical',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        observer: true,
        observeParents: true,
        debugger: true
      },
      datalist: ''
    }
  },
  components: {
    swiper,
    swiperSlide,
    detailed
  },
  computed: {
  },
  mounted: function() {
  },
  created() {
  },
  methods: {
    detail(e) {
      this.detailedId = e
      this.dialogDetailed = true
    }
  }
}
</script>
<style>
.newsdialog .el-dialog__header{
  border-bottom: 0;
}
</style>
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
.main-top-menu-icona{
  margin: 0 0px;
  position: absolute;
  top: 15px;
}
.top{
  position: absolute;
  margin-left: 30px;
  height: 40px;
  overflow: hidden;
}
p{
  margin: 0;
  padding: 0;
}
</style>
