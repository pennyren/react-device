import React, {Component} from 'react';
import Layer from 'internals/Layer';
import styles from './styles.css';

function Snackbar(props) {
	const {clearBindEvents, removeLayer, open, message} = props;
	return (
		<Layer clearBindEvents={clearBindEvents} removeLayer={removeLayer} open={open}>
			<div className="mdl-snackbar">
				<span className="message">{message}</span>
			</div>
		</Layer>
	);
}

export default Snackbar;