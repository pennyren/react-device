import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import Popover from 'components/Popover';
import styles from './styles.css';

class IconMenu extends Component {
	render() {
		const {menuItems, icon, hasBadge} = this.props;
		return (
			<div className="icon-menu">
				<IconButton color="#b4c5cd" icon={icon} hasBadge={hasBadge}/>
				<Popover items={menuItems} />
			</div>
		)
	}
}

export default IconMenu;