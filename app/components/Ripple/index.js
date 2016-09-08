import React from 'react';
import ReactDOM from 'react-dom';
import Circle from './circle';

class Ripple extends React.Component {
	constructor(props) {
		super(props);
		this.ignoreNextMouseDown = false;
		this.state = {
			hasRipple: false,
			nextKey: 0,
			ripples: []
		};
	}
	start(e) {
		let ripples= this.state.ripples;
		ripples = [...ripples, (
			<Circle
				key={this.state.nextKey}
				style={this.getRippleStyle(e)}
				color={this.props.color}
				opacity={this.props.opacity}
				isTouched={isTouched}
			/>
		)];

		this.setState({
      		hasRipples: true,
      		nextKey: this.state.nextKey + 1,
      		ripples: ripples,
    	});

	}
	end() {
		const currentRipples = this.state.ripples;
    	this.setState({
     		ripples: Array.shift(currentRipples),
    	});
	}
	handleMouseDown(e) {
		if (e.button == 0) {
			this.start(e);
		}
	}
	handleMouseUp() {
		this.end();
	}
	handleMouseLeave() {

	}
	handleTouchStart() {

	}
	handleTouchMove() {

	}
	startListeningForScrollAbort() {

	}
	stopListeningForScrollAbort() {

	}
	getRippleStyle(e) {
		const el = ReactDOM.findDOMNode(this);
    const elHeight = el.offsetHeight;
    const elWidth = el.offsetWidth;
    const offset = Dom.offset(el);
    const isTouchEvent = event.touches && event.touches.length;
    const pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
    const pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
    const pointerX = pageX - offset.left;
    const pointerY = pageY - offset.top;
    const topLeftDiag = this.calcDiag(pointerX, pointerY);
    const topRightDiag = this.calcDiag(elWidth - pointerX, pointerY);
    const botRightDiag = this.calcDiag(elWidth - pointerX, elHeight - pointerY);
    const botLeftDiag = this.calcDiag(pointerX, elHeight - pointerY);
    const rippleRadius = Math.max(
      topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
    );
    const rippleSize = rippleRadius * 2;
    const left = pointerX - rippleRadius;
    const top = pointerY - rippleRadius;

    return {
      directionInvariant: true,
      height: rippleSize,
      width: rippleSize,
      top: top,
      left: left,
    };
	}
	calcDiag(a, b) {
		return Math.sqrt((a * a) + (b * b));
	}
	render() {
		const {hasRipple, ripples} = this.state;

		let rippleGroup;

		if (hasRipple) {
			rippleGroup= (
				<ReactTransitionGroup>
					{ripples}
				</ReactTransitionGroup>
			);
		}

		retrun (
			<div className="ripple"
				onMouseUp={this.handleMouseUp}
        		onMouseDown={this.handleMouseDown}
        		onMouseLeave={this.handleMouseLeave}
        		onTouchStart={this.handleTouchStart}
        		onTouchEnd={this.handleTouchEnd}
      		>
        		{rippleGroup}
       		</div>
		)
	}
}