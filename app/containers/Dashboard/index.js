import React, {Component} from 'react';
import AppBar from 'components/AppBar';
import Grid from 'components/Grid';
import styles from './styles.css';

class Dashboard extends Component {
	render() {
		return (
			<div className="dashboard" ref={r => this.dashboard =r}>
				<AppBar />
				<div className="main">
					<div className="home-bg"></div>
					<div className="home">
						{this.props.children}
					</div>
				</div>
				<Grid />
			</div>
		)
	}
}

export default Dashboard;