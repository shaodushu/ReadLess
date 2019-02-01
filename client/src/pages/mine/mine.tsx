import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtAvatar } from 'taro-ui';
import { set as setGlobalData, get as getGlobalData } from '../../store/global_data';
import { getUserInfo } from '../../api/user';
import './mine.scss';

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
		userinfo: {
			avatarUrl: 'https://jdc.jd.com/img/200',
			nickName: 'RD',
			city: 'Chengdu',
			readLog: []
		}
	};
	componentDidShow() {
		this.setState({
			userinfo: getGlobalData('userinfo')
		});
	}
	async onPullDownRefresh() {
		try {
			const userinfo = await getUserInfo();
			Taro.stopPullDownRefresh();
			setGlobalData('userinfo', userinfo);
			this.setState({
				userinfo
			});
		} catch (error) {}
	}
	goDetail(item) {
		Taro.navigateTo({ url: `/pages/index/detail?url=${item.url}` });
	}
	render() {
		const { userinfo } = this.state;
		return (
			<View className="mine">
				<View className="header">
					<View className="mine-desc">
						<AtAvatar image={userinfo.avatarUrl} className="avator" />
						<View className="mine-info">
							<View className="mine-info_name">{userinfo.nickName}</View>
							<View className="mine-info_address">
								<Text>{'City:' + userinfo.city}</Text>
							</View>
						</View>
					</View>
				</View>
				<View className="log-list">
					{userinfo.readLog.map((item: any, i) => (
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
