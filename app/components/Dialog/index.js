import React, {Component} from 'react';
import FlatButton from 'components/FlatButton';
import Layer from 'internals/Layer';
import ClickAway from 'internals/ClickAway';
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

    confirm = () => {
        this.props.onConfirm(this.dialogContent);
    }

	render() {
		const {close, hasLayer, onClickAway, title, customClassName} = this.props;
        const layerStyle = hasLayer ? {className: 'layer'} : {style: {display: 'none'}};
        const dialogStyle = customClassName ? 'dialog-wrap ' + customClassName : 'dialog-wrap';
        return (
            <div className={dialogStyle}>
                <div {...layerStyle} ref={r => this.layer = r}></div>
                <ClickAway onClickAway={onClickAway}>
                    <div className="dialog" ref={r => this.dialog = r}>
                        <h3 className="title">{title}</h3>
                        <div className="content" ref={r => this.dialogContent = r}>
                            {this.props.children}
                        </div>
                        <div className="footer">
                            <FlatButton onClick={close}>取消</FlatButton>
                            <FlatButton onClick={this.confirm}>确定</FlatButton>
                        </div>
                    </div>
                </ClickAway>
            </div>
		);
	}
}

class Dialog extends Component {
    static defaultProps = {
        hasLayer: true
    }

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
                    {this.state.open && <DialogInline 
                                            close={this.close}
                                            onClickAway={this.close}
                                            {...this.props}
                                        >
                                            {this.props.children}
                                        </DialogInline>}
                </ReactTransitionGroup>
            </Layer>
		)
	}
}

export default Dialog;