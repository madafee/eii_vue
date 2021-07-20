import request from '@/utils/request'

/* get */
export function get(page, id) {
  return request({
    url: '/mrms/videos/category/' + id,
    method: 'get',
    params: page
  })
}

/* post */
export function add(params, id) {
  const data = {
    'type': params.type,
    'title': params.title
  }
  return request({
    url: '/mrms/categorys/category/' + id,
    method: 'post',
    data
  })
}
