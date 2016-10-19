import React, {Component} from 'react';
import Stepper from 'components/Stepper';
import DatePicker from 'components/DatePicker';
import styles from './styles.css';

class Approval extends Component {
	render() {
		const info = [{
			title: '科室审批',
			status: 'agreed',
			content: '通过'
		}, {
			title: '管理员审批',
			status: 'unread'
		}, {
			title: '经费管理员审批',
			status: 'disagreed'
		}, {
			title: '院长审批',
			status: 'disabled'
		}];
		return (
			<div className="approval">
				<Stepper info={info}/>
				<DatePicker />
			</div>
		)
	}
}

export default Approval;