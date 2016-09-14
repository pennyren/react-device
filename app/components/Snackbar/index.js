import React, {Component} from 'react';
import Layer from 'internals/Layer';
import ReactTransitionGroup  from 'react-addons-transition-group';
import SnackbarInline from './SnackbarInline.js';


function Snackbar(props) {
	const {open, message} = props;
	console.log((open && <SnackbarInline message={message}/>));
	return (
		<Layer open={open}>
			<ReactTransitionGroup component="div">
				{open && <SnackbarInline message={message}/>}
			</ReactTransitionGroup>
		</Layer>
	);
}

export default Snackbar;