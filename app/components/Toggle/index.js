import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

class Toggle extends Component {
	toggle = () => {
		if (this.toggle.classList.contains('disabled')) {
			return;
		}
		const isChecked = this.rawCheck.checked;
		const onChange = this.props.onChange;
		this.toggle.classList.toggle('checked');
		this.rawCheck.checked = !isChecked;
		typeof onChange == 'function' && onChange(!isChecked)
	}

	handleMouseDown = (event) => {
		this.Ripple.start(event);
	};

	handleMouseUp = () => {
		this.Ripple.end();
	};

	handleMouseLeave = () => {
		this.Ripple.end();
	};

	handleTouchStart = (event) => {
		this.Ripple.start(event);
	};

	handleTouchEnd = () => {
		this.Ripple.end();
	};

	render() {
		const {name, label} = this.props;
		return (
			<div 
				className="toggle-wrapper"
				ref={r => this.toggle = r}
				onMouseUp={this.handleMouseUp}
				onMouseDown={this.handleMouseDown}
				onMouseLeave={this.handleMouseLeave}
				onTouchStart={this.handleTouchStart}
				onTouchEnd={this.handleTouchEnd}
				onClick={this.toggle}
			>
				<input type="checkbox" name={name} ref={r => this.rawCheck = r}/>
				<div className="toggle">
					<label>{label}</label>
					<div className="slide-wrapper">
						<div className="bar"></div>
						<div className="circle-box">
							<Ripple centerRipple={true} color="#b4c5cd" ref={r => this.Ripple = r} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Toggle;