import React, {Component} from 'react';
import Stepper from 'components/Stepper';
import {connect} from 'react-redux';
import store from 'store';
import styles from './styles.css';

class DoneApproval extends Component {
	componentDidMount() {
		const applyId = +this.props.params.id;
		store.dispatch({type: 'GET_CURRENT_APPROVAL_ASYNC', id: applyId}); 
	}
	render() {
		const {currentApproval, params} = this.props;
		const {stepInfo} = currentApproval;
		const isInit = Object.keys(currentApproval).length == 0;
		console.log(currentApproval);
		
		return (
			<div className="done-approval">
				{!isInit && <Stepper info={stepInfo} />}
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