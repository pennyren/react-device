import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import FlatButton from 'components/FlatButton';
import {connect} from 'react-redux';
import store from 'store';
import styles from './styles.css';

class Notifications extends Component {
	componentDidMount() {
		store.dispatch({type: 'GET_NOTIFICATIONS_ASYNC'}); 
	}

	render() {
		const {notifications} = this.props;
		const notificationType = ['审批', '通过', '否决'];
		const icons = ['mdi-approval', 'mdi-success', 'mdi-error'];
		const items = notifications.map((notification, index) => {
			const {applyId, content, ctime, type, read} = notification;
			const currentIcon = icons[notificationType.indexOf(type)];
			const newContent = content.split('|');
			const className = read ? 'item' : 'item unread';
			return (
				<li className={className} key={index} data-id={notification.id}>
					{!read && <i className="mdi mdi-record" />}
					<i className={'mdi ' + currentIcon}></i>
					<span>{newContent[0]}</span>
					<a href={'#/approval/' + applyId} className="apply-link">{newContent[1]}</a>
					<span>{newContent[2]}</span>
					<span className="time">{ctime}</span>
				</li>
			)
		})

		return (
			<div className="notifications">
				<h2 className="title">我的提醒</h2>
				<div className="tool-bar">
					<span className="title-bar">通知提醒</span>
					<FlatButton>全部标记为已读</FlatButton>
				</div>
				<ul className="message">
					{items}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = function(store) {
	return {
		notifications: store.notifications
	}
}

export default connect(mapStateToProps)(Notifications);