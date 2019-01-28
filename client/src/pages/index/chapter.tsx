import Taro, { Component, Config } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtList, AtListItem, AtTabs, AtTabsPane } from 'taro-ui';
import { recentUpdate, allChapter } from '../../api/book';

import './chapter.scss';
export default class Chapter extends Component {
	config: Config = {
		navigationBarTitleText: '章节目录'
	};
	state = {
		bookUrl: '', //最新章节解析需要书籍链接
		current: 1,
		list: []
	};
	componentWillMount() {
		this.$preloadData.then((list) => {
			this.setState({
				list
			});
		});
	}
	componentWillPreload(params) {
		this.setState({
			bookUrl: params.url
		});
		return this.getChapterList(params.url);
	}
	async getChapterList(url) {
		try {
			return [ await recentUpdate(url), await allChapter(url) ];
		} catch (error) {}
	}
	goDetail(url) {
		const { bookUrl } = this.state;
		Taro.navigateTo({ url: `/pages/index/detail?url=${bookUrl + url}` });
	}
	handleClick(value) {
		this.setState({
			current: value
		});
	}
	render() {
		const { list, current } = this.state,
			tabList = [ { title: '最新章节' }, { title: '全部章节' } ];
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
											onClick={this.goDetail.bind(this, item.url)}
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
