import Taro from '@tarojs/taro';
import { set as setGlobalData, get as getGlobalData } from '../store/global_data';
import { getUserInfo } from '../api/user';

const LIFE_CYCLE_MAP = [ 'willMount', 'didMount', 'didShow' ];
/**
 * @description 检查登录状态
 * @param {string} [lifecycle='willMount']
 * @returns 包装后的Component
 */
function checkAuth(lifecycle: string = 'willMount') {
	// 异常规避提醒
	if (LIFE_CYCLE_MAP.indexOf(lifecycle) < 0) {
		console.warn(`传入的生命周期不存在, 鉴权判断异常 ===========> $_{lifecycle}`);
		return (Component) => Component;
	}
	const autoLogin: any = async () => {
		const setting = await Taro.getSetting();

		if (setting.authSetting['scope.userInfo']) {
			console.log('%c 用户已授权', 'color:#19be6b');
			setGlobalData('isAuth', true);
			const userinfo = getGlobalData('userinfo');
			if (userinfo) {
				const checkSession = await Taro.checkSession();
				if (checkSession.errMsg === 'checkSession:ok') {
					console.log('用户登录');
				} else {
					console.warn('session_key失效');
					const user = await getUserInfo();
					console.log('%c 重新获取到用户信息', 'color:#19be6b');
					setGlobalData('userinfo', user);
				}
			} else {
				const user = await getUserInfo();
				console.log('%c 重新获取到用户信息', 'color:#19be6b');
				setGlobalData('userinfo', user);
			}
		} else {
			console.warn('用户未授权');
			setGlobalData('isAuth', false);
		}
	};
	return (Component) => {
		class checkAuth extends Component {
			async componentWillMount() {
				if (super.componentWillMount) {
					if (lifecycle === LIFE_CYCLE_MAP[0]) {
						await autoLogin(this.props.dispatch);
					}

					super.componentWillMount();
				}
			}
			render() {
				return super.render();
			}
		}
		return checkAuth;
	};
}
export default checkAuth;
