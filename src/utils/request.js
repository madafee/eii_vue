import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getAuthorization, getToken, getTimestamp, removeAuthorization } from '@/utils/auth'
var baseURLStr = window.g.APIURL

window.isRefreshing = false /* 是否正在刷新的标志 */
var refreshSubscribers = [] /* 存储请求的数组 */
/* 将所有的请求都push到数组中,其实数组是[function(token){}, function(token){},...] */
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}
/* 数组中的请求得到新的Authorization之后自执行，用新的Authorization去请求数据 */
function onRrefreshed(token) {
  refreshSubscribers.map(cb => cb(token))
  window.isRefreshing = false
}
/* 刷新token的请求方法 */
function getRefreshToken() {
  return axios.get(baseURLStr + '/users/user/authorization', {
    headers: { token: getToken() }
  })
}

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: baseURLStr, // api的base_url
  timeout: 1500000, // 请求超时时间
  isRetryRequest: false // 用来处理刷新token后重新请求的自定义变量
})
// request拦截器-----请求拦截器 config.noauth = true 不需要传 Authorization
service.interceptors.request.use(config => {
  if (getAuthorization()) {
    if (config.noauth !== true) {
      config.headers['Authorization'] = getAuthorization() /* 请求头添加Authorization信息 */
      var currentTime = Date.parse(new Date())
      var minus = currentTime - getTimestamp()
      var difference = minus / 1000
      if (difference > (24 * 3600) && config.url !== '/users/user/authorization') { /* 根据过期时间判断 */
        if (!window.isRefreshing) {
          window.isRefreshing = true
          getRefreshToken().then(function(res) {
            if (res.data.code === 'OK') {
              var authToken = res.data.authorization
              config.headers['Authorization'] = authToken
              window.sessionStorage.setItem('Admin-Time', Date.parse(new Date()))
              window.sessionStorage.setItem('Admin-Authorization', res.data.authorization)
              onRrefreshed(authToken) /* 执行数组里的请求，重新发起被挂起的请求 */
            } else if (res.data.code === 'TOKEN_INVALID') {
              store.dispatch('FedLogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            }
          })
        }
        var retry = new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            config.headers['Authorization'] = token
            resolve(config) /* 将请求挂起 */
          })
        })
        return retry
      } else {
        return config
      }
    }
    if (config.url === '/users/user/authorization') {
      config.headers['token'] = getToken()
    }
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器-----响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 'TOKEN_INVALID') {
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    } else if (res.code === 'OK') {
      return response.data
    } else if (res.code === 'AUTHORIZATION_INVALID') {
      removeAuthorization()
      if (!response.config.isRetryRequest) {
        return getRefreshToken().then(function(res) {
          if (res.data.code === 'OK') {
            response.config.isRetryRequest = true
            var authToken = res.data.authorization
            response.config.headers['Authorization'] = authToken
            window.sessionStorage.setItem('Admin-Time', Date.parse(new Date()))
            window.sessionStorage.setItem('Admin-Authorization', res.data.authorization)
            return service(response.config) // 重新执行接口
          }
        })
      }
    } else if (res.code === 'NOT_FOUND') {
      response.config.params['page_no'] = 1
      return service(response.config) // 重新执行接口
    } else {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
