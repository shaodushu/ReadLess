import Taro, { Component, Config } from '@tarojs/taro';
import { View, ScrollView, Button } from '@tarojs/components';
import { AtSearchBar, AtList, AtListItem, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';
import { connect } from '@tarojs/redux';

import * as actions from '../../actions/user';
import { dispatchSearch } from '../../actions/book';
import './index.scss';
import checkAuth from '../../decorator/checkAuth';

interface Props {
	auth: boolean;
}

@checkAuth('willMount')
@connect((state) => (state.user, state.book), {
	...actions,
	dispatchSearch
})
export default class Index extends Component<Props, {}> {
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
		title: ''
	};
	componentWillMount() {}

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
			const { title } = this.state,
				{ dispatchSearch } = this.props;
			Taro.showLoading({
				title: '加载中...'
			});
			await dispatchSearch({
				title
			});
			Taro.hideLoading();
		} catch (error) {
			Taro.hideLoading();
		}
	}
	goChapter(url) {
		Taro.navigateTo({ url: '/pages/index/chapter?url=' + url });
	}
	async getUserinfo(e) {
		const { userInfo, errMsg } = e.detail,
			{ dispatchLogin, dispatchAuth } = this.props;
		try {
			if (errMsg === 'getUserInfo:ok') {
				Taro.showLoading({
					title: '授权中...'
				});
				await dispatchLogin({
					userinfo: userInfo
				});
				Taro.hideLoading();
				dispatchAuth(true);
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
		const { title } = this.state,
			{ auth, bookList } = this.props;
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
						{bookList.map((item: any, i) => (
							<AtListItem
								key={i}
								title={item.title}
								arrow="right"
								onClick={this.goChapter.bind(this, item.url)}
							/>
						))}
					</AtList>
				</ScrollView>
				<AtModal isOpened={!auth}>
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
