import React from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

function IconButton(props) {
	const {onClick, classIcon, color} = props;
	const className = 'mdi ' + classIcon;
	return (
		<button className="btn-icon" onClick={onClick}>
			<i className={className}></i>
			<Ripple centerRipple={true} color={color}/>
		</button>
	)
}

export default IconButton;