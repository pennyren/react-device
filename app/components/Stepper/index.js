import React, {Component} from 'react';
import Button from 'components/Button';
import FlatButton from 'components/FlatButton';
import TextField from 'components/TextField';
import styles from './styles.css';

class Stepper extends Component {
	getStepIcon(status, index) {
		switch (status) {
			case 'unread':
				return <i className="number">{index + 1}</i>;
			case 'agreed':
				return <i className="mdi mdi-success"></i>;
			case 'disagreed':
				return <i className="mdi mdi-error"></i>;
			default:
				return <i className="number">{index + 1}</i>;
		}
	}

	getOperated() {
		return (
			<div className="operable">
				<TextField name="reason" placeholder="意见" multiLine={true} ref={r => this.textfield = r}/>
				<div className="btn-wrap">
					<Button isRaised={true} onClick={this.agreed}>同意</Button>
					<FlatButton onClick={this.disagreed}>否决</FlatButton>
				</div>
			</div>
		)
	}

	agreed = (e) => {
		const {onApproval} = this.props;
		let val = this.textfield.input.value.trim();
		const content = val == '' ? '通过' : val;
		typeof onApproval == 'function' && onApproval(content);
		
	}

	disagreed = (e) => {
		const {onApproval} = this.props;
		let val = this.textfield.input.value.trim();
		const content = val == '' ? '未通过' : val;
		typeof onApproval == 'function' && onApproval(content);
	}

	render() {
		const {info, current, isEditable} = this.props;
		let items = info.map((item, index) => {
			const {status, title, content} = item;
			const className = 'stepper-item ' + status;
			const isDisabled = status == 'disabled';
			const showOperate = isEditable && current == index + 1;
			let icon = this.getStepIcon(status, index);

			return (
				<li className={className} key={index}>
					<span className="title">{icon}{title}</span>
					{!isDisabled && (
						<div className="info">
							{showOperate ? this.getOperated() : content}
						</div>
					)}
				</li>
			)
		});
	
		return (
			<div className="stepper">
				<ul className="stepper-content">
					{items}
				</ul>
			</div>
		);
	}
}

export default Stepper;