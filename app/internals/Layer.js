import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Layer extends Component {
	defaultProps = {
		useLayerForClickAway: false
	}

	componentDidMount() {
		this.renderLayer();
	}

	componentDidUpdate() {
		this.renderLayer();
	}

	componentWillUnmount() {
		this.unrenderLayer();
	}

	unrenderLayer() {
		if (!this.layer) {
			return;
		}

		ReactDOM.unmountComponentAtNode(this.layer);
		document.body.removeChild(this.layer);
		this.layer = null;
	}

	renderLayer() {
		const {open, children} = this.props;
		
		if (open) {
			if (!this.layer) {
				this.layer = document.createElement('div');
				document.body.appendChild(this.layer);
			}
			
			this.layerElement = ReactDOM.render(children, this.layer);
		} else {
			this.unrenderLayer();
		}
	}
	
	render() {
		return null;
	}
}

export default Layer;