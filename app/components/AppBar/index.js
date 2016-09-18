import React, {Component} from 'react';
import IconMenu from 'components/IconMenu';
import styles from './styles.css';

class AppBar extends Component {
	render() {
		const items = ['hello react', 'hello react', 'hello react', 'hello react']
		return (
			<div className="nav">
				<header>
					<IconMenu items={items}/>
				</header>
			</div>
		)
	}
}

export default AppBar;