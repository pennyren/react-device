import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from 'store';
import styles from './styles.css';

class Approval extends Component {
	componentDidMount() {
		store.dispatch({type: 'GET_APPROVALS_ASYNC'}); 
	}

	componentWillUnmount() {
		store.dispatch({type: 'CLEAR_APPROVALS'}); 
	}

	render() {
		const {list} = this.props;
		const applyType = ['购买', '领用', '退还', '维修', '维护'];
		const userId = 1;
		const items = list.map((approval, index) => {
			const {username, type, name, version, number, ctime, currentApprovalUserId} = approval;
			const typeIndex = applyType.indexOf(type);
			const displayEquip = typeIndex == 0 ? '新设备' : `${name} ${version}`;
			const content = `${username}申请了${type} ${displayEquip}`
			const icon = userId == currentApprovalUserId ? 'mdi-pen' : 'mdi-success'
			return (
				<li className="item" key={index} data-id={approval.id}>
				<i className={'mdi ' + icon}/>
					<span className="content">{content}</span>
					<span className="time">{ctime}</span>
				</li>
			)
		})
		return (
			<div className="approval">
				<h2 className="title">审批</h2>
				<ul className="list">
					{items}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = function(store) {
	return {
		list: store.approvals.list
	}
}

export default connect(mapStateToProps)(Approval);