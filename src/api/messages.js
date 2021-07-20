import request from '@/utils/request'

// 取得留言列表
export function getMessagesList(page) {
  return request({
    url: '/messages',
    method: 'get',
    noauth: '',
    params: page
  })
}

// 修改留言信息
export function addMessages(data) {
  return request({
    url: '/messages',
    noauth: '',
    method: 'post',
    data
  })
}

// 删除留言信息
export function deleteMessages(id) {
  return request({
    url: '/messages/' + id,
    noauth: '',
    method: 'delete'
  })
}
