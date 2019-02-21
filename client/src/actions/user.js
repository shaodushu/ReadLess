import {
  USER_INFO,
  USER_AUTH,
  USER_LOGIN,
  USER_RECORD_LOG
} from '../constants/user'
import {
  API_USER_INFO,
  API_USER_LOGIN,
  API_USER_RECORD_LOG
} from '../constants/api'
import {
  createAction
} from '../libs/redux'

const TARGET_CLOUD_FUNCTION = 'user'

/**
 * 设置授权状态
 * @param {*} payload 
 */
export const dispatchAuth = (payload) => createAction({
  type: USER_AUTH,
  payload
})
/**
 * 获取RD用户信息
 * @param {*} payload
 */
export const dispatchUserInfo = payload => createAction({
  name: TARGET_CLOUD_FUNCTION,
  url: API_USER_INFO,
  type: USER_INFO,
  payload
})

/**
 * 登录
 * @param {*} payload
 */
export const dispatchLogin = payload => createAction({
  name: TARGET_CLOUD_FUNCTION,
  url: API_USER_LOGIN,
  type: USER_LOGIN,
  payload
})

/**
 * 阅读记录
 * @param {*} payload
 */
export const dispatchRecordLog = payload => createAction({
  name: TARGET_CLOUD_FUNCTION,
  url: API_USER_RECORD_LOG,
  type: USER_RECORD_LOG,
  payload
})
