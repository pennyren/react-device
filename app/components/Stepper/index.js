import React, {Component} from 'react';
import Button from 'components/Button';
import FlatButton from 'components/FlatButton';
import styles from './styles.css';

class Stepper extends Component {
	getCurrentStepIcon(status, index) {
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
				<Button isRaised={true}>同意</Button>
				<FlatButton>否决</FlatButton>
			</div>
		)
	}

	render() {
		const {info} = this.props;
		const lastStep = info.length - 1;
		const currentStep = 1;
		
		let items = info.map((item, index) => {
			const status = item.status;
			const className = 'stepper-item ' + status;
			const showLastStepInfo = (currentStep == lastStep || status != 'disabled') ? true : false;
			let icon = this.getCurrentStepIcon(status, index);

			return (
				<li className={className} key={index}>
					<span className="title">
						{icon}
						{item.title}
					</span>
					{showLastStepInfo && (
						<div className="info">
							{item.content}
							{(currentStep == index) && this.getOperated()}
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