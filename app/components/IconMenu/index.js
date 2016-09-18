import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import Popover from 'components/Popover';
import styles from './styles.css';

class IconMenu extends Component {
	render() {
		const {items} = this.props;
		return (
			<div className="icon-menu">
				<button className="btn-icon">
					<i className="mdi mdi-dots"></i>
					<Ripple centerRipple={true} color="#000"/>
				</button>
				<Popover items={items} />
			</div>
		)
	}
}

export default IconMenu;