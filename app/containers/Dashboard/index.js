import React, {Component} from 'react';
import AppBar from 'components/AppBar';
import Drawer from 'components/Drawer';
import styles from './styles.css';

class Dashboard extends Component {
	render() {
		return (
			<div className="dashboard">
				<AppBar />
				<div className="main">
					<div className="home-bg"></div>
					<div className="home">
					</div>
				</div>
				<Drawer docked={true}/>
			</div>
		)
	}
}

export default Dashboard;