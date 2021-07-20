// import Cookies from 'js-cookie'
var storage = window.sessionStorage
const TokenKey = 'Admin-Token'
const AuthorizationKey = 'Admin-Authorization'
const UserdataKey = 'Admin-Data'
const TimestampKey = 'Admin-Time'
const ProcessKey = 'Admin-Process'
const DepartmentsKey = 'Admin-Data-departments'
const AllDepartmentsKey = 'Dicts-Departments'
// 字典
const DictsDictsKey = 'Dicts-Dicts-All'
const DictsScheduletypesKey = 'Dicts-Schedule-Types'

export function getToken() {
  return storage.getItem(TokenKey)
}

export function setToken(token) {
  return storage.setItem('TokenKey', token)
}

export function removeToken() {
  return storage.removeItem(TokenKey)
}

export function getAuthorization() {
  return storage.getItem(AuthorizationKey)
}

export function setAuthorization(authorization) {
  return storage.setItem('AuthorizationKey', authorization)
}

export function removeAuthorization() {
  return storage.removeItem(AuthorizationKey)
}

export function getUserdata() {
  return JSON.parse(storage.getItem(UserdataKey))
}

export function setUserdata(userdata) {
  return storage.setItem('UserdataKey', userdata)
}
// 时间戳-----------------------------------------
export function getTimestamp() {
  return storage.getItem(TimestampKey)
}

export function setTimestamp(timestamp) {
  return storage.setItem('TimestampKey', timestamp)
}
// 取得医疗包流程字典信息
export function getProcess() {
  return storage.getItem(ProcessKey)
}
export function removeProcess() {
  return storage.removeItem(ProcessKey)
}
// --- 字典 ---
// 取得字典信息
export function getDictsDictsKey() {
  return storage.getItem(DictsDictsKey)
}
// 取得排班类型字典
export function getDictsScheduletypesKey() {
  return storage.getItem(DictsScheduletypesKey)
}
// 取得登录人科室列表
export function getDepartmentsKey() {
  return storage.getItem(DepartmentsKey)
}
// 取得登录人科室列表
export function getAllDepartmentsKey() {
  return storage.getItem(AllDepartmentsKey)
}
