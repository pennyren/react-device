import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'components/FlatButton';
import store from 'store';
import styles from './styles.css';

class History extends Component {
	componentDidMount() {
		store.dispatch({type: 'GET_HISTORY_ASYNC', equipmentId: +this.props.params.id}); 
	}
	
	componentWillUnmount() {
		store.dispatch({type: 'CLEAR_HISTORY'}); 
	}

	getOlder = (e) => {
		store.dispatch({type: 'GET_HISTORY_ASYNC', equipmentId: +this.props.params.id}); 
	}

	render() {
		const {history, hasOlder} = this.props;
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
					{hasOlder && <li className="older"><FlatButton onClick={this.getOlder}>Older</FlatButton></li>}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = function(store) {
	return {
		history: store.history.list,
		hasOlder: store.history.hasOlder
	}
}

export default connect(mapStateToProps)(History);
