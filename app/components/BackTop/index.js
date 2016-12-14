import React, {Component} from 'react';
import debounce from 'utils/debounce';
import Ripple from 'components/Ripple';
import ReactTransitionGroup  from 'react-addons-transition-group';
import {on, off} from 'utils/events';
import styles from './styles.css';

const easeInOutCubic = (t, b, c, d) => {
  	const cc = c - b;
  	t /= d / 2;
  	if (t < 1) {
    	return cc / 2 * t * t * t + b;
  	} else {
    	return cc / 2 * ((t -= 2) * t * t + 2) + b;
  	}
};

class BackTopInline extends Component {
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
        this.style.opacity = 0;
        this.style.visiblity = 'hidden';
        this.leaveTimer = setTimeout(callback, 0);
    }
	
	animate() {
		this.style.opacity = 1;
		this.style.visiblity = 'visible';
		this.style.transition = 'all .3s cubic-bezier(.4,0,.2,1)';
	}

	initAnimation(callback) {
		this.style = this.backTop.style;
		this.style.opacity = 0;
		this.style.visiblity = 'hidden';
		this.enterTimer = setTimeout(callback, 0);
	}

	render() {
		return (
			<div className="back-top" onClick={this.props.scrollToTop} ref={r => this.backTop = r}>
				<i className="mdi mdi-up"/>
				<Ripple color="#b4c5cd"/>
			</div>
		)
	}
}

class BackTop extends Component {
	static defaultProps = {
	    visibilityHeight: 300,
	}

	state = {
		visible: false
	}
	
	componentDidMount() {
		this.finalTarget = this.props.target || window;
		this.finalHandelScroll = debounce(this.handelScroll, 200);
		this.handelScroll();
		on(this.finalTarget, 'scroll', this.finalHandelScroll, false);
	}

	componentWillUnmount() {
		off(this.finalTarget, 'scroll', this.finalHandelScroll);
	}

	handelScroll = () => {
		const {visibilityHeight} = this.props;
		const scrollTop = this.getScrollTop();
		this.setState({
			visible: scrollTop > visibilityHeight
		})
	}

	setScrollTop(value) {
		if (this.finalTarget == window) {
			document.body.scrollTop = value;
      		document.documentElement.scrollTop = value;
      	} else {
    		this.finalTarget.scrollTop = value;
   		}
	}

	getScrollTop() {
		return this.finalTarget == window ? document.body.scrollTop : this.finalTarget.scrollTop;
	}

	scrollToTop = (e) => {
		const scrollTop = this.getScrollTop();
    	const startTime = Date.now();
    	const frameFunc = () => {
	    	const timestamp = Date.now();
	    	const time = timestamp - startTime;
		    this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
	    	if (time < 450) {
	    		requestAnimationFrame(frameFunc);
	    	}
    	};
    	requestAnimationFrame(frameFunc);
    }

    render() {
    	return (
    		<ReactTransitionGroup component="div">
				{this.state.visible && <BackTopInline scrollToTop={this.scrollToTop}/>}
			</ReactTransitionGroup>
    	)
    }
}

export default BackTop;