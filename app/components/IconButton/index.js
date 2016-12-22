import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

class IconButton extends Component {
	render() {
		const {onClick, icon, color, hasBadge, count, action, centerRipple, tooltip, customClassName} = this.props;
		const defaultCenter = centerRipple == false ? false : true;
		const classIcon = 'mdi ' + icon;
		let className = ['btn-icon'];
		const finalProps = {};
		if (hasBadge && count) {
			finalProps['data-badge'] = count;
			className.push('is-badged');
		}

		if (tooltip) {
			finalProps['data-tooltip'] = tooltip;
			className.push('tooltip');
		}

		if (action) {
			className.push('action');
		}

		if (customClassName) {
			className.push(customClassName);
		}

		finalProps.className = className.join(' ');

		return (
			<button {...finalProps} onClick={onClick} ref={r => this.iconBtn = r}>
				<i className={classIcon}></i>
				<Ripple centerRipple={defaultCenter} color={color}/>
			</button>
		)
	}
}

IconButton.defaultProps = {
	color: '#fff'
}

export default IconButton;