import Taro from '@tarojs/taro';
import {
  connect
} from '@tarojs/redux'

import * as actions from '../actions/user'

const LIFE_CYCLE_MAP = ['willMount', 'didMount', 'didShow'];
/**
 * @description 检查登录状态
 * @param {string} [lifecycle='willMount']
 * @returns 包装后的Component
 */

function checkAuth(lifecycle = 'willMount') {
  // 异常规避提醒
  if (LIFE_CYCLE_MAP.indexOf(lifecycle) < 0) {
    console.warn(`传入的生命周期不存在, 鉴权判断异常 ===========> $_{lifecycle}`);
    return (Component) => Component;
  }

  const autoLogin = async (options) => {
    const setting = await Taro.getSetting(),
      {
        userinfo,
        dispatchUserInfo,
        dispatchAuth
      } = options;
    if (setting.authSetting['scope.userInfo']) {
      console.log('%c 用户已授权', 'color:#19be6b');
      dispatchAuth(true)
      if (userinfo) {
        const checkSession = await Taro.checkSession();
        if (checkSession.errMsg === 'checkSession:ok') {
          console.log('用户登录');
        } else {
          console.warn('session_key失效');
          dispatchUserInfo();
          console.log('%c 重新获取到用户信息', 'color:#19be6b');
        }
      } else {
        dispatchUserInfo();
        console.log('%c 重新获取到用户信息', 'color:#19be6b');
      }
    } else {
      console.warn('用户未授权');
      dispatchAuth(false)
    }
  };
  return (Component) => {
    @connect(state => state.user, actions)
    class checkAuthComponent extends Component {
      async componentWillMount() {
        if (super.componentWillMount) {
          if (lifecycle === LIFE_CYCLE_MAP[0]) {
            await autoLogin(this.props);
          }
          super.componentWillMount();
        }
      }
      render() {
        return super.render();
      }
    }
    return checkAuthComponent;
  };
}
export default checkAuth;
