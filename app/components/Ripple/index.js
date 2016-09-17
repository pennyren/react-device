import React from 'react';
import ReactTransitionGroup  from 'react-addons-transition-group';
import Circle from './circle';
import styles from './styles.css';

class Ripple extends React.Component {
	static defaultProps = {
		color: '#fff',
		opacity: 0.3
	}

	state = {
		nextKey: 0,
		ripples: []
	}
	
	start(e) {
		let ripples = [...this.state.ripples, (
			<Circle
				key={this.state.nextKey}
				color={this.props.color}
				opacity={this.props.opacity}
				style={!this.props.centerRipple ? this.getRippleStyle(e) : {}}
			/>
		)];

		this.setState({
      		nextKey: this.state.nextKey + 1,
      		ripples: ripples,
    	});

	}
	
	end() {
		const shift = ([, ...newArray]) => newArray;
		const currentRipples = this.state.ripples;
    	this.setState({
     		ripples: shift(currentRipples)
    	});
	}
	
	getRippleStyle(e) {
		const el = this.Ripple;
		const elHeight = el.offsetHeight;
    	const elWidth = el.offsetWidth;
		const rect = el.getBoundingClientRect();
   
    	const offset = {
      		top: rect.top + document.body.scrollTop,
      		left: rect.left + document.body.scrollLeft,
    	};

    	const pageX = e.pageX;
	    const pageY = e.pageY;
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
		  	height: rippleSize,
		    width: rippleSize,
		    top: top,
		    left: left
	    };
	}
	
	calcDiag(a, b) {
		return Math.sqrt((a * a) + (b * b));
	}

	handleMouseDown = (e) => {
		if (e.button == 0) {
			this.start(e);
		}
	}
	
	handleMouseUp = () => {
		this.end();
	}
	
	handleMouseLeave = () => {
		this.end();
	}
	
	render() {
		const {ripples} = this.state;
		
		return (
			<div 
				className="ripple"
				onMouseUp={this.handleMouseUp}
        		onMouseDown={this.handleMouseDown}
        		onMouseLeave={this.handleMouseLeave}
        		onTouchStart={this.handleTouchStart}
        		onTouchEnd={this.handleTouchEnd}
        		ref={v => this.Ripple = v}
        	>
	      		<ReactTransitionGroup >
	        		{ripples}
	      		</ReactTransitionGroup>
	      	</div>
		)
	}
}

export default Ripple;