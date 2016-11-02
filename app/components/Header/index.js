import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import TextField from 'components/TextField';
import styles from './styles.css';

class Header extends Component {
	batchDelete = (e) => {
		const {onBatchDelete} = this.props;
		onBatchDelete(e);
	}

	add = () => {
		const {onAdd} = this.props;
		onAdd();
	}

	render() {
		const {title} = this.props;
		return (
			<div className="header clearfix">
				<span className="title">{title}</span>
				<IconButton 
					icon="mdi-plus" 
					centerRipple={false}
					onClick={this.add}
					action={true}
				/>
				<IconButton 
					icon="mdi-minus" 
					centerRipple={false}
					onClick={this.batchDelete}
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