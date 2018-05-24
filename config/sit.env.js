var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  env: '"sit"',
  HOME_PATH: '"http://172.16.9.25:8070/#/"',
  BASE_PATH: '"http://172.16.9.25"',
  COMMON_SERVICE: '"http://172.16.9.24:9621/api"',
  SYSTEM_MANAGE_API_SERVICE: '"http://172.16.9.24:2003/api"'
});
