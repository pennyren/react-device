import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import IconMenu from 'components/IconMenu';
import Drawer from 'components/Drawer';
import styles from './styles.css';

class AppBar extends Component {
	openDrawer = () => {
		this.drawer.openDrawer();
	}

	render() {
		const menuItems = ['hello react', 'hello react', 'hello react']
		const drawerItems = [{icon: 'mdi-account', name: '用户'}, {icon: 'mdi-mac', name: '设备'}];

		return (
			<div className="nav">
				<header>
					<IconButton icon="mdi-menu" color="#b4c5cd" onClick={this.openDrawer}/>
					<div className="operate">
						<IconButton icon="mdi-search" color="#b4c5cd" />
						<IconButton icon="mdi-plus" color="#b4c5cd" />
						<IconMenu menuItems={menuItems} icon="mdi-bell" hasBadge={true}/>
						<IconMenu menuItems={menuItems} icon="mdi-account-circle"/>
						
					</div>
					
					

				</header>
				<Drawer 
					docked={false} 
					title="管理" 
					drawerItems={drawerItems} 
					ref={r => this.drawer = r} 
				/>
			</div>
		)
	}
}

export default AppBar;