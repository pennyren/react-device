import React, {Component} from 'react';
import Button from 'components/Button';
import FlatButton from 'components/FlatButton';
import TextField from 'components/TextField';
import styles from './styles.css';

class Stepper extends Component {
	state = {
		currentContent: '',
		currentStatus: 'unread',
		currentStep : 1
	}

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
		let val = this.textfield.input.value.trim();
		const content = val == '' ? '通过' : val;
		this.setState({currentContent: content, currentStatus: 'agreed'});
	}

	disagreed = (e) => {
		let val = this.textfield.input.value.trim();
		const content = val == '' ? '未通过' : val;
		this.setState({currentContent: content, currentStatus: 'disagreed'});
	}

	render() {
		const {info} = this.props;
		const {currentContent, currentStatus, currentStep} = this.state;
		const lastStep = info.length - 1;
		
		let items = info.map((item, index) => {
			const status = (currentStep == index) ? currentStatus : item.status;
			const showLastStepInfo = (currentStep == lastStep || status != 'disabled') ? true : false;
			const showCurrentContent = (currentStep == index && currentContent != '') ? true : false;
			const showOperate = (currentStep == index && currentContent == '') ? true : false;
			const className = 'stepper-item ' + status;

			let icon = this.getStepIcon(status, index);

			return (
				<li className={className} key={index}>
					<span className="title">
						{icon}
						{item.title}
					</span>
					{showLastStepInfo && (
						<div className="info">
							{showCurrentContent ? currentContent : item.content}
							{showOperate && this.getOperated()}
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