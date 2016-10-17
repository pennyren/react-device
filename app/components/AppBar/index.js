import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import IconPopover from 'components/IconPopover';
import Drawer from 'components/Drawer';
import Dialog from 'components/Dialog';
import {index} from 'utils/dom';
import {history} from 'routes';
import styles from './styles.css';

class AppBar extends Component {
	openDrawer = () => {
		this.drawer.openDrawer();
	}

	manageAccount = (e) => {
		const currentIndex = index(e.currentTarget);

		if (!currentIndex) {
			history.push('/setting');
		} else {
			// do stuff
			setTimeout(() => history.push('/signin'), 200);
		}
	}

	goNotification() {
		history.push('/notifications');
	}

	add = () => {
		this.dialog.open();
	}

	render() {
		const setting = (
			<div className="account" onClick={this.setAccount}>
				<i className="mdi mdi-settings"></i>设置
			</div>
		);

		const signout = (
			<div className="account" onClick={this.signout}>
				<i className="mdi mdi-signout"></i>登出
			</div>
		);

		const accountMenu = [setting, signout];

		
		const drawerItems = [{
			url: '/users',
			name: '用户',
			icon: 'mdi-account'
		}, {
			url: '/equipment',
			name: '设备',
			icon: 'mdi-mac'
		}, {
			url: '/approval',
			name: '审批',
			icon: 'mdi-approval'
		}, {
			url: '/todo',
			name: '待办',
			icon: 'mdi-todo'
		}];

		return (
			<div className="nav">
				<header>
					<IconButton icon="mdi-menu" color="#b4c5cd" onClick={this.openDrawer}/>
					<div className="operate">
						<IconButton 
							icon="mdi-plus" 
							color="#b4c5cd"
							onClick={this.add}
						/>
						<IconButton 
							icon="mdi-bell" 
							color="#b4c5cd"  
							hasBadge={true}
							onClick={this.goNotification}
						/>
						<IconPopover 
							menuItems={accountMenu} 
							icon="mdi-account-circle" 
							onAfterClose={this.manageAccount}
						/>
					</div>
				</header>
				<Drawer 
					docked={false} 
					title="管理" 
					drawerItems={drawerItems} 
					ref={r => this.drawer = r} 
				/>
				<Dialog ref={r => this.dialog = r} />
			</div>
		)
	}
}

export default AppBar;