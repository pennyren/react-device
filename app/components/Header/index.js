import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import TextField from 'components/TextField';
import styles from './styles.css';

class Header extends Component {
	render() {
		const {title} = this.props;
		return (
			<div className="header clearfix">
				<span className="title">{title}</span>
				<IconButton 
					icon="mdi-plus" 
					centerRipple={false}
					action={true}
				/>
				<IconButton 
					icon="mdi-minus" 
					centerRipple={false}
					action={true}
				/>
				<IconButton 
					icon="mdi-search" 
					color="#b4c5cd"
				/>
				<TextField name="search" isFloat={false} placeholder="search"/>
			</div>
		);
	}
}

export default Header;