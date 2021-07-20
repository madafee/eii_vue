var configuration = window.g.STATES

var states = {
  cleaningwaiting: 'cleaningwaiting', // 清洗等待中(启用)
  packingwaiting: 'packingwaiting', // 打包等待中(启用)
  sterilizationwaiting: 'sterilizationwaiting', // 灭菌等待中(启用)
  sterilizationassigned: 'sterilizationassigned', // 灭菌已分配(启用)
  inventorywaiting: 'inventorywaiting', // 入库等待中(启用)
  inventorycomplete: 'transportationcomplete', // 运输已完成(启用)
  distributionwaiting: 'distributionwaiting', // 配送等待中(启用)
  callbackwaiting: 'callbackwaiting', // 回收等待中(启用)
  receptionwaiting: 'receptionwaiting', // 接收等待中(启用)
  recallwaiting: 'recallwaiting,recallcomplete', // 召回等待中(启用)
  remandwaiting: 'cleaningwaiting,cleaningassigned,packingwaiting,sterilizationwaiting,sterilizationassigned,inventorywaiting,distributionwaiting', // 退还等待(启用)
  lostwaiting: '' // 丢失等待(启用)
}
function statesmessage() {
  if (configuration === 1) return states
}

export default statesmessage
