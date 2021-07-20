/* eslint-disable */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getAuthorization, getUserdata, getDictsDictsKey } from '@/utils/auth' // 验权
// import { dictsmessage } from '@/utils/message'
import { getDictsDicts } from '@/utils/dicts' // 字典

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getAuthorization()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // array.indexOf(2) array.lastIndexOf(0) ECMAScript 5新属性，不存在数组里返回-1
      if (getDictsDictsKey() === null) {
        // var page = { page_size: '20', page_no: 1 }
        // getDictsBox(page) // 取得全部字典
        // getDictsCorporationBox() // 取得单位字典信息
        getDictsDicts() // 取得字典信息
        // getDictsscheduletypes() // 取得字典信息
        // departmentsList() // 取得科室列表
      }
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo', getUserdata()[0].id).then(res => { // 拉取user_info
          const roles = res[0].auths // note: roles must be a array! such as: ['editor','develop']
          //const roles = [1,2,3]
          // roles.push(2)
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
