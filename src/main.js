import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
// import VueBus from 'vue-bus'
import '@/styles/index.scss' // global css
import dictsmessage from '@/utils/message.js' // 列表固定字段
import authsmessage from '@/utils/auths.js' // 权限管理
import configbox from '@/utils/config.js' // 列表固定字段
import dictsdescription from '@/utils/description.js' // 页面描述文档
import codebox from '@/utils/code.js' // 长度和位置关系文档
import reset from '@/utils/reset.js' // 重置表单数据
import preventReClick from '@/utils/preventReClick.js' // 防多次点击，重复提交
import ElBigdataTable from 'vue-elementui-bigdata-table' // 采用虚拟渲染方案
import * as echarts from 'echarts'
// import $ from 'jquery'
// import './assets/zebra/BrowserPrint-1.0.4.min'
// 引入axios
import axios from 'axios'
Vue.prototype.axios = axios

import App from './App'
import router from './router'
import store from './store'
Vue.prototype.$echarts = echarts

import '@/icons' // icon
import '@/permission' // permission control

Vue.prototype.$dictsmessage = dictsmessage // 列表固定字段 authsmessage
Vue.prototype.$authsmessage = authsmessage // 权限管理
Vue.prototype.$dictsdescription = dictsdescription // 页面描述文档
Vue.prototype.$configbox = configbox // 固定相配置文件
Vue.prototype.$codebox = codebox // 长度和位置关系文档
Vue.prototype.$reset = reset // 重置表单数据 使用方法 el-dialog中加入@close="$reset('form')" form表单中必须有ref="form"
Vue.prototype.$preventReClick = preventReClick // 防多次点击，重复提交
Vue.use(ElementUI, { locale })
Vue.use(ElBigdataTable)
// Vue.use(VueBus)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
