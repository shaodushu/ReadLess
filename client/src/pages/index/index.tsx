import Taro, { Component, Config } from '@tarojs/taro';
import { View, ScrollView, Button } from '@tarojs/components';
import { AtSearchBar, AtList, AtListItem, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';

import './index.scss';
import { search } from '../../api/book';
import { authorization } from '../../api/user';
import { set as setGlobalData, get as getGlobalData } from '../../store/global_data';
import checkAuth from '../../decorator/checkAuth';

@checkAuth('willMount')
export default class Index extends Component {
	/**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
	config: Config = {
		navigationBarTitleText: '首页'
	};
	state = {
		title: '',
		list: [],
		isOpened: false
	};
	componentWillMount() {
		if (!getGlobalData('isAuth')) {
			this.setState({
				isOpened: true
			});
		}
	}

	componentDidMount() {}

	componentWillUnmount() {}

	componentDidShow() {}

	componentDidHide() {}
	onChange(title) {
		this.setState({
			title
		});
	}
	async startSearch() {
		try {
			const { title } = this.state;
			Taro.showLoading({
				title: '加载中...'
			});
			const list = await search(title);
			Taro.hideLoading();
			this.setState({
				list
			});
		} catch (error) {
			Taro.hideLoading();
		}
	}
	goChapter(url) {
		Taro.navigateTo({ url: '/pages/index/chapter?url=' + url });
	}
	async getUserinfo(e) {
		try {
			if (e.detail.errMsg === 'getUserInfo:ok') {
				Taro.showLoading({
					title: '授权中...'
				});
				const userinfo = await authorization(e.detail.userInfo);
				Taro.hideLoading();
				setGlobalData('userinfo', userinfo);
				setGlobalData('isLogin', true);
				this.setState({
					isOpened: false
				});
			} else {
				Taro.showModal({
					title: '提示',
					content: '微信授权为微信官方提供,不会记录您的任何隐私信息',
					showCancel: false
				});
			}
		} catch (error) {}
	}
	render() {
		const { title, list, isOpened } = this.state;
		return (
			<View className="index">
				<AtSearchBar
					value={title}
					onChange={this.onChange.bind(this)}
					onActionClick={this.startSearch.bind(this)}
					onConfirm={this.startSearch.bind(this)}
				/>
				<ScrollView scrollY className="book-list">
					<AtList>
						{list.map((item: any, i) => (
							<AtListItem
								key={i}
								title={item.title}
								arrow="right"
								onClick={this.goChapter.bind(this, item.url)}
							/>
						))}
					</AtList>
				</ScrollView>
				<AtModal isOpened={isOpened}>
					<AtModalHeader>ReadLess</AtModalHeader>
					<AtModalContent>
						<View className="at-article">
							<View className="at-article__h3">该程序获得以下授权：</View>
							<View className="at-article__info">获取你的公开信息（昵称和头像等），以便你的更好的服务</View>
						</View>
					</AtModalContent>
					<AtModalAction>
						<Button openType="getUserInfo" onGetUserInfo={this.getUserinfo.bind(this)}>
							授权
						</Button>
					</AtModalAction>
				</AtModal>
			</View>
		);
	}
}
