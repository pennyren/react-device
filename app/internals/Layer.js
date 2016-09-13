import {Component} from 'react';
import ReactDOM from 'react-dom';
import stringifyStyles from 'utils/stringifyStyles';

class Layer extends Component {
	defaultProps = {
		useLayerForClickAway: false,
		clearBindEvents: true
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
		if (this.props.clearBindEvents) {
			ReactDOM.unmountComponentAtNode(this.layerElement);
					
		} 
		if (this.props.removeLayer) {
			document.body.removeChild(this.layer);
		}
	}

	renderLayer() {
		const {open} = this.props;
		if (open) {
			if (!this.layer) {

				this.layer = document.createElement('div');
				document.body.appendChild(this.layer);

				
			}
			const layerElement = this.props.children;
			this.layerElement = ReactDOM.render(layerElement, this.layer);;

		} else {
			this.unrenderLayer();
		}
	}

	render() {
		return null;
	}

}


export default Layer;