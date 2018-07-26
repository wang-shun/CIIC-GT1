'use strict';

import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
  let userInfo = sessionStorage && sessionStorage.getItem('userInfo');
  config.headers = {
    'token': JSON.parse(userInfo || '{}').token
  };
  return config;
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.resolve(error.response);
});

function checkStatus (response, _this) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response;
  } else if (response && response.status === 401) {
    let msg = '登录超时，请刷新页面';
    _this.$Message.error(msg);
    throw new Error(msg);
  } else {
    let msg = '服务器异常';
    _this.$Message.error(msg);
    throw new Error(msg);
  }
}

function checkCode (res, _this) {
  if (res.data && (res.data.code !== 0)) {
    let msg = res.data.message;
    _this.$Message.error(msg);
  }
  return res;
}

export default {
  _this: null,
  post (url, data) {
    return axios({
      method: 'post',
      url: url,
      data: data,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => {
      return checkStatus(response, this._this);
    }).then(res => {
      return checkCode(res, this._this);
    });
  },
  put (url, data) {
    return axios({
      method: 'put',
      url: url,
      data: data,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => {
      return checkStatus(response, this._this);
    }).then(res => {
      return checkCode(res, this._this);
    });
  },
  postForm (url, data) {
    return axios({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(response => {
      return checkStatus(response, this._this);
    }).then(res => {
      return checkCode(res, this._this);
    });
  },
  delete (url, params) {
    return axios({
      method: 'delete',
      url: url,
      params, // get 请求时带的参数
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => {
      return checkStatus(response, this._this);
    }).then(res => {
      return checkCode(res, this._this);
    });
  },
  get (url, params) {
    return axios({
      method: 'get',
      url: url,
      params, // get 请求时带的参数
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => {
      return checkStatus(response, this._this);
    }).then(res => {
      return checkCode(res, this._this);
    });
  }
}
