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
		const items = list.map((approval, index) => {
			const {ctime} = el;
			return (
				<li className="item" key={index} data-id={approval.id}>
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