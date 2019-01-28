import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { detail } from '../../api/book';

import './detail.scss';
export default class Detail extends Component {
	config: Config = {
		navigationBarTitleText: '详情'
	};
	state = {
		content: []
	};
	componentWillMount() {
		Taro.showLoading({
			title: '加载中...'
		});
		this.$preloadData
			.then((content) => {
				Taro.hideLoading();
				this.setState({
					content
				});
			})
			.catch(() => {
				Taro.hideLoading();
			});
	}
	componentWillPreload(params) {
		return this.getDetail(params.url);
	}
	async getDetail(url) {
		try {
			return await detail(url);
		} catch (error) {}
	}
	render() {
		const { content } = this.state;
		return (
			<View className="at-article">
				{/* <View className="at-article__h1">这是一级标题这是一级标题</View>
				<View className="at-article__info">2017-05-07&nbsp;&nbsp;&nbsp;这是作者</View> */}
				<View className="at-article__content">
					<View className="at-article__section">
						{content.map((item, i) => (
							<View className="at-article__p" key={i}>
								{item}
							</View>
						))}
					</View>
				</View>
			</View>
		);
	}
}
