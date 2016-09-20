import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import Popover from 'components/Popover';
import styles from './styles.css';

class IconMenu extends Component {
	toggleMenu = () => {
		
		this.Popover.show();
	}

	render() {
		const {menuItems, icon, hasBadge} = this.props;
		return (
			<div className="icon-menu">
				<IconButton color="#b4c5cd" icon={icon} hasBadge={hasBadge} onClick={this.toggleMenu}/>
				<Popover items={menuItems} ref={r => this.Popover = r}/>
			</div>
		)
	}
}

export default IconMenu;