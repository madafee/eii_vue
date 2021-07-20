import request from '@/utils/request'

// 取得专家列表
export function getExpertList(page) {
  return request({
    url: '/users/expert',
    method: 'get',
    noauth: '',
    params: page
  })
}

// 修改专家信息
export function putExpert(data, id) {
  return request({
    url: '/users/' + id + '/expert',
    noauth: '',
    method: 'put',
    data
  })
}

// 取得专家信息
export function getExpert(id) {
  return request({
    url: '/users/' + id + '/expert',
    method: 'get',
    noauth: ''
  })
}

// 取得用户列表
export function getClientList(page) {
  return request({
    url: '/users/client',
    method: 'get',
    noauth: '',
    params: page
  })
}

// 修改用户信息
export function putClient(data, id) {
  return request({
    url: '/users/' + id + '/client',
    noauth: '',
    method: 'put',
    data
  })
}

// 取得用户信息
export function getClient(id) {
  return request({
    url: '/users/' + id + '/client',
    method: 'get',
    noauth: ''
  })
}
