import React, {Component} from 'react';
import Stepper from 'components/Stepper';
import {connect} from 'react-redux';
import IconButton from 'components/IconButton';
import store from 'store';
import moment from 'utils/date';
import cookie from 'utils/cookie';
import styles from './styles.css';

class DoneApproval extends Component {
	componentDidMount() {
		const applyId = +this.props.params.id;
		store.dispatch({type: 'GET_CURRENT_APPROVAL_ASYNC', id: applyId}); 
	}

	componentWillUnmount() {
		store.dispatch({type: 'CLEAR_CURRENT_APPROVAL'}); 
	}

	doApproval = (content, isAgreed) => {
		const applyId = +this.props.params.id;
		const equipment = this.equipment;
		store.dispatch({type: 'DO_APPROVAL_ASYNC', applyId, content, equipment, isAgreed})
	}

	seeUserDeviceList = (e) => {
		const device = this.userDevices.querySelectorAll('.device');
		const height = device.length * 35;
		this.openList.iconBtn.classList.toggle('opened');
		this.userDevices.classList.toggle('opened');
		if (this.userDevices.classList.contains('opened')) {
			this.userDevices.style.height = height + 'px';
		} else {
			this.userDevices.removeAttribute('style');
		}
	}

	render() {
		const {currentApproval} = this.props;
		const isInit = Object.keys(currentApproval).length == 0;
		const applyType = ['购买', '领用', '退还', '维修', '维护'];
		if (isInit) {
			return null;
		}
		currentApproval.ctime = moment.get(currentApproval.ctime, 'YYYY-MM-DD HH:MM');
		
		const {
			stepInfo, 
			ctime, 
			username, 
			type, 
			name, 
			version, 
			equipmentNumber, 
			currentStep,
			userDevices
		} = currentApproval;
		
		const userId = +cookie.get('uid');
		let isBuy = applyType.indexOf(type) == 0;
		this.equipment = isBuy ? '新设备' : `${name} ${version}`;
		const apply = `${username} 申请${type} ${this.equipment}`;
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
		const devices = userDevices.map((device, index) => {
			const {serialNumber, name, version} = device;
			return (
				<li className="device" key={index}>
					<i className="mdi mdi-laptop"/>
					{`编号${serialNumber} ${name} ${version}`}
				</li>
			)
		});
		return (
			<div className="done-approval">
				<h2 className="title-bar">信息</h2>
				<ul className="approval-info">
					<li className="apply">
						<i className="mdi mdi-account"/>
						{apply}
					</li>
					{detail}
					<li className="time">
						<i className="mdi mdi-time"/>
						{ctime}
					</li>
					<li className="list">
						<i className="mdi mdi-list"/>
						用户设备列表
						<IconButton 
							icon="mdi-right" 
							color="#b4c5cd"
							onClick={this.seeUserDeviceList}
							ref={r => this.openList = r}
						/>
						<ul className="user-device" ref={r => this.userDevices = r}>
							{devices}
						</ul>
					</li>
				</ul>
				<h2 className="title-bar">审核</h2>
				<Stepper 
					info={stepInfo}
					current={currentStep}
					isEditable={isEditable}
					onApproval={this.doApproval}
				/>
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