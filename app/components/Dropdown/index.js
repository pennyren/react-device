import React, {Component} from 'react';
import Menu from 'components/Menu';
import styles from './styles.css';

class Dropdown extends Component {
	render() {
		const {menuItems, hierarchy} = this.props;

		
		return (
			<div className="dropdown">
				<input className="dropdown-input" readOnly={true} defaultValue="redux"/>
				<label className="dropdown-label">
					<svg viewBox="0 0 24 24">
						<path d="M7 10l5 5 5-5z"></path>
					</svg>
				</label>
				<Menu menuItems={menuItems} hierarchy={hierarchy}/>
			</div>
		)
	}
}

export default Dropdown;