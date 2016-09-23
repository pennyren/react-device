import React, {Component} from 'react';
import Menu from 'components/Menu';
import styles from './styles.css';

class Dropdown extends Component {
	openMenu = () => {
		this.dropdown.classList.add('is-selected');
		setTimeout(() => this.menu.showUp(), 100);
	}

	close = () => {
		this.dropdown.classList.remove('is-selected');
	}
	setValue = () => {

	}

	render() {
		const {menuItems, hierarchy} = this.props;
		const value = '';
		return (
			<div className="dropdown" onClick={this.openMenu} ref={r => this.dropdown = r}>
				<input className="dropdown-input" readOnly={true} defaultValue="redux"/>
				<label className="dropdown-label">
					<svg viewBox="0 0 24 24">
						<path d="M7 10l5 5 5-5z"></path>
					</svg>
				</label>
				<Menu 
					menuItems={menuItems} 
					hierarchy={hierarchy} 
					closeParent={this.close}
					setValue={this.setValue}
					checkedValue={value}
					ref={r => this.menu = r}
				/>
			</div>
		)
	}
}

export default Dropdown;