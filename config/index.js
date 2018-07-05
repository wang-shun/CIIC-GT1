'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

let buildArgs = process.argv.slice(2);
let env;
if (buildArgs && buildArgs.length > 0) {
  switch (buildArgs[0]) {
    case 'dev':
      env = require('./dev.env');
      env.env = '"dev"';
      break;
    case 'lpt':
      env = require('./lpt.env');
      env.env = '"lpt"';
      break;
    case 'sit':
      env = require('./sit.env');
      env.env = '"sit"';
      break;
    case 'uat':
      env = require('./uat.env');
      env.env = '"uat"';
      break;
    default:
      env = require('./prod.env');
      env.env = '"prod"';
      break;
  }
} else {
  env = require('./dev.env');
  env.env = '"dev"';
}

module.exports = {
  build: {
    env: env,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8070,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        loglevel: 'debug',
        pathRewrite: {
          '^/api': '',
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
