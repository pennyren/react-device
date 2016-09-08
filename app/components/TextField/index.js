import React from 'react';
import styls from './styles.css';
class TextField extends React.Component {
	constructor() {
		super();
		this.isFocus = this.isFocus.bind(this);
		this.isBlur = this.isBlur.bind(this);
		this.checkDirty = this.checkDirty.bind(this);
	}
	componentDidMount() {
		if (this.input.value) {
			this.view.classList.add('is-dirty');
			if (this.props.withFloat) {
				this.view.classList.add('is-float');
			}
		}
	}
	isFocus() {
		this.view.classList.add('is-focus');
		if (this.props.withFloat) {
			this.view.classList.add('is-float');
		}
	}
	isBlur() {
		const classList = this.view.classList;
		classList.remove('is-focus');
		if (!classList.contains('is-dirty') && this.props.withFloat) {
			classList.remove('is-float');
		}
	}
	checkDirty() {
		const val = this.input.value;
		const classList = this.view.classList;
		val ? classList.add('is-dirty') : classList.remove('is-dirty');
	}
	render() {
		const {name, placeholder, withFloat, value} = this.props;
		const className = withFloat ? 'mdl-textfield mdl-textfield-float' : 'mdl-textfield';
		const type = (name == 'password') ? 'password' : 'text';
		return (
			<div className={className} ref={v => this.view = v}>
				<input className="mdl-textfield-input" 
					   type={type}
					   name={name} 
					   id={name}
					   defaultValue={value}
					   ref={r => this.input = r}
					   onFocus={this.isFocus}
					   onBlur={this.isBlur}
					   onChange={this.checkDirty}/>
				<label className="mdl-textfield-label" htmlFor={name}>{placeholder}</label>
			</div>
		)
	}
}

TextField.propTypes = {
	name: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	withFloat: React.PropTypes.bool
}

export default TextField;