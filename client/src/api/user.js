import fly from '../libs/fly'

const db = wx.cloud.database()
const USER = db.collection('user')
/**
 * 用户注册
 * @param {Object} userinfo 
 */
export const register = (userinfo) => {
  USER.add({
    data: userinfo,
    success(res) {
      console.log(res)
    },
    fail(err){
        console.log(err)
    }
  })
  return fly('user', 'register', {
    userinfo
  })
}
/**
 * 用户登录
 * @param {*} title 
 */
export const login = (title) => {
  return fly('user', 'login', {
    title
  })
}
