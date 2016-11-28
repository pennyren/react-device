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
		
		const items = notifications.map((notification, index) => {
			return (
				<li className="item"></li>
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