import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import styles from './styles.css';

class Drawer extends Component {
	closeDrawer = () => {
		this.Drawer.classList.remove('is-visible');
	}

	openDrawer = () => {
		this.Drawer.classList.add('is-visible');
	}

	render() {
		const {docked, title, drawerItems} = this.props;

		const renderItems = drawerItems.map((item, index) => {
			const className = 'mdi ' + item.icon;
			return (
				<li className="drawer-item" key={index}>
					<Ripple color="#bababa"/>
					<i className={className}></i>
					{item.name}
				</li>
			)
		});

		return (
			<div className="drawer-wrapper" ref={v => this.Drawer =v}>
				<div className="drawer">
					<span className="title" onClick={this.closeDrawer}>{title}</span>
					<ul className="drawer-lists">
						{renderItems}
					</ul>
				</div>
				{!docked && <div className="obfuscator" onClick={this.closeDrawer}></div>}
			</div>
		);
	}
}

export default Drawer;