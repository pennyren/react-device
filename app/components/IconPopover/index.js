import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import Popover from 'components/Popover';
import styles from './styles.css';

class IconPopover extends Component {
	toggle = () => {
		this.Popover.toggle();
	}
	
	render() {
		const {menuItems, icon, hasBadge, onClose} = this.props;
	
		return (
			<div className="icon-popover">
				<IconButton color="#b4c5cd" icon={icon} hasBadge={hasBadge} onClick={this.toggle}/>
				<Popover 
					items={menuItems} 
					hierarchy={2} 
					alignment="BOTTOM_LEFT"
					onClose={onClose}
					ref={r => this.Popover = r}
				/>
			</div>
		)
	}
}

export default IconPopover;