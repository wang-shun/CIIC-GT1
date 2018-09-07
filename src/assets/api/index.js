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
    const response = await Http.post(Interface.login, params)
    return await response.data
  },
  /**
   * 登出
   */
  logout: async (params) => {
    const response = await Http.post(Interface.logout, params)
    return await response.data
  },
  /**
   * 根据token获取用户
   */
  getUserInfoByToken: async (params) => {
    const response = await Http.post(Interface.getUserInfoByToken, params)
    return await response.data
  },
  /**
   * 修改密码
   */
  resetPassword: async (params) => {
    const response = await Http.post(Interface.resetPassword, params)
    return await response.data
  },
  /**
   * 获取用户可访问中心的权限
   */
  getPlatformAuth: async (params) => {
    const response = await Http.get(`${Interface.getPlatformAuth}/${params}`)
    return await response.data
  },
  /**
   * 预警数量
   */
  getCountResult: async(params) => {
    const response = await Http.post(Interface.countResult, params)
    return await response.data
  },
  /**
   * 预警结果列表
   */
  getListResult: async(params) => {
    const response = await Http.post(Interface.listResult, params)
    return await response.data
  },
  /**
   * 预警结果详情
   */
  getResultDetail: async(params) => {
    const response = await Http.post(Interface.resultDetail, params)
    return await response.data
  },
  /**
   * 预警标记已读
   */
  markAsRead: async(params) => {
    const response = await Http.post(Interface.markAsRead, params)
    return await response.data
  },
  /**
   * 结果页动态展示字段
   */
  listAllTypeAndConfig: async(params) => {
    const response = await Http.post(Interface.listAllTypeAndConfig, params)
    return await response.data
  },
  /**
   * 立即执行预警
   */
  run: async(params) => {
    const response = await Http.post(Interface.run, params)
    return await response.data
  }
}
