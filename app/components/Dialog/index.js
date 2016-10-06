import React, {Component} from 'react';
import styles from './styles.css';

class Dialog extends Component {
	render() {
		return (
			<div className="dialog-container">
				<div className="layer"></div>
				<div className="dialog"></div>
			</div>
		)
	}
}

export default Dialog;