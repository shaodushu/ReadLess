import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { detail } from '../../api/book';

import './detail.scss';
interface IState {
	url: String | null;
	content: any[];
}
export default class Detail extends Component<{}, IState> {
	config: Config = {
		navigationBarTitleText: '详情'
	};
	state = {
		url: null,
		content: []
	};
	componentWillMount() {
		Taro.showLoading({
			title: '加载中...'
		});
		this.$preloadData
			.then((res) => {
				const { title, content, url } = res;
				console.log(url);
				Taro.setNavigationBarTitle({
					title
				});
				Taro.hideLoading();
				this.setState({
					content,
					url
				});
			})
			.catch(() => {
				Taro.hideLoading();
			});
	}
	async componentWillPreload(params) {
		return {
			title: params.title,
			url: params.url,
			content: await detail(params.url)
		};
	}
	async onReachBottom() {
		//TODO 翻页简单处理，只针对全部章节,暂时不能获取小说章节,暂时不能解决页面文字过多
		let { url, content } = this.state,
			page,
			list;
		if (url) {
			page = url.match('[^/]+(?!.*/)')[0].split('.')[0];
			url = url.replace(page, (parseInt(page) + 1).toString());
			Taro.showLoading({
				title: '加载中...'
			});
			list = await detail(url);
			Taro.hideLoading();
			this.setState({
				content: content.concat(list)
			});
		}
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
