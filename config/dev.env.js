var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  QUERY_HOST_SYSTEM_CONFIG: '"http://localhost:9103"',// 生产环境host
  COMMAND_HOST_SYSTEM_CONFIG: '"http://localhost:9103"',// 生产环境host
  QUERY_HOST_ORGANIZATION: '"http://localhost:9107"',// 生产环境host
  COMMAND_HOST_ORGANIZATION: '"http://localhost:9107"',// 生产环境host
  QUERY_HOST_ALERT: '"http://localhost:9111"',// 生产环境host
  COMMAND_HOST_ALERT: '"http://localhost:9111"'// 生产环境host
})
