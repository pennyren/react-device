import React from 'react';
import styls from './styles.css';
class TextField extends React.Component {
	render() {
		const {name, placeholder, withFloat} = this.props;

		return (
			<div className="mdl-textfield">
				<input className="mdl-textfield-input" type="text" name={name} id={name}/>
				<label className="mdl-textfield-label" htmlFor={name}>{placeholder}</label>
			</div>
		)
	}
}

export default TextField;