import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import Button from 'components/Button';
import styles from './styles.css';

class Notifications extends Component {
	activeLink = (e) => {
		const el = e.currentTarget;
		const next = el.nextElementSibling;
		const prev = el.previousElementSibling;
		if (!el.classList.contains('active')) {
			el.classList.add('active');
			next.classList.contains('link') ? next.classList.remove('active') : 
				prev.classList.remove('active');
		}
	}

	render() {
		console.log(this.props);
		return (
			<div className="notifications">
				<h2 className="title">我的提醒</h2>
				<div className="tool-bar">
					<a className="link active" 
					   href="#/notifications" 
					   onClick={this.activeLink} 
					   style={{'borderRight': '1px solid #d9d9d9'}}>
						全部提醒
						<Ripple color="#bababa"/>
					</a>
					<a className="link" href="#/notifications?unread=true" onClick={this.activeLink}>
						未读提醒
						<Ripple color="#bababa"/>
					</a>
					<button className="mark">
						<i className="mdi mdi-check"></i>
						全部标记为已读
						<Ripple color="#bababa"/>
					</button>
				</div>
				<ul className="message">
					<li className="item"></li>
					<li className="item"></li>
					<li className="item"></li>
					<li className="item"></li>
				</ul>
			</div>
		)
	}
}

export default Notifications;