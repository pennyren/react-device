import React, {Component} from 'react';
import styles from './styles.css';

class SnackbarInline extends Component {
	componentWillUnmount() {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    }

    componentWillAppear(callback) {
        this.initAnimation(callback);
    }

    
    componentDidAppear() {
       this.animate();
    }

    componentWillLeave(callback) {
        console.log(1111111);
        const style = this.SnackbarInline.style;
        style.visibility = 'hidden';
        style.marginTop = '-24px';
        this.leaveTimer = setTimeout(callback, 0);
    }

    animate() {
        const style = this.SnackbarInline.style;
        const visibility = 'visibility 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        const marginTop = 'margin-top 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        style.visibility = 'visible';
        style.marginTop = '0';
        
        style.transition = visibility + ', ' + marginTop;
    }

    initAnimation(callback) {
        const style = this.SnackbarInline.style;
        style.visibility = 'hidden';
        style.marginTop = '-24px';
        this.enterTimer = setTimeout(callback, 0);
    }

	render() {
		return (
			<div className="mdl-snackbar" ref={r => this.SnackbarInline = r}>{this.props.message}</div>
		);
	}
	
}

export default SnackbarInline;