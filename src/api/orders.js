import request from '@/utils/request'

// 取得工单列表
export function getOrdersList(page) {
  return request({
    url: '/orders',
    method: 'get',
    noauth: '',
    params: page
  })
}

// 新增工单
export function postOrders(data) {
  return request({
    url: '/orders',
    noauth: '',
    method: 'post',
    data
  })
}

// 取得工单详情
export function getOrdersr(id) {
  return request({
    url: '/orders/' + id,
    noauth: '',
    method: 'get'
  })
}

// 新增记录
export function addOrdersRecords(id, data) {
  return request({
    url: '/orders/' + id + '/records',
    noauth: '',
    method: 'post',
    data
  })
}

// 更新工单状态
export function editOrders(id, data) {
  return request({
    url: '/orders/' + id + '/status',
    noauth: '',
    method: 'put',
    data
  })
}

// 取得公告列表
export function getAnnouncements(page) {
  return request({
    url: '/announcements',
    noauth: '',
    method: 'get',
    params: page
  })
}

// 取得工单统计
export function getStatistic() {
  return request({
    url: '/orders/statistic',
    noauth: '',
    method: 'get'
  })
}
