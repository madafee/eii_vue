import request from '@/utils/request'

// 取得字典信息
export function getDictsAll() {
  return request({
    url: '/dicts/all',
    method: 'get',
    noauth: ''
  })
}

// 取得字典信息name
export function getDicts(name) {
  return request({
    url: '/v1/dicts/' + name,
    method: 'get',
    noauth: ''
  })
}
