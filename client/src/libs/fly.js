import Taro from '@tarojs/taro';
/**
 * 封装云服务接口
 * @param {*} name 云函数名
 * @param {*} url 请求功能
 * @param {*} payload 请求参数
 */
const fly = (name, url, payload = {}) => {
  return new Promise((resolve, reject) => {
    if (!payload) {
      payload = {}
    }
    wx.cloud
      .callFunction({
        name: name,
        data: {
          $url: url,
          ...payload
        }
      })
      .then((res) => {
        resolve(res.result.data);
      })
      .catch(err => {
        Taro.showToast({
          title: err.result ? err.result.msg : 'error',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        reject(err)
      });
  })
}
export default fly
