import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import FlatButton from 'components/FlatButton';
import {connect} from 'react-redux';
import {closest} from 'utils/dom';
import store from 'store';
import styles from './styles.css';

class Notifications extends Component {
	componentDidMount() {
		store.dispatch({type: 'GET_NOTIFICATIONS_ASYNC'}); 
	}

	componentWillUnmount() {
		store.dispatch({type: 'CLEAR_NOTIFICATIONS'}); 
	}

	readNotification = (e) => {
		const notification = closest(e.currentTarget, '.item');
		if (!notification.classList.contains('unread')) {
			return;
		}
		const id = +notification.getAttribute('data-id');
		store.dispatch({type: 'READ_NOTIFICATION_ASYNC', id});
	}

	readAll = (e) => {
		const items = this.messageContainer.querySelectorAll('.unread');
		const ids = [];
		for (let item of items) {
			ids.push(+item.getAttribute('data-id'));
		}
		if (ids.length == 0) {
			return;
		}
		store.dispatch({type: 'READ_ALL_ASYNC', ids});
	}

	render() {
		const {notifications} = this.props;
		const notificationType = ['审批', '同意', '否决'];
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
					<a href={'#/approval/' + applyId} className="apply-link" onClick={this.readNotification}>{newContent[1]}</a>
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
					<FlatButton onClick={this.readAll}>全部标记为已读</FlatButton>
				</div>
				<ul className="message" ref={r => this.messageContainer = r}>
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