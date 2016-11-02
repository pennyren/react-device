import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {on, off} from 'utils/events';
import {isDescendant} from 'utils/dom';

class ClickAway extends Component {
	static defaultProps = {
		onClickKeepElement: null,
		hierarchy: 0
	}

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

    	const {onClickAway} = this.props;

    	if (this.isCurrentlyMounted) {
    		const el = this.comparedNode;
    		if (document.documentElement.contains(e.target) && !isDescendant(el, e.target)) {
    			onClickAway(e);
      		}
    	}
	}

	render() {
		return this.props.children;
	}
}

/*

ClickAway.propTypes = {
	onClickAway: React.PropTypes.func,
	hierarchy: React.PropTypes.number,
	onClickKeepElement: object
}

*/

export default ClickAway;