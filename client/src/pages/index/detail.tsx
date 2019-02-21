import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import * as actions from '../../actions/book';
import { dispatchRecordLog } from '../../actions/user';

import './detail.scss';
interface IState {}
@connect((state) => state.book, {
	...actions,
	dispatchRecordLog
})
export default class Detail extends Component<{}, IState> {
	config: Config = {
		navigationBarTitleText: '详情'
	};
	state = {};
	async componentWillMount() {
		Taro.showLoading({
			title: '加载中...'
		});
		const { dispatchDetail } = this.props,
			{ url } = this.$router.params;
		try {
			await dispatchDetail({
				url
			});
			Taro.hideLoading();
		} catch (error) {
			Taro.hideLoading();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.book.title) {
			Taro.setNavigationBarTitle({
				title: nextProps.book.title
			});
		}
	}
	async onReachBottom() {
		//TODO 翻页简单处理，只针对全部章节,暂时不能获取小说章节标题,暂时不能解决页面文字过多
		let page,
			result,
			{ book, dispatchDetail,dispatchRecordLog } = this.props,
			{ url } = book;
		if (url) {
			page = url.match('[^/]+(?!.*/)')[0].split('.')[0];
			url = url.replace(page, (parseInt(page) + 1).toString());
			Taro.showLoading({
				title: '加载中...'
			});
			try {
				result = await dispatchDetail({
					url
				});
				Taro.hideLoading();
			} catch (error) {
				Taro.hideLoading();
			}
			//增加阅读记录
			dispatchRecordLog({
				url,
				title: result.title
			});
		}
	}
	render() {
		const { book } = this.props;
		return (
			<View className="at-article">
				<View className="at-article__content">
					<View className="at-article__section">
						{book.content.map((item, i) => (
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
