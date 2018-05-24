var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  env: '"uat"',
  HOME_PATH: '"http://172.16.9.60:8070/#/"',
  BASE_PATH: '"http://172.16.9.60"',
  COMMON_SERVICE: '"http://172.16.9.56:9621/api"',
  SYSTEM_MANAGE_API_SERVICE: '"http://172.16.9.60:2003/api"'
});
