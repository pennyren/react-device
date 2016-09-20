import React from 'react';
import styls from './styles.css';
class TextField extends React.Component {
	defaultProps = {
		isFloat: true
	}

	isFocus = () => {
		this.TextField.classList.add('is-focus');
		this.props.isFloat && this.TextField.classList.add('is-float');
	}

	isBlur = () => {
		const classList = this.TextField.classList;
		classList.remove('is-focus');
		if (!classList.contains('is-dirty') && this.props.isFloat) {
			classList.remove('is-float');
		}
	}

	checkDirty = () => {
		const val = this.input.value;
		const classList = this.TextField.classList;
		val ? classList.add('is-dirty') : classList.remove('is-dirty');
	}

	render() {
		const {name, value, placeholder, isFloat} = this.props;
		let classList = ['mdl-textfield'];

		isFloat && classList.push('mdl-textfield-float');

		if (value) {
			classList.push('is-dirty');
			if (isFloat) {
				classList.push('is-float');
			}
		}

		const type = (name == 'password') ? 'password' : 'text';

		return (
			<div className={classList.join(' ')} ref={v => this.TextField = v}>
				<input className="mdl-textfield-input" 
					   type={type}
					   name={name} 
					   id={name}
					   defaultValue={value}
					   ref={r => this.input = r}
					   onFocus={this.isFocus}
					   onBlur={this.isBlur}
					   onChange={this.checkDirty}
				/>
				<label className="mdl-textfield-label" htmlFor={name}>{placeholder}</label>
			</div>
		)
	}
}

export default TextField;