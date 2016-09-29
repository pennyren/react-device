import React, {Component} from 'react';
import AppBar from 'components/AppBar';
import styles from './styles.css';

class Dashboard extends Component {
	render() {
		return (
			<div className="dashboard">
				<AppBar />
				<div className="main">
					<div className="home-bg"></div>
					<div className="home">
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard;