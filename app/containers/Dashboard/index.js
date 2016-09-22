import React, {Component} from 'react';
import AppBar from 'components/AppBar';

import Dropdown from 'components/Dropdown';

import styles from './styles.css';

class Dashboard extends Component {
	render() {
		return (
			<div className="dashboard">
				<AppBar />
				<div className="main">
					<div className="home-bg"></div>
					<div className="home">
						<div className="test">
							<Dropdown menuItems={['react', 'redux']} hierarchy={1}/>
						</div>
						
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard;