import { connect } from "dva";
import { TagSelect } from "ant-design-pro";
import { Card, Row, Col, Skeleton, Icon } from "antd";
import styles from './index.css';

import React, { Component } from 'react';
@connect(
	(state) => {
		return {
			courses: state.goods.courses,
			tags: state.goods.tags,
		}
	},
	{
		getList: () => ({
			type: "goods/getList"
		}),
		addCart: payload => ({
			type: "cart/addCart",
			payload
		})
	})
class Goods extends Component {
	constructor(props) {
		super(props);
		// displayCourses为需要显示的商品数组
		this.state = {
			displayCourses: new Array(8).fill({}), // 填充数组用于骨架屏展示
		};
	}
	componentWillReceiveProps(props) {
		if (props.tags.length) {
			this.tagSelectChange(props.tags, props.courses);
		}
	}
	addCart = (e, item) => {
		e.stopPropagation();
		console.log(item)
		this.props.addCart(item);
	};
	// 页签变更
	tagSelectChange = (tags, courses = this.props.courses) => {
		//console.log(tags);
		//console.log(courses)
		// ['js','react']
		// [[{}],[{}]]
		// [{},{}]
		const displayCourses = tags.flatMap(tag => courses[tag]);
		//console.log(displayCourses);

		this.setState({ displayCourses });
	};
	componentDidMount() {
		this.props.getList();
	}
	render() {
		return (
			<div className={styles.normal}>
				{/* 分类标签 */}
				<TagSelect onChange={this.tagSelectChange}>
					{this.props.tags.map(tag => {
						return (
							<TagSelect.Option key={tag} value={tag}>
								{tag}
							</TagSelect.Option>
						);
					})}
				</TagSelect>

				{/* 商品列表 */}
				<Row type="flex" justify="start">
					{this.state.displayCourses.map((item, index) => {
						return (
							<Col key={index} style={{ padding: 10 }} span={6}>
								{item.name ? (
									<Card
										hoverable
										title={item.name}
										cover={<img src={"/course/" + item.img} />}
										extra={
											<Icon
												onClick={e => this.addCart(e, item)}
												type="shopping-cart"
												style={{ fontSize: 18 }}
											/>
										}
									>
										<Card.Meta
											description={
												<div>
													<span>￥{item.price}</span>
													<span style={{ float: "right" }}>
														<Icon type="user" /> {item.solded}
													</span>
												</div>
											}
										/>
										<div />
									</Card>
								) : (
										<Skeleton active={true} />
									)}
							</Col>
						);
					})}
				</Row>
			</div>
		);
	}
}

export default Goods;
