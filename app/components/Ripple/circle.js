import React, {Component} from 'react';

class Circle extends Component {
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
        style.opacity = 0.01;
        const removeAfter = this.props.aborted ? 0 : 2000;
        this.enterTimer = setTimeout(callback, removeAfter);
    }

    animate() {
        const style = this.view.style;
        const opcity = 'opacity 2s cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        const transform = 'transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        style.transform = 'scale(1)';
        style.transition = opcity + ', ' + transform;
    }

    initializeAnimation(callback) {
        const style = this.view.style;
        style.opacity = this.props.opacity;
        style.transform = 'scale(0)';
        this.leaveTimer = setTimeout(callback, 0);
    }

	render() {
		const {color, style} = this.props;
	    const mergedStyles = Object.assign({
    	    position: 'absolute',
    	    top: 0,
    	    left: 0,
    	    height: '100%',
    	    width: '100%',
    	    borderRadius: '50%',
    	    backgroundColor: color
        }, style);
        return (
          	<div style={mergedStyles} ref={v => this.view = v}/>
        );
	}
}

Circle.defaultProps = {
    aborted: false
}

export default Circle;