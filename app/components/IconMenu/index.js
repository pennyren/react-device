import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import Popover from 'components/Popover';
import styles from './styles.css';

class IconMenu extends Component {
	render() {
		const {items} = this.props;
		return (
			<div className="icon-menu">
				<IconButton color="#b4c5cd" classIcon="mdi-dots"/>
				<Popover items={items} />
			</div>
		)
	}
}

export default IconMenu;