import React, {Component} from 'react';
import styles from './styles.css';

class Stepper extends Component {
	render() {
		return (
			<div className="stepper">
				<ul className="stepper-content">
					<li className="stepper-item">
						<span className="title">
							<i></i>
							text
						</span>
						<div className="wrap">
							<div className="info">
								stepper info
							</div>
						</div>
					</li>
					<li></li>
					<li></li>
				</ul>
			</div>
		);
	}
}

export default Stepper;