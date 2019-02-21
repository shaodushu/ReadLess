import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtAvatar } from 'taro-ui';
import { connect } from '@tarojs/redux';

import './mine.scss';
import * as actions from '../../actions/user';

@connect((state) => state.user, actions)
export default class Mine extends Component {
	config: Config = {
		navigationBarTitleText: '记录',
		enablePullDownRefresh: true,
		navigationBarBackgroundColor: '#00adb5',
		navigationBarTextStyle: 'white',
		backgroundColor: '#333333',
		backgroundTextStyle: 'light'
	};
	state = {
		// userinfo: {
		// 	avatarUrl: 'https://jdc.jd.com/img/200',
		// 	nickName: 'RD',
		// 	city: 'Chengdu',
		// 	readLog: []
		// }
	};
	componentDidShow() {}
	onPullDownRefresh() {
		const { dispatchUserInfo } = this.props;
		dispatchUserInfo();
		Taro.stopPullDownRefresh();
	}
	goDetail(item) {
		Taro.navigateTo({ url: `/pages/index/detail?url=${item.url}` });
	}
	render() {
		const { userInfo } = this.props;
		return (
			<View className="mine">
				<View className="header">
					<View className="mine-desc">
						<AtAvatar image={userInfo.avatarUrl} className="avator" />
						<View className="mine-info">
							<View className="mine-info_name">{userInfo.nickName}</View>
							<View className="mine-info_address">
								<Text>{'City:' + userInfo.city}</Text>
							</View>
						</View>
					</View>
				</View>
				<View className="log-list">
					{userInfo.readLog.map((item: any, i) => (
						<View className="log-item" key={i} onClick={this.goDetail.bind(this, item)}>
							<Text>{item.title}</Text>
							<View className="at-icon at-icon-chevron-right" />
						</View>
					))}
				</View>
			</View>
		);
	}
}
