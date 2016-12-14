import React from 'react';
import polyfill from 'babel-polyfill';
import BackTop from 'components/BackTop';
import styles from './styles.css';

function App(props) {
	return (
		<div className="wrapper">
			{props.children}
			<BackTop />
		</div>
	)
}

export default App;