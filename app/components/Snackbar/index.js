import React, {Component} from 'react';
import Layer from 'internals/Layer';
import ReactTransitionGroup from 'react-addons-transition-group';
import styles from './styles.css';

class SnackbarInline extends Component {
	componentWillUnmount() {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    }
    
    componentWillEnter(callback) {
        this.initAnimation(callback);
    }

    componentDidEnter() {
       this.animate();
    }

    componentWillLeave(callback) {
        const style = this.SnackbarInline.style;
        style.visibility = 'hidden';
        style.marginTop = '-48px';
        this.leaveTimer = setTimeout(callback, 400);
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
        style.marginTop = '-48px';
        this.enterTimer = setTimeout(callback, 25);
    }

	render() {
		return (
			<span className="mdl-snackbar" ref={r => this.SnackbarInline = r}>{this.props.message}</span>
		);
	}
	
}


function Snackbar(props){
	const {open, message} = props;

	return (
		<Layer open={true}>
			<ReactTransitionGroup component="div">
				{open && <SnackbarInline message={message}/>}
			</ReactTransitionGroup>
		</Layer>
	)
	
}

export default Snackbar;