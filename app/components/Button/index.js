import React from 'react';
import styles from './styles.css';

function Button(props) {
	const {name, isRaised, onClick} = props;
	const className = isRaised ? 'mdl-btn is-raised' : 'mdl-btn';
	return (
		<button className={className} onClick={onClick}>
			{name}
			<div className="mouseon">
			</div>
		</button>
	)
}

export default Button;