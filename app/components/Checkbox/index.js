import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

class Checkbox extends Component {
	toggle = (e) => {
		this.checkbox.classList.toggle('checked');
	}

	render() {
		return (
			<div className="checkbox-wrapper">
				<div className="checkbox" ref={r => this.checkbox = r} onClick={this.toggle}>
					<div className="outer"></div>
					<div className="inner">
						<i className="mdi mdi-check"></i>
					</div>
					<input type="checkbox"/>
					<Ripple centerRipple={true} color="#b4c5cd"/>
				</div>
				<div className="label">
				</div>
			</div>
		);
	}
}

export default Checkbox;