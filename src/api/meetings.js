import request from '@/utils/request'

// 取得会议列表
export function getMeetingsList(page) {
  return request({
    url: '/meetings',
    method: 'get',
    noauth: '',
    params: page
  })
}

// 修改会议信息
export function putMeetings(data, id) {
  return request({
    url: '/meetings/' + id,
    noauth: '',
    method: 'put',
    data
  })
}

// 取得会议信息
export function getMeetings(id) {
  return request({
    url: '/meetings/' + id,
    method: 'get',
    noauth: ''
  })
}

// 删除会议信息
export function deleteMeetings(id) {
  return request({
    url: '/meetings/' + id,
    noauth: '',
    method: 'delete'
  })
}

// 会议排班
export function meetingsScheduler(data) {
  return request({
    url: '/meetings/scheduler',
    noauth: '',
    method: 'post',
    data
  })
}

// 会议预约
export function postAppoint(id) {
  return request({
    url: '/meetings/' + id + '/appoint',
    noauth: '',
    method: 'post'
  })
}

// 会议取消预约
export function deleteAppoint(id) {
  return request({
    url: '/meetings/' + id + '/appoint',
    noauth: '',
    method: 'delete'
  })
}

// 取得会议计划列表
export function getSchedulersList(page) {
  return request({
    url: '/schedulers',
    method: 'get',
    noauth: '',
    params: page
  })
}

// 修改会议计划
export function putSchedulers(data, id) {
  return request({
    url: '/schedulers/' + id,
    noauth: '',
    method: 'put',
    data
  })
}

// 会议排班
export function postScheduler(data) {
  return request({
    url: '/schedulers',
    noauth: '',
    method: 'post',
    data
  })
}
