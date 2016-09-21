import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import ClickAway from 'internals/ClickAway';
import ReactTransitionGroup  from 'react-addons-transition-group';
import styles from './styles.css';

class TransitionItem extends Component {
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
        
       	this.leaveTimer = setTimeout(callback, 200);
    }
	
	animate() {
		const child = this.Popover.children[0];
		const style = this.Popover.style;
		this.Popover.classList.add('active');
		
		
		
		
	}

	initAnimation(callback) {
		this.style = this.Popover.style;
		this.shadowStyle = this.Popover.children[0].style;
		this.contentStyle = this.Popover.children[1].style;
		const height = this.Popover.children[1].clientHeight;

		this.style.height = height + 'px';


		
		
		this.enterTimer = setTimeout(callback, 0);
	}

	applyClip() {
		const rect = this.Popover.getBoundingClientRect();
		console.log(rect)
		return 'rect(0 ' + '0 ' + rect.height + 'px ' + rect.width + 'px)';
		
	}

	render() {
		const {items, onClickAway, hierarchy} = this.props;
		const lists = items.map((item, index) => {
			return (
				<li className="item" key={index}>
					<Ripple color="#bababa"/>
					{item}
				</li>
			)
		});

		return (
			<ClickAway onClickAway={onClickAway} hierarchy={hierarchy}>
				<div className="popover" ref={r => this.Popover = r}>
					<div className="shadow"></div>
					<ul className="menu">
						{lists}
					</ul>
				</div>
			</ClickAway>
		)
	}
}

class Popover extends Component {
	state = {
		open: false
	}

	toggle = () => {
		this.setState({open: !this.state.open});
	}

	removeAway = (e) => {
		this.setState({open: false});
	}

	render() {
		const {items, hierarchy} = this.props;

		return (
			<ReactTransitionGroup component="div">
				{this.state.open && 
					<TransitionItem 
						items={items}
						hierarchy={hierarchy}
						onClickAway={this.removeAway}
					/>}
			</ReactTransitionGroup>
		)
	}
}

export default Popover; 