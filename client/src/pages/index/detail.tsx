import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { detail } from '../../api/book';
import { recordLog } from '../../api/user';

import './detail.scss';
interface IState {
	url: string;
	content: any[];
}
export default class Detail extends Component<{}, IState> {
	config: Config = {
		navigationBarTitleText: '详情'
	};
	state = {
		url: '',
		content: []
	};
	componentWillMount() {
		Taro.showLoading({
			title: '加载中...'
		});
		this.$preloadData
			.then((res) => {
				let { title, content, url } = res;
				// console.log(title);
				title = title.split(' ');
				Taro.setNavigationBarTitle({
					title: title[title.length - 1]
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
		let result = await detail(params.url);
		return {
			url: params.url,
			title: result.title,
			content: result.content
		};
	}
	async onReachBottom() {
		//TODO 翻页简单处理，只针对全部章节,暂时不能获取小说章节标题,暂时不能解决页面文字过多
		let { url, content } = this.state,
			page,
			result,
			title;
		if (url) {
			page = url.match('[^/]+(?!.*/)')[0].split('.')[0];
			url = url.replace(page, (parseInt(page) + 1).toString());
			Taro.showLoading({
				title: '加载中...'
			});
			result = await detail(url);
			title = result.title.split(' ');
			Taro.hideLoading();
			Taro.setNavigationBarTitle({
				title: title[title.length - 1]
			});
			this.setState({
				content: content.concat(result.content)
			});
			//增加阅读记录
			recordLog(url, result.title);
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
