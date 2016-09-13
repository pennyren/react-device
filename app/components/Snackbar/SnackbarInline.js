import React, {Component} from 'react';
import styles from './styles.css';

class SnackbarInline extends Component {
	 componentWillUnmount() {

        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    }

    componentWillAppear(callback) {
        
        this.initializeAnimation(callback);
    }

    componentWillEnter(callback) {
       
        this.initializeAnimation(callback);
    }

    componentDidAppear() {
       
        this.animate();
    }

    componentDidEnter() {
      
        this.animate();
    }

    componentWillLeave(callback) {
        
        const style = this.view.style;
        style.visibility = 'hidden';
        style.marginTop = '-24px';
        const removeAfter = this.props.aborted ? 0 : 2000;
        this.enterTimer = setTimeout(callback, removeAfter);
    }

    animate() {
        const style = this.view.style;
        const visibility = 'visibility 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        const marginTop = 'margin-top 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        style.visibility = 'visible';
        style.marginTop = '0';
        
        style.transition = visibility + ', ' + marginTop;
    }

    initializeAnimation(callback) {
        const style = this.view.style;
        style.visibility = 'hidden';
        style.marginTop = '-24px';
        this.leaveTimer = setTimeout(callback, 0);
    }
	render() {
		return (
			<div className="mdl-snackbar" ref={r => this.view = r}>{this.props.message}</div>
		);
	}
	
}

export default SnackbarInline;