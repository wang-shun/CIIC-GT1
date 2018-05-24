/**
 * Created by huangye on 2018/5/18.
 */
const API = {
  login: `${process.env.COMMON_SERVICE}/login`,
  logout: `${process.env.COMMON_SERVICE}/logout`,
  getUserInfoByToken: `${process.env.COMMON_SERVICE}/getUserInfoByToken`,
  getPlatformAuth: `${process.env.SYSTEM_MANAGE_API_SERVICE}/authservice/auth/getPlatformAuth`
};

export default API
