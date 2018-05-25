/**
 * Created by huangye on 2018/5/24.
 */
import Http from '../js/http'
import Interface from './httpInterface'

export default {
  /**
   * 登录
   */
  login: async (params) => {
    const response = await Http.post(Interface.login, params);
    return await response.data;
  },
  /**
   * 登出
   */
  logout: async (params) => {
    const response = await Http.post(Interface.logout, params);
    return await response.data;
  },
  /**
   * 根据token获取用户
   */
  getUserInfoByToken: async (params) => {
    const response = await Http.post(Interface.getUserInfoByToken, params);
    return await response.data;
  },
  /**
   * 获取用户可访问中心的权限
   */
  getPlatformAuth: async (params) => {
    const response = await Http.get(`${Interface.getPlatformAuth}/${params}`);
    return await response.data;
  }
}
