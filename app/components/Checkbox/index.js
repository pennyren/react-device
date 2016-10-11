import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

class Checkbox extends Component {
	toggle = () => {
		if (this.checkbox.classList.contains('disabled')) {
			return;
		}
		const isChecked = this.rawCheck.checked;
		const onChange = this.props.onChange;
		this.checkbox.classList.toggle('checked');
		this.rawCheck.checked = !isChecked;
		typeof onChange == 'function' && onChange(!isChecked)
	}

	render() {
		const {name, label} = this.props;
		return (
			<div className="checkbox-wrapper">
				<div className="checkbox" ref={r => this.checkbox = r} onClick={this.toggle}>
					<div className="outer"></div>
					<div className="inner">
						<i className="mdi mdi-check"></i>
					</div>
					<input type="checkbox" name={name} ref={r => this.rawCheck = r}/>
					<Ripple centerRipple={true} color="#b4c5cd"/>
				</div>
				<label>{label}</label>
			</div>
		);
	}
}

export default Checkbox;