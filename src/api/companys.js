import request from '@/utils/request'

// 取得公司列表
export function getCompanysList(page) {
  return request({
    url: '/companys',
    method: 'get',
    noauth: '',
    params: page
  })
}

// 新增公司信息
export function addCompanys(data) {
  return request({
    url: '/companys',
    noauth: '',
    method: 'post',
    data
  })
}

// 删除公司信息
export function deleteCompanys(id) {
  return request({
    url: '/companys/' + id,
    noauth: '',
    method: 'delete'
  })
}

// 取得企查查公司列表
export function getQccList(page) {
  return request({
    url: '/companys/qcc',
    method: 'get',
    noauth: '',
    params: page
  })
}

// 取得公司信息详情
export function getCompanysDetailed(id, page) {
  return request({
    url: '/companys/' + id,
    method: 'get',
    noauth: '',
    params: page
  })
}

// 取得股权变更列表
export function getStockchangesList(page) {
  return request({
    url: '/stockchanges',
    method: 'get',
    noauth: '',
    params: page
  })
}

// 取得企查查公司信息
export function getCompanysQcc(keyno, page) {
  return request({
    url: '/companys/qcc/' + keyno,
    method: 'get',
    noauth: '',
    params: page
  })
}

// 取得企查查公司列表
export function getCompanysQccList(page) {
  return request({
    url: '/companys/qcc',
    method: 'get',
    noauth: '',
    params: page
  })
}

// 直接查企查查
export function getQccToken() {
  return request({
    url: '/companys/qcc/token',
    method: 'get',
    noauth: ''
  })
}
