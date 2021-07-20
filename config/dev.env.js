'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"', // 开发服务器
  BASE_API: '"https://www.dlyunzhi.cn:4443/apis/hrms"'
})
