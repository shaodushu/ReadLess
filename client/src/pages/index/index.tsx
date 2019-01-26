import Taro, { Component, Config } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtSearchBar, AtList, AtListItem } from 'taro-ui';

import './index.scss';
import { search } from '../../api/book';

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
		list: []
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
	render() {
		const { title, list } = this.state;
		return (
			<View className="index">
				<AtSearchBar
					value={title}
					onChange={this.onChange.bind(this)}
					onActionClick={this.startSearch.bind(this)}
				/>
				<ScrollView scrollY className="book-list">
					<AtList>
						{list.map((item: any, i) => (
							<AtListItem
								key={i}
								title={item.title}
								arrow="right"
								extraText="最新章节"
								onClick={this.goChapter.bind(this, item.url)}
							/>
						))}
					</AtList>
				</ScrollView>
			</View>
		);
	}
}
