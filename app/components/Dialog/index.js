import React, {Component} from 'react';
import FlatButton from 'components/FlatButton';
import Layer from 'internals/Layer';
import ReactTransitionGroup from 'react-addons-transition-group';
import styles from './styles.css';

class DialogInline extends Component {
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
        const style = this.layer.style;
        const dialogStyle = this.dialog.style;
		style.opacity = 0;
       	dialogStyle.opacity = 0;
       	dialogStyle.transform = 'translate(0, -64px)';
        this.leaveTimer = setTimeout(callback, 450);
    }

    animate() {
        const style = this.layer.style;
        const dialogStyle = this.dialog.style;
        style.opacity = 0.53;
        dialogStyle.opacity = 1;
       	dialogStyle.transform = 'translate(0, 0)';
        style.transition = 'opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        dialogStyle.transition = 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    }

    initAnimation(callback) {
        const style = this.layer.style;
        const dialogStyle = this.dialog.style;
		style.opacity = 0;
       	dialogStyle.opacity = 0;
       	dialogStyle.transform = 'translate(0, -64px)';
        this.enterTimer = setTimeout(callback, 25);
    }

	render() {
		const {close} = this.props;
        return (
            <div className="dialog-wrap">
 				<div className="layer" ref={r => this.layer = r}></div>
 				<div className="dialog" ref={r => this.dialog = r}>
 					<h3 className="title">Dialog Title</h3>
 					<div className="content">
 						This is dialog content.
 					</div>
 					<div className="footer">
 						<FlatButton onClick={close}>取消</FlatButton>
 						<FlatButton>保存</FlatButton>
 					</div>
 				</div>
 			</div>
		);
	}
}

class Dialog extends Component {
	state = {
		open: false
	}

	open() {
		this.setState({open: true});
	}

	close = () => {
		this.setState({open: false});
	}

	render() {
		return (
			<Layer open={true}>
                <ReactTransitionGroup component="div">
                    {this.state.open && <DialogInline close={this.close}/>}
                </ReactTransitionGroup>
            </Layer>
		)
	}
}

export default Dialog;