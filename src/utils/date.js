/**
 * Created by zhengenru on 2020-06-11.
 */
// 当前时间
export function getNowDate() {
  var date = new Date()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  var currentdate = date.getFullYear() + '-' + month + '-' + strDate
  return currentdate
}
