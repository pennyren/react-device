import React from 'react';
import styls from './styles.css';
class TextField extends React.Component {
	static defaultProps = {
		isFloat: true,
		multiLine: false
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

	checkDirty = (e) => {
		const {onChange, multiLine} = this.props;
		const val = this.input.value;
		const classList = this.TextField.classList;
		val ? classList.add('is-dirty') : classList.remove('is-dirty');
		typeof onChange == 'function' && onChange(e);
	}

	keyUp = (e) => {
		const {onEnter} = this.props;
		const isFn = (typeof onEnter == 'function');
		if (isFn && e.keyCode == 13) {
			onEnter(e);
		}
	}

	render() {
		const {name, value, placeholder, isFloat, multiLine} = this.props;
		let classList = ['mdl-textfield'];
		isFloat && classList.push('mdl-textfield-float');

		if (value) {
			classList.push('is-dirty');
			if (isFloat) {
				classList.push('is-float');
			}
		}

		const type = (name == 'password') ? 'password' : 'text';
		const fieldProps = {
			className: 'mdl-textfield-input' + (multiLine ? ' is-textarea' : ''),
			type: type,
			name: name,
			id: name,
		   	defaultValue: value,
		   	onFocus: this.isFocus,
		   	onBlur: this.isBlur,
		   	onChange: this.checkDirty,
		   	onKeyUp: this.keyUp,
		   	ref: r => this.input = r
		}

		return (
			<div className={classList.join(' ')} ref={v => this.TextField = v}>
				{!multiLine ? <input {...fieldProps} /> : <textarea {...fieldProps} rows={3}/>}
				<label className="mdl-textfield-label" htmlFor={name}>{placeholder}</label>
			</div>
		)
	}
}

export default TextField;