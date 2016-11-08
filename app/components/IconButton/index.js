import React from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

function IconButton(props) {
	const {onClick, icon, color, hasBadge, action, centerRipple, tooltip} = props;
	const defaultCenter = centerRipple == false ? false : true;
	const classIcon = 'mdi ' + icon;
	const btnProps = {
		className: 'btn-icon ' + (hasBadge ? 'is-badged' : '') + (action ? 'action' : '') + (tooltip ? 'tooltip' : '')
	}

	hasBadge && (btnProps['data-badge'] = 3);
	
	tooltip && (btnProps['data-tooltip'] = tooltip);

	return (
		<button {...btnProps} onClick={onClick}>
			<i className={classIcon}></i>
			<Ripple centerRipple={defaultCenter} color={color}/>
		</button>
	)
}

IconButton.defaultProps = {
	color: '#fff'
}

export default IconButton;