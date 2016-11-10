import React from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

function IconButton(props) {
	const {onClick, icon, color, hasBadge, action, centerRipple, tooltip, customClassName} = props;
	const defaultCenter = centerRipple == false ? false : true;
	const classIcon = 'mdi ' + icon;
	let className = ['btn-icon'];
	const finalProps = {};
	if (hasBadge) {
		finalProps['data-badge'] = 3;
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
		<button {...finalProps} onClick={onClick}>
			<i className={classIcon}></i>
			<Ripple centerRipple={defaultCenter} color={color}/>
		</button>
	)
}

IconButton.defaultProps = {
	color: '#fff'
}

export default IconButton;