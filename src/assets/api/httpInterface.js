/**
 * Created by huangye on 2018/5/24.
 */
'use strict';

const COMMON_SERVICE_HOST = process.env.COMMON_SERVICE
const ALERT_SERVICE_HOST = process.env.ALERT_SERVICE
const SYSTEM_MANAGE_API_SERVICE_HOST = process.env.SYSTEM_MANAGE_API_SERVICE

export default {
  /**
   * 登录
   */
  login: COMMON_SERVICE_HOST + '/login',
  /**
   * 登出
   */
  logout: COMMON_SERVICE_HOST + '/logout',
  /**
   * 根据token获取用户
   */
  getUserInfoByToken: COMMON_SERVICE_HOST + '/getUserInfoByToken',
  /**
   * 修改密码
   */
  resetPassword: COMMON_SERVICE_HOST + '/resetPassword',
  /**
   * 获取用户可访问中心的权限
   */
  getPlatformAuth: SYSTEM_MANAGE_API_SERVICE_HOST + '/authservice/auth/getPlatformAuth',
  /**
   * 预警结果计数
   */
  countResult: ALERT_SERVICE_HOST + '/alert/countResult',
  /**
   * 预警结果列表
   */
  listResult: ALERT_SERVICE_HOST + '/alert/listResult',
  /**
   * 预警结果详情
   */
  resultDetail: ALERT_SERVICE_HOST + '/alert/getResultDetail',
  /**
   * 预警标记已读
   */
  markAsRead: ALERT_SERVICE_HOST + '/alert/markAsRead',
  /**
   * 结果页动态展示字段
   */
  listAllTypeAndConfig: ALERT_SERVICE_HOST + '/alert/listAllTypeAndConfig',
  /**
   * 立即执行预警
   */
  run: ALERT_SERVICE_HOST + '/alert/run'
}
