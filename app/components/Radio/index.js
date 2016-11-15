import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

class Radio extends Component {
	defaultProps = {
		defaultChecked: false
	}

	innerChecked = () => {
		const {onChecked} = this.props;
		this.checked();
		typeof onChecked == 'function' && onChecked();
	}

	checked = () => {
		this.radio.classList.add('checked');
		this.rawRadio.checked = true;
	}

	unChecked = () => {
		this.radio.classList.remove('checked');
		this.rawRadio.checked = false;
	}

	render() {
		const {name, value, defaultChecked} = this.props;
		const className = defaultChecked ? 'radio checked' : 'radio';
		return (
			<div className={className} ref={r => this.radio = r} onClick={this.innerChecked}>
				<input type="radio" name={name} value={value} defaultChecked={defaultChecked} ref={r => this.rawRadio = r}/>
				<div className="wrapper">
					<div className="outer">
						<div>
							<div className="after">
								<div className="round"></div>
							</div>
							<div className="before"></div>
						</div>

						<Ripple centerRipple={true} color="#b4c5cd" />
					</div>
					<label>{value}</label>
				</div>
			</div>
		)
	}
}

export default Radio;