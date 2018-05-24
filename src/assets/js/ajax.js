/**
 * Created by huangye on 2018/5/18.
 */
import axios from 'axios'
import moment from 'moment'

const AJAX = (url, params, type, successCallback, errorCallback) => {
  axios({
    method: type,
    url: url,
    data: params,
  }).then(response => {
    if (response.data.code === 0) {
      console.info(LOG(url, response));
      successCallback(response);
    } else {
      console.error(LOG(url, response));
      if (errorCallback) {
        errorCallback();
      }
    }
  })
};

const LOG = (url, response) => {
  console.log(response);
  let logInfo = {
    timestamps: moment().format('YYYY-MM-DD hh:mm:ss'),
    ip: url,
    logType: response.data.code !== 0 ? 'ERROR' : 'INFO',
    number: '10000000',
    appType: 'Portal',
    message: response.data.code !== 0 ? response.data.message : JSON.stringify(response.data)
  };
  return `【${logInfo.timestamps}】【${logInfo.ip}】【${logInfo.logType}】【${logInfo.number}】【${logInfo.appType}】【${logInfo.message ? logInfo.message : ''}】`;
};

export default AJAX;
