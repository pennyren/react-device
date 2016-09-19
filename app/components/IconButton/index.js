import React from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

function IconButton(props) {
	const {onClick, icon, color, hasBadge} = props;
	const classIcon = 'mdi ' + icon;
	const btnProps = {
		className: 'btn-icon ' + (hasBadge ? 'is-badged' : '')
	}

	hasBadge && (btnProps['data-badge'] = 3);
	

	return (
		<button {...btnProps} onClick={onClick}>
			<i className={classIcon}></i>
			<Ripple centerRipple={true} color={color}/>
		</button>
	)
}

export default IconButton;