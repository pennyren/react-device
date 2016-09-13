import React, {Component} from 'react';
import Layer from 'internals/Layer';
import ReactTransitionGroup  from 'react-addons-transition-group';
import SnackbarInline from './SnackbarInline.js';


function Snackbar(props) {
	const {open, message} = props;
	return (
		<Layer open={open}>
			<ReactTransitionGroup>
				<SnackbarInline message={message}/>
			</ReactTransitionGroup>
			
		</Layer>
	);
}

export default Snackbar;