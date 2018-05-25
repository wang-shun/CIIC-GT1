/**
 * Created by huangye on 2018/5/24.
 */
'use strict';

const COMMON_SERVICE_HOST = process.env.COMMON_SERVICE;
const SYSTEM_MANAGE_API_SERVICE_HOST = process.env.SYSTEM_MANAGE_API_SERVICE;

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
   * 获取用户可访问中心的权限
   */
  getPlatformAuth: SYSTEM_MANAGE_API_SERVICE_HOST + '/authservice/auth/getPlatformAuth',
}
