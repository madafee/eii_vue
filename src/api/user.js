import request from '@/utils/request'

// 取得用户列表
export function getUserList(page) {
  return request({
    url: '/users',
    method: 'get',
    noauth: '',
    params: page
  })
}

// 添加用户
export function addUser(data) {
  return request({
    url: '/users',
    noauth: '',
    method: 'post',
    data
  })
}

// 修改用户
export function editUser(data, id) {
  return request({
    url: '/users/' + id,
    noauth: '',
    method: 'put',
    data
  })
}

// 取得用户信息
export function getUser(id) {
  return request({
    url: '/users/' + id,
    noauth: '',
    method: 'get'
  })
}

// 删除用户信息
export function deleteUser(id) {
  return request({
    url: '/users/' + id,
    noauth: '',
    method: 'delete'
  })
}

// 用户修改密码
export function editPassword(data) {
  return request({
    url: '/users/user/password',
    noauth: '',
    method: 'put',
    data
  })
}
