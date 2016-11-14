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
        this.leaveTimer = setTimeout(callback, 0);
    }
	
	animate() {
		this.style.visiblity = 'visible';
		this.style.transition = 'visiblity .3s cubic-bezier(.4,0,.2,1)';

		this.shadowStyle.transform = 'scale(1)';
		this.shadowStyle.opacity = 1;
		this.shadowStyle.transition = 'transform .3s cubic-bezier(.4,0,.2,1),opacity .2s cubic-bezier(.4,0,.2,1)';
		
		this.contentStyle.clip = this.intact;
		this.contentStyle.opacity = 1;
		this.contentStyle.transition = 'clip .3s cubic-bezier(.4,0,.2,1),opacity .2s cubic-bezier(.4,0,.2,1)';
	}

	initAnimation(callback) {
		this.style = this.popover.style;
		this.shadowStyle = this.popover.children[0].style;
		this.contentStyle = this.popover.children[1].style;

		this.style.height = this.popover.children[1].clientHeight + 'px';
		this.style.visiblity = 'hidden';

		this.shadowStyle.transformOrigin = this.getTransformOrigin();
		this.shadowStyle.transform = 'scale(0)';
		this.shadowStyle.opacity = 0;

		this.contentStyle.clip = this.applyClip();
		this.contentStyle.opacity = 0;
		this.enterTimer = setTimeout(callback, 0);
	}

	applyClip() {
		const popover = this.popover.children[1].getBoundingClientRect();
		const height = popover.height;
		const width = popover.width;
		
		this.intact = 'rect(0 ' + width + 'px ' + height + 'px ' + '0)';

		switch (this.props.alignment) {
			case 'BOTTOM_LEFT':
				return 'rect(0 ' + width + 'px ' + '0 '+ width + 'px)';
			case 'BOTOM_RIGHT':
				return 'rect(0 0 0 0)';
			case 'TOP_LEFT':
				return 'rect(' + height + 'px ' + width + 'px ' + height + 'px ' + width + 'px)';
			case 'TOP_RIGHT':
				return 'rect(' + height + 'px ' + '0 ' + height + 'px ' + '0)';
			default:
				return '';
		}
	}

	getTransformOrigin() {
		switch (this.props.alignment) {
			case 'BOTTOM_LEFT':
				return '100% 0';
			case 'BOTOM_RIGHT':
				return '0 0';
			case 'TOP_LEFT':
				return '100% 100%';
			case 'TOP_RIGHT':
				return '0 100%';
			default:
				return '';
		}
	}
	
	render() {
		const {items, onClickAway, hierarchy, onActive} = this.props;
		const lists = items.map((item, index) => {
			return (
				<li className="item" key={index} onClick={onActive}>
					{item}
					<Ripple color="#bababa"/>
				</li>
			)
		});

		return (
			<ClickAway onClickAway={onClickAway} hierarchy={hierarchy}>
				<div className="popover" ref={r => this.popover = r}>
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

	close = () => {
		this.setState({open: false});
	}

	active = (e) => {
		const {onClose} = this.props;
		this.close();
		(typeof onClose == 'function') && onClose(e);

	}

	render() {
		const {items, hierarchy, alignment} = this.props;

		return (
			<ReactTransitionGroup component="div">
				{this.state.open && 
					<TransitionItem 
						items={items}
						hierarchy={hierarchy}
						alignment={alignment}
						onActive={this.active}
						onClickAway={this.close}
					/>}
			</ReactTransitionGroup>
		)
	}
}

export default Popover;