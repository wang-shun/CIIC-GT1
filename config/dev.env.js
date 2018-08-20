var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  env: '"dev"',
  NODE_ENV: '"development"',
  HOME_PATH: '"http://localhost:8070/#/"',
  BASE_PATH: '"http://localhost"',
  COMMON_SERVICE: '"http://172.16.9.31:9621/api"',
  ALERT_SERVICE: '"http://172.16.9.31:9611/api"',
  SYSTEM_MANAGE_API_SERVICE: '"http://172.16.9.31:2003/api"'
});
