import React, {Component} from 'react';
import styles from './styles.css';

class Radio extends Component {
	render() {
		const {label, onChecked} = this.props;
		return (
			<div className="radio">
				<input type="radio" />
				<div className="radio-wrap">
					<div className="outer">
					</div>
					<label>{label}</label>
				</div>
			</div>
		)
	}
}

export default Radio;