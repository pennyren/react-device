import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from 'store';
import styles from './styles.css';

class Approval extends Component {
	render() {
		const {list} = this.props;
		console.log(list);
		return (
			<div className="approval">
				<h2 className="title">审批</h2>
				<ul className="list">
					
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