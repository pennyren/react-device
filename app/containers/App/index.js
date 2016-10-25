import React from 'react';
import styles from './styles.css';
function App(props) {
	return (
		<div className="wrapper">
			{props.children}
		</div>
	)
}

export default App;