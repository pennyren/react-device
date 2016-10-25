import React from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

function Button(props) {
	const {isRaised, onClick} = props;
	const className = isRaised ? 'mdl-btn is-raised' : 'mdl-btn';
	return (
		<button className={className} onClick={onClick}>
			{props.children}
			<div className="mouseon">
				<Ripple />
			</div>
		</button>
	)
}

export default Button;