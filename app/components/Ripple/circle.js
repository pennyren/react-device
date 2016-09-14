import React, {Component} from 'react';

class Circle extends Component {

    static defaultProps = {
        aborted: false
    }

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
        const style = this.Circle.style;
        style.opacity = 0.01;
        const removeAfter = this.props.aborted ? 0 : 2000;
        this.leaveTimer = setTimeout(callback, removeAfter);
    }

    animate() {
        const style = this.Circle.style;
        const opcity = 'opacity 2s cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        const transform = 'transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        style.transform = 'scale(1)';
        style.transition = opcity + ', ' + transform;
    }

    initAnimation(callback) {
        const style = this.Circle.style;
        style.opacity = this.props.opacity;
        style.transform = 'scale(0)';
        this.enterTimer = setTimeout(callback, 0);
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
          	<div style={mergedStyles} ref={v => this.Circle = v}/>
        );
	}
}

export default Circle;