import {Component} from 'react';
import ReactDOM from 'react-dom';
import stringifyStyles from 'utils/stringifyStyles';

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