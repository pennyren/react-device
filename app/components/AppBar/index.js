import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import IconPopover from 'components/IconPopover';
import Drawer from 'components/Drawer';
import IconTextField from 'components/IconTextField';
import styles from './styles.css';

class AppBar extends Component {
	openDrawer = () => {
		this.drawer.openDrawer();
	}

	setAccount = () => {
		console.log(1);
	}

	signout = () => {
		console.log(2);
	}

	render() {
		const setting = (
			<div className="account-item setting" onClick={this.setAccount}>
				<i className="mdi mdi-settings"></i>设置
			</div>
		);

		const signout = (
			<div className="account-item signout" onClick={this.signout}>
				<i className="mdi mdi-signout"></i>登出
			</div>
		);

		const accountMenu = [setting, signout];

		const menuItems = ['hello react', 'hello react', 'hello react']
		const drawerItems = [{icon: 'mdi-account', name: '用户'}, {icon: 'mdi-mac', name: '设备'}];
		
		return (
			<div className="nav">
				<header>
					<IconButton icon="mdi-menu" color="#b4c5cd" onClick={this.openDrawer}/>
					<div className="operate">
						<IconTextField name="search" icon="mdi-search"/>
						<IconButton icon="mdi-plus" color="#b4c5cd" />
						<IconPopover menuItems={menuItems} icon="mdi-bell" hasBadge={true}/>
						<IconPopover menuItems={accountMenu} icon="mdi-account-circle"/>
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