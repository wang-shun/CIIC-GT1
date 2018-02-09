var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  env: '"dev"',
  NODE_ENV: '"development"',
  QUERY_HOST: '"http://localhost:9000"', // 开发环境host
  COMMAND_HOST: '"http://localhost:9002"'// 开发环境host
})
