import fly from '../libs/fly'

/**
 * 授权
 * @param {Object} userinfo 
 */
export const authorization = (userinfo) => {
  return fly('user', 'authorization', {
    userinfo
  })
}
/**
 * 获取RD用户信息
 */
export const getUserInfo = () => {
  return fly('user', 'getUserInfo')
}
/**
 * 阅读记录
 * @param {String} url 
 * @param {String} title 
 */
export const recordLog = (url, title) => {
  return fly('user', 'recordLog', {
    url,
    title
  })
}
