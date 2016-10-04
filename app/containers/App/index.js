import React from 'react';
import ReactTransitionGroup  from 'react-addons-transition-group';
import styles from './styles.css';
function App(props) {
	return (
		<div className="wrapper">
			<ReactTransitionGroup component="div">
				{props.children}
			</ReactTransitionGroup>
		</div>
	)
}

export default App;