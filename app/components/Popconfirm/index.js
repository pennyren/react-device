import React, {Component} from 'react';
import ClickAway from 'internals/ClickAway';
import Layer from 'internals/Layer';
import ReactTransitionGroup from 'react-addons-transition-group';
import FlatButton from 'components/FlatButton';
import styles from './styles.css';

class PopconfirmInline extends Component {
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
        const style = this.popconfirm.style;
        style.opacity = 0;
        style.transform = 'scale(0)';
        this.leaveTimer = setTimeout(callback, 400);
    }
	
	animate() {
		const style = this.popconfirm.style;
       	style.opacity = 1;
        style.transform = 'scale(1)';
        style.transition = 'all 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
	}

	initAnimation(callback) {
		this.style = this.popconfirm.style;
		this.style.transformOrigin = '0px -4px 0px';
		this.style.opacity = 0;
		this.style.transform = 'scale(0)';
		this.enterTimer = setTimeout(callback, 0);
	}

	render() {
		const {close, offset, message, onConfirm} = this.props;
		const style = {
			left: offset.x,
			top: offset.y
		}

		return (
			<div className="popconfirm-container" style={style} ref={r => this.popconfirm = r}>
					<div className="arrow"></div>
					<div className="popconfirm">
						<div className="content">
								<i className="mdi mdi-warning"></i>
								<span>{message}</span>
						</div>
						<div className="footer">
							<FlatButton onClick={onConfirm}>是</FlatButton>
							<FlatButton onClick={close}>否</FlatButton>
						</div>
		           	</div>
			</div>
		)
	}
}

class Popconfirm extends Component {
	state = {
		open: false
	}
	
	open(e) {
		this.setPosition(e);
		this.setState({open: true});
	}
	
	close = () => {
		this.setState({open: false});
	}

	setPosition(e) {
		const el = e.currentTarget;
		const rect = el.getBoundingClientRect();
		const offset = {
			x: rect.left,
			y: rect.top + rect.height + 8
		}
		this.offset = offset;
	}

	isOpen() {
		return this.state.open;
	}

	render() {
		const {message, onConfirm} = this.props;
		return (
			<Layer open={true}>
                <ReactTransitionGroup component="div">
                    {this.state.open && <PopconfirmInline 
                    						close={this.close}
                    						offset={this.offset}
                    						message={message}
                    						onConfirm={onConfirm}
                    					/>}
                </ReactTransitionGroup>
            </Layer>
		);
	}
}

export default Popconfirm;