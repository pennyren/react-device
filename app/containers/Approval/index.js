import React, {Component} from 'react';
import Stepper from 'components/Stepper';
import styles from './styles.css';

class Approval extends Component {
	render() {
		return (
			<div className="approval">
				<Stepper />
			</div>
		)
	}
}

export default Approval;