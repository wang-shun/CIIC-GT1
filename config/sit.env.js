var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  QUERY_HOST: '"http://172.16.9.29:9000"',// sit环境host
  COMMAND_HOST: '"http://172.16.9.29:9002"'// uat环境host
})
