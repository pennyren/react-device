import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import Popover from 'components/Popover';
import styles from './styles.css';

class IconMenu extends Component {
	toggle = () => {
		this.Popover.toggle();
	}
	
	render() {
		const {menuItems, icon, hasBadge} = this.props;
	
		return (
			<div className="icon-menu">
				<IconButton color="#b4c5cd" icon={icon} hasBadge={hasBadge} onClick={this.toggle}/>
				<Popover 
					items={menuItems} 
					hierarchy={2} 
					alignment="BOTTOM_LEFT"
					ref={r => this.Popover = r}
				/>
			</div>
		)
	}
}

export default IconMenu;