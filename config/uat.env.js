var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  QUERY_HOST: '"http://uathost:9000"',
  COMMAND_HOST: '"http://uathost:9002"'
})
