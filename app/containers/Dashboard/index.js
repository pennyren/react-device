import React, {Component} from 'react';
import AppBar from 'components/AppBar';
import styles from './styles.css';

class Dashboard extends Component {
	componentWillUnmount() {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    }

    componentWillAppear(callback) {
        this.initAnimation(callback);
    }

    componentWillEnter(callback) {
        this.initAnimation(callback);
    }

    componentDidAppear() {
        this.animate();
    }

    componentDidEnter() {
        this.animate();
    }

    componentWillLeave(callback) {
        const style = this.dashboard.style;
        style.opacity = 0;
        console.log(2);
        this.leaveTimer = setTimeout(callback, 0);
    }

    animate() {
        const style = this.dashboard.style;
        const opacity = 'opacity 2000ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
       
        style.opacity = 1;
        style.transition = opacity;
    }

    initAnimation(callback) {
        const style = this.dashboard.style;
        style.opacity = 0;
        
        this.enterTimer = setTimeout(callback, 0);
    }
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
			</div>
		)
	}
}

export default Dashboard;