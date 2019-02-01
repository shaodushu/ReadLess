import Taro, { Component, Config } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtList, AtListItem, AtTabs, AtTabsPane } from 'taro-ui';
import { recentUpdate, allChapter } from '../../api/book';
import { recordLog } from '../../api/user';
import './chapter.scss';
export default class Chapter extends Component {
	config: Config = {
		navigationBarTitleText: '章节目录'
	};
	state = {
		bookUrl: '', //最新章节解析需要书籍链接
		current: 0,
		recentList: [],
		allList: []
	};
	componentWillMount() {
		Taro.showLoading({
			title: '加载中...'
		});
		this.$preloadData
			.then((recentList) => {
				Taro.hideLoading();
				this.setState({
					recentList
				});
			})
			.catch(() => {
				Taro.hideLoading();
			});
	}
	async componentWillPreload(params) {
		this.setState({
			bookUrl: params.url
		});
		return await recentUpdate(params.url);
	}
	goDetail(url, title) {
		const { bookUrl } = this.state;
		Taro.navigateTo({ url: `/pages/index/detail?url=${bookUrl + url}` });
		//增加阅读记录
		recordLog(bookUrl + url, title);
	}
	async handleClick(value) {
		const { allList, bookUrl } = this.state;
		if (value === 1 && allList.length === 0) {
			try {
				Taro.showLoading({
					title: '加载中...'
				});
				let list = await allChapter(bookUrl);
				Taro.hideLoading();
				this.setState({
					allList: list
				});
			} catch (error) {
				Taro.hideLoading();
			}
		}
		this.setState({
			current: value
		});
	}
	render() {
		const { recentList, allList, current } = this.state,
			tabList = [ { title: '最新章节' }, { title: '全部章节' } ],
			list = [ recentList, allList ];
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
