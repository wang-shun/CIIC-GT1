var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  QUERY_HOST_SYSTEM_CONFIG: '"http://172.16.9.24:9103"',// 生产环境host
  COMMAND_HOST_SYSTEM_CONFIG: '"http://172.16.9.24:9103"',// 生产环境host
  QUERY_HOST_ORGANIZATION: '"http://172.16.9.24:9107"',// 生产环境host
  COMMAND_HOST_ORGANIZATION: '"http://172.16.9.24:9107"',// 生产环境host
  QUERY_HOST_ALERT: '"http://172.16.9.24:9111"',// 生产环境host
  COMMAND_HOST_ALERT: '"http://172.16.9.24:9111"'// 生产环境host
})
