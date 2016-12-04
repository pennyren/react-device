import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from 'store';
import styles from './styles.css';

class History extends Component {
	componentDidMount() {
		store.dispatch({type: 'GET_HISTORY_ASYNC', equipmentId: +this.props.params.id}); 
	}
	
	componentWillUnmount() {
		store.dispatch({type: 'CLEAR_HISTORY'}); 
	}

	render() {
		const {history} = this.props;
		const items = history.map((el, index) => {
			const {content, ctime} = el;
			return (
				<li className="item" key={index}>
					<i className="mdi mdi-history"/>
					<span className="cotent">{content}</span>
					<span className="time">{ctime}</span>
				</li>
			)
		})
		return (
			<div className="history">
				<h2 className="title">设备历史</h2>
				<ul className="record">
					{items}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = function(store) {
	return {
		history: store.history
	}
}

export default connect(mapStateToProps)(History);
