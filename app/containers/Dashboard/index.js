import React, {Component} from 'react';
import AppBar from 'components/AppBar';
import styles from './styles.css';

class Dashboard extends Component {
	render() {
		return (
			<div className="dashboard">
				<AppBar />
			</div>
		)
	}
}

export default Dashboard;