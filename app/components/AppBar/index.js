import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import IconMenu from 'components/IconMenu';
import styles from './styles.css';

class AppBar extends Component {
	render() {
		const items = ['hello react', 'hello react', 'hello react']
		return (
			<div className="nav">
				<header>
					<IconButton classIcon="mdi-menu" color="#b4c5cd"/>
					<IconMenu items={items}/>
				</header>
			</div>
		)
	}
}

export default AppBar;