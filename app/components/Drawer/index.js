import React, {Component} from 'react';
import styles from './styles.css';

class Drawer extends Component {
	render() {
		const {docked} = this.props;
		return (
			<div>
				<div className="drawer"></div>
				{!docked && <div className="obfuscator"></div>}
			</div>
		);
	}
}

export default Drawer;