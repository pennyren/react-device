import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import ClickAway from 'internals/ClickAway';
import styles from './styles.css';

class Menu extends Component {
	showUp = () => {
			this.menu.classList.add('show');
	}

	close = () => {
		this.menu.classList.remove('show');
		this.props.closeParent();
	}

	render() {
		const {menuItems, hierarchy} = this.props;
		const lists = menuItems.map((item, index) => {
			return (
				<li className="item" key={index}>
					<Ripple color="#bababa"/>
					{item}
				</li>
			)
		});

		return (
			<ClickAway onClickAway={this.close} hierarchy={hierarchy}>
				<div className="menu-container" ref={r => this.menu = r}>
					<ul className="menu">
						{lists}
					</ul>
				</div>
			</ClickAway>    
		)
	}
}

/*

Menu.propTypes = {
	items: React.PropTypes.array,
	hierarchy: React.PropTypes.number,
	setValue: React.PropTypes.func,
	closeParent: React.PropTypes.func,
	checkedValue: React.PropTypes.string
}

*/

export default Menu;