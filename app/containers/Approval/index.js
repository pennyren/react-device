import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import FlatButton from 'components/FlatButton';
import cookie from 'utils/cookie';
import {closest} from 'utils/dom';
import {history} from 'routes';
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

	seeApproval = (e) => {
		const item = closest(e.currentTarget, '.item');
		const id = +item.getAttribute('data-id');
		history.push(`/approval/${id}`);
	}

	getOlder = (e) => {
		store.dispatch({type: 'GET_APPROVALS_ASYNC'}); 
	}

	refreshApprovals = (e) => {
		store.dispatch({type: 'REFRESH_APPROVALS_ASYNC'});
	}

	render() {
		const {list, hasOlder} = this.props;
		const applyType = ['购买', '领用', '退还', '维修', '维护'];
		const userId = +cookie.get('uid');
		const items = list.map((approval, index) => {
			const {username, type, name, version, number, ctime, currentApprovalUserId, currentStep} = approval;
			const typeIndex = applyType.indexOf(type);
			const displayEquip = typeIndex == 0 ? '新设备' : `${name} ${version}`;
			const content = `${username}申请了${type} ${displayEquip}`
			const icon = (userId == currentApprovalUserId && currentStep != -1) ? 'mdi-pen' : 'mdi-success'
			return (
				<li className="item" key={index} data-id={approval.id}>
					<i className={'mdi ' + icon}/>
					<span className="content">{content}</span>
					<span className="time">{ctime}</span>
					<IconButton 
						icon="mdi-eye" 
						color="#b4c5cd" 
						onClick={this.seeApproval} 
						tooltip={'审查'}
					/>
				</li>
			)
		})
		return (
			<div className="approval">
				<h2 className="title">
					审批
					<IconButton 
						icon="mdi-refresh" 
						color="#b4c5cd"
						onClick={this.refreshApprovals}
					/>
				</h2>
				<ul className="list">
					{items}
					{hasOlder && <li className="older"><FlatButton onClick={this.getOlder}>Older</FlatButton></li>}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = function(store) {
	return {
		list: store.approvals.list,
		hasOlder: store.approvals.hasOlder
	}
}

export default connect(mapStateToProps)(Approval);