import request from '@/utils/request'

export function login(login, password) {
  return request({
    url: '/users/user/login',
    method: 'post',
    noauth: true,
    data: {
      login,
      password
    }
  })
}

export function usersSwap(token) {
  return request({
    url: '/users/user/authorization',
    method: 'get',
    header: {
      token
    }
  })
}
// 扫码登录
export function loginCode(code) {
  return request({
    url: '/users/user/code/login',
    method: 'post',
    noauth: true,
    data: {
      code
    }
  })
}
