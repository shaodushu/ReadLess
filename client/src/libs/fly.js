import Taro from '@tarojs/taro';
/**
 * 封装云服务接口
 * @param {*} name 云函数名
 * @param {*} url 请求功能
 * @param {*} data 请求参数
 */
const fly = (name, url, data = {}) => {
  return new Promise((resolve, reject) => {
    Taro.showLoading({
      title: '加载中...'
    })
    wx.cloud
      .callFunction({
        name: name,
        data: {
          $url: url,
          ...data
        }
      })
      .then((res) => {
        Taro.hideLoading()
        console.log(res)
        Taro.showToast({
          title: res.result.msg,
          icon: 'none',
          mask: true,
          duration: 1500
        })
        resolve(res.result.data);
      })
      .catch(err => {
        console.log(err)
        Taro.hideLoading()
        Taro.showToast({
          title: err.result.msg,
          icon: 'none',
          mask: true,
          duration: 1500
        })
        reject(err)
      });
  })
}
export default fly
