import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Ripple from 'components/Ripple';
import styles from './styles.css';

class IconTextField extends Component {
	toggleExpand = () => {
		const classList = this.IconTextField.classList;
		const isExpanded = classList.contains('is-expandable');
		const isDirty = classList.contains('is-dirty');

		if (!isExpanded) {
			classList.add('is-expandable');
			this.input.focus();
		} else {
			if (isDirty) {
				this.input.focus();
			} else {
				this.input.blur();
			}
		}
	}

	isFocus = () => {
		this.IconTextField.classList.add('is-focus');
	}

	isBlur = () => {
		const classList = this.IconTextField.classList;
		classList.remove('is-focus');
		!classList.contains('is-dirty') && classList.remove('is-expandable');
	}

	checkDirty = () => {
		const val = this.input.value.trim();
		const classList = this.IconTextField.classList;
		val ? classList.add('is-dirty') : classList.remove('is-dirty');
	}

	render() {
		const {name, value, placeholder, icon} = this.props;
		const className = 'mdi ' + icon;

		return (
			<div className="icon-textfield" ref={r => this.IconTextField = r}>
				<label className="icon-wrap" onClick={this.toggleExpand}>
					<i className={className}></i>
					<Ripple centerRipple={true} color="#b4c5cd"/>
				</label>
				<div className="textfield">
					<input className="textfield-input" 
						   type="text"
						   name={name} 
						   id={name}
						   defaultValue={value}
						   onFocus={this.isFocus}
						   onBlur={this.isBlur}
						   onChange={this.checkDirty}
						   ref={r => this.input = r}
					/>
					<label className="textfield-label" htmlFor={name}>{placeholder}</label>
				</div>
			</div>
		);
	}
}

export default IconTextField;