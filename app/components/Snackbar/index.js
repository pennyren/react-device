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
        const style = this.snackbarInline.style;
        style.visibility = 'hidden';
        style.marginTop = '-48px';
        this.leaveTimer = setTimeout(callback, 400);
    }

    animate() {
        const style = this.snackbarInline.style;
        const visibility = 'visibility 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        const marginTop = 'margin-top 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        style.visibility = 'visible';
        style.marginTop = '0';
        
        style.transition = visibility + ', ' + marginTop;
    }

    initAnimation(callback) {
        const style = this.snackbarInline.style;
        style.visibility = 'hidden';
        style.marginTop = '-48px';
        this.enterTimer = setTimeout(callback, 25);
    }

	render() {
        const {message, type} = this.props;
        

        const iconName = 'mdi ' + 'mdi-' + type;
        const className= 'snackbar ' + type;

		return (
            <div className={className} ref={r => this.snackbarInline = r}>
                <i className={iconName}></i>
                <span>{message}</span>
            </div>
		);
	}
	
}

class Snackbar extends Component {
    state = {
        open: false
    }
    
    open(message) {
        this.message = message;
        this.setState({open: true});
        setTimeout(() => this.setState({open: false}), 3000);
    }

    render() {
        let {message, type} = this.props;
        if (!message) {
            message = this.message;
        } 
        return (
            <Layer open={true}>
                <ReactTransitionGroup component="div">
                    {this.state.open && <SnackbarInline message={message} type={type} />}
                </ReactTransitionGroup>
            </Layer>
        );
    }
}

export default Snackbar;