import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {on, off} from 'utils/events';
import {isDescendant} from 'utils/dom';

class ClickAway extends Component {
	componentDidMount() {
		let hierarchy = this.props.hierarchy;
		this.isCurrentlyMounted = true;
		this.comparedNode = ReactDOM.findDOMNode(this);
		while (hierarchy --) {
			this.comparedNode = this.comparedNode.parentNode;
		}

		this.props.onClickAway && on(document, 'mouseup', this.handleClickAway, false);
	}

	componentWillUnmount() {
		this.isCurrentlyMounted = false;
		off(document, 'mouseup', this.handleClickAway);
	}

	handleClickAway = (e) => {
		if (e.defaultPrevented) {
      		return;
    	}

    	if (this.isCurrentlyMounted) {
    		const el = this.comparedNode;
    		if (document.documentElement.contains(e.target) && !isDescendant(el, e.target)) {
    			this.props.onClickAway(e);
      		}
    	}
	}

	render() {
		return this.props.children;
	}
}

export default ClickAway;