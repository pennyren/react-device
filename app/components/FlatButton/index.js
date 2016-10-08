import React from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

function FlatButton(props) {
	return (
		<button className="flat-btn" onClick={props.onClick}>
			{props.children}
			<Ripple color="#bababa" />
		</button>
	)
}

export default FlatButton;