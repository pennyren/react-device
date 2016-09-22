import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import ClickAway from 'internals/ClickAway';
import styles from './styles.css';

class Menu extends Component {
	componentDidMount() {

	}

	showUp() {

	}

	hide() {

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
			<ClickAway onClickAway={this.hide} hierarchy={hierarchy}>
				<div className="menu-container">
					<ul className="menu" ref={r => this.menu = r}>
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
	hierarchy: React.PropTypes.number
}

*/

export default Menu;