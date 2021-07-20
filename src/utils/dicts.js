// 字典
// import { getDictsAll, getScheduleTypesBox, getDepartmentsList } from '@/api/dicts'
import { getDictsAll } from '@/api/dicts'
// 取得科室列表
export function getDictsDicts() {
  return new Promise((resolve, reject) => {
    getDictsAll().then(response => {
      window.sessionStorage.setItem('Dicts-Dicts-All', JSON.stringify(response.data))
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

// export function getDictsscheduletypes() {
//   return new Promise((resolve, reject) => {
//     getScheduleTypesBox().then(response => {
//       window.sessionStorage.setItem('Dicts-Schedule-Types', JSON.stringify(response.data))
//       resolve(response.data)
//     }).catch(error => {
//       reject(error)
//     })
//   })
// }
// var page = { page_size: 1000, page_no: 1, type_id: '', keyword: '' }
// export function departmentsList() {
//   return new Promise((resolve, reject) => {
//     getDepartmentsList(page).then(response => {
//       window.sessionStorage.setItem('Dicts-Departments', JSON.stringify(response.data))
//       resolve(response.data)
//     }).catch(error => {
//       reject(error)
//     })
//   })
//  }
