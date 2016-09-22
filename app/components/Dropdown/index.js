import React, {Component} from 'react';
import Menu from 'components/Menu';
import styles from './styles.css';

class Dropdown extends Component {
	render() {
		const {menuItems, hierarchy} = this.props;

		const style = {
			display: 'inline-block',
			height: '24px',
			width: '24px',
			color: 'rgba(0, 0, 0, 0.870588)',
			fill: 'rgb(224, 224, 224)'
		}
		return (
			<div className="dropdown">
				<input className="dropdown-input"/>
				<Menu menuItems={menuItems} hierarchy={hierarchy}/>
				<label>
					<svg viewBox="0 0 24 24" style={style}>
						<path d="M7 10l5 5 5-5z"></path>
					</svg>
				</label>
			</div>
		)
	}
}

export default Dropdown;