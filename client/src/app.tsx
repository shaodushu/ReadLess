import Taro, { Component, Config } from '@tarojs/taro';
import '@tarojs/async-await';
import Index from './pages/index';
import './styles/base.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
	/**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
	config: Config = {
		pages: [ 'pages/index/index', 'pages/index/chapter', 'pages/index/detail', 'pages/mine/mine' ],
		cloud: true,
		window: {
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#fff',
			navigationBarTitleText: 'ReadLess',
			navigationBarTextStyle: 'black'
		},
		tabBar: {
			color: '#333',
			selectedColor: '#00adb5',
			list: [
				{
					pagePath: 'pages/index/index',
					text: '首页',
					iconPath: './asset/home.png',
					selectedIconPath: './asset/home-fill.png'
				},
				{
					pagePath: 'pages/mine/mine',
					text: '记录',
					iconPath: './asset/detail.png',
					selectedIconPath: './asset/detail-fill.png'
				}
			]
		}
	};

	componentDidMount() {
		if (!wx.cloud) {
			console.error('请使用 2.2.3 或以上的基础库以使用云能力');
		} else {
			wx.cloud.init({
				traceUser: true
			});
		}
	}

	componentDidShow() {}

	componentDidHide() {}

	componentDidCatchError() {}

	// 在 App 类中的 render() 函数没有实际作用
	// 请勿修改此函数
	render() {
		return <Index />;
	}
}

Taro.render(<App />, document.getElementById('app'));
