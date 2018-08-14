import api from '../api'

const USER_INFO = () => {
  return JSON.parse(localStorage.getItem('userInfo'))
}
const SET_USER_INFO = (userInfo) => {
  localStorage.setItem('userInfo', (typeof userInfo) === 'string' ? userInfo : JSON.stringify(userInfo))
}
const REMOVE_USER_INFO = () => {
  localStorage.removeItem('userInfo')
}

const LOGIN_INFO = () => {
  return JSON.parse(localStorage.getItem('loginInfo'))
}
const SET_LOGIN_INFO = (loginInfo) => {
  localStorage.setItem('loginInfo', (typeof loginInfo) === 'string' ? loginInfo : JSON.stringify(loginInfo))
}
const REMOVE_LOGIN_INFO = () => {
  localStorage.removeItem('loginInfo')
}

const CURRENT_GOTO = () => {
  return localStorage.getItem('currentGoTo')
}
const SET_CURRENT_GOTO = (url) => {
  localStorage.setItem('currentGoTo', url)
}
const REMOVE_CURRENT_GOTO = () => {
  localStorage.removeItem('currentGoTo')
}

export default {
  user: {
    USER_INFO: USER_INFO,
    SET_USER_INFO: SET_USER_INFO,
    REMOVE_USER_INFO: REMOVE_USER_INFO
  },
  login: {
    LOGIN_INFO: LOGIN_INFO,
    SET_LOGIN_INFO: SET_LOGIN_INFO,
    REMOVE_LOGIN_INFO: REMOVE_LOGIN_INFO
  },
  goto: {
    CURRENT_GOTO: CURRENT_GOTO,
    SET_CURRENT_GOTO: SET_CURRENT_GOTO,
    REMOVE_CURRENT_GOTO: REMOVE_CURRENT_GOTO
  },
  COUNT_OUT: 10
}
