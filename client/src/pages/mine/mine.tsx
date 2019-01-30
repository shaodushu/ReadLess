import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtAvatar } from 'taro-ui';

export default class Mine extends Component {
	config: Config = {
		navigationBarTitleText: '记录'
	};
	render() {
		return (
			<View>
				<AtAvatar image="https://jdc.jd.com/img/200" />
			</View>
		);
	}
}
