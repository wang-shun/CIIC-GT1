/**
 * Created by huangye on 2018/7/5.
 */
var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  env: '"sit"',
  HOME_PATH: '"http://172.16.9.68:8070/#/"',
  BASE_PATH: '"http://172.16.9.68"',
  COMMON_SERVICE: '"http://172.16.9.68:9621/api"',
  SYSTEM_MANAGE_API_SERVICE: '"http://172.16.9.69:2003/api"'
});
