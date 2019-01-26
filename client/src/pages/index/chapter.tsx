import Taro, { Component, Config } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import { recentUpdate } from '../../api/book';
export default class Chapter extends Component {
	config: Config = {
		navigationBarTitleText: '章节目录'
	};
	state = {
		list: [],
		bookUrl: '' //最新章节解析需要书籍链接
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
			return await recentUpdate(url);
		} catch (error) {}
	}
	goDetail(url) {
		const { bookUrl } = this.state;
		Taro.navigateTo({ url: `/pages/index/detail?url=${bookUrl + url}` });
	}
	render() {
		const { list } = this.state;
		return (
			<View className="chapter">
				<ScrollView scrollY className="chapter-list">
					<AtList>
						{list.map((item: any, i) => (
							<AtListItem
								key={i}
								title={item.title}
								arrow="right"
								extraText="查看"
								onClick={this.goDetail.bind(this, item.url)}
							/>
						))}
					</AtList>
				</ScrollView>
			</View>
		);
	}
}
