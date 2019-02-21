import Taro, { Component, Config } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtList, AtListItem, AtTabs, AtTabsPane } from 'taro-ui';
import { connect } from '@tarojs/redux';

import * as actions from '../../actions/book';
import { dispatchRecordLog } from '../../actions/user';
import './chapter.scss';

@connect((state) => state.book, {
	...actions,
	dispatchRecordLog
})
export default class Chapter extends Component {
	config: Config = {
		navigationBarTitleText: '章节目录'
	};
	state = {
		bookUrl: '', //最新章节解析需要书籍链接
		current: 0
	};
	async componentWillMount() {
		Taro.showLoading({
			title: '加载中...'
		});
		const { dispatchRecentUpdate } = this.props,
			{ url } = this.$router.params;
		try {
			await dispatchRecentUpdate({
				url
			});
			Taro.hideLoading();
			this.setState({
				bookUrl: url
			});
		} catch (error) {
			Taro.hideLoading();
		}
	}
	goDetail(url, title) {
		const { bookUrl } = this.state,
			{ dispatchRecordLog } = this.props;
		Taro.navigateTo({ url: `/pages/index/detail?url=${bookUrl + url}` });
		//增加阅读记录
		dispatchRecordLog({
			url: bookUrl + url,
			title
		});
	}
	async handleClick(value) {
		const { bookUrl } = this.state,
			{ allChapter, dispatchAllChapter } = this.props;
		if (value === 1 && allChapter.length === 0) {
			try {
				Taro.showLoading({
					title: '加载中...'
				});
				await dispatchAllChapter({
					url: bookUrl
				});
				Taro.hideLoading();
			} catch (error) {
				Taro.hideLoading();
			}
		}
		this.setState({
			current: value
		});
	}
	render() {
		const { current } = this.state,
			tabList = [ { title: '最新章节' }, { title: '全部章节' } ],
			{ recentChapter, allChapter } = this.props,
			list = [ recentChapter, allChapter ];
		return (
			<View className="chapter">
				<AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
					{list.map((item: any[], i) => (
						<AtTabsPane current={current} index={i} key={i}>
							<ScrollView scrollY className="chapter-list">
								<AtList>
									{item.map((item: any, j) => (
										<AtListItem
											key={j}
											title={item.title}
											arrow="right"
											onClick={this.goDetail.bind(this, item.url, item.title)}
										/>
									))}
								</AtList>
							</ScrollView>
						</AtTabsPane>
					))}
				</AtTabs>
			</View>
		);
	}
}
