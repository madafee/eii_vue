import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
import authsmessage from '@/utils/auths.js' // 权限管理
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
* redirect: noredirect           当设置 noredirect 的时候该路由不会在面包屑导航中出现
* name:'router-name'             设定路由的名字，一定要填写不然 使用 <keep-alive> 时会出现各种问题
* meta : {
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'index' }
    }]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/companys',
    component: Layout,
    redirect: '/companys/index',
    meta: {
      // roles: [1, 2],
      title: '重点企业监测',
      icon: 'orders'
    },
    children: [
      { path: 'index', component: _import('companys/index'), name: '重点企业监测', alone: true, meta: { title: '重点企业监测', icon: 'confirmation' }},
      { path: 'detailed', component: _import('companys/detailed'), name: '重点企业详细', hidden: true, meta: { title: '重点企业详细', icon: '' }}
    ]
  },
  {
    path: '/iframe',
    component: Layout,
    redirect: '/iframe/index',
    meta: {
      // roles: [authsmessage.ADMIN],
      title: '企业查询',
      icon: 'client'
    },
    children: [
      { path: 'index', component: _import('iframe/index'), name: '企业查询', meta: { title: '企业查询', icon: 'search' }}
    ]
  },
  // {
  //   path: '/qcc',
  //   component: Layout,
  //   redirect: '/qcc/index',
  //   meta: {
  //     // roles: [1, 2],
  //     title: '企业查询',
  //     icon: 'orders'
  //   },
  //   children: [
  //     { path: 'index', component: _import('qcc/index'), name: '企业查询', alone: true, meta: { title: '企业查询', icon: 'search' }},
  //     { path: 'detailed', component: _import('qcc/detailed'), name: '企业详细', hidden: true, meta: { title: '企业详细', icon: '' }}
  //   ]
  // },
  {
    path: '/announcements',
    component: Layout,
    redirect: '/announcements/index',
    meta: {
      // roles: [1, 2],
      title: '公告查询',
      icon: 'orders'
    },
    children: [
      { path: 'index', component: _import('announcements/index'), name: '公告查询', meta: { title: '公告查询', icon: 'abnormal' }}
    ]
  },
  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/index',
    meta: {
      // roles: [1, 2],
      title: '自助查询',
      icon: 'orders'
    },
    children: [
      { path: 'index', component: _import('orders/index'), name: '自助查询', meta: { title: '自助查询', icon: 'calendars' }}
    ]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    meta: {
      roles: [authsmessage.ADMIN],
      title: '用户管理',
      icon: 'client'
    },
    children: [
      { path: 'index', component: _import('users/index'), name: '用户管理', meta: { title: '用户管理', icon: 'users' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
