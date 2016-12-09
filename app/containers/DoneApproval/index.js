import React, {Component} from 'react';
import Stepper from 'components/Stepper';
import {connect} from 'react-redux';
import store from 'store';
import moment from 'utils/date';
import styles from './styles.css';

class DoneApproval extends Component {
	componentDidMount() {
		const applyId = +this.props.params.id;
		store.dispatch({type: 'GET_CURRENT_APPROVAL_ASYNC', id: applyId}); 
	}

	componentWillUnmount() {
		store.dispatch({type: 'CLEAR_CURRENT_APPROVAL'}); 
	}

	doApproval = (content) => {
		const applyId = +this.props.params.id;
		store.dispatch({type: 'DO_APPROVAL_ASYNC', applyId, content})
	}

	render() {
		const {currentApproval} = this.props;
		const isInit = Object.keys(currentApproval).length == 0;
		const applyType = ['购买', '领用', '退还', '维修', '维护'];
		if (isInit) {
			return null;
		}
		currentApproval.ctime = moment.get(currentApproval.ctime, 'YYYY-MM-DD HH:MM');
		
		const {stepInfo, ctime, username, type, name, version, equipmentNumber, currentStep} = currentApproval;
		const userId = 1;
		let isBuy = applyType.indexOf(type) == 0;
		const equipment = isBuy ? '新设备' : `${name} ${version}`;
		const apply = `${username} 申请${type} ${equipment}`;
		let detail = isBuy ? (
			<li className="detail">
				<span className="title"><i className="mdi mdi-info" />详情</span>
				<div className="content">{currentApproval.detail}</div>
			</li>
		) : (
			<li className="number">
				<i className="mdi mdi-mac"/>设备编号 {equipmentNumber}
			</li>
		);
		const isEditable = userId == currentApproval.currentApprovalUserId;

		return (
			<div className="done-approval">
				<div className="container">
					<h2 className="title-bar">信息</h2>
					<ul className="approval-info">
						<li className="apply">
							<i className="mdi mdi-account"/>
							{apply}
						</li>
						{detail}
						<li className="time"><i className="mdi mdi-time"/>{ctime}</li>
						<li className="list"><i className="mdi mdi-list"/>用户设备列表</li>
					</ul>
					<h2 className="title-bar">审核</h2>
					<Stepper 
						info={stepInfo}
						current={currentStep}
						isEditable={isEditable}
						onApproval={this.doApproval}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = function(store) {
	return {
		currentApproval: store.approvals.current
	}
}

export default connect(mapStateToProps)(DoneApproval);