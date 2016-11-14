import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import IconPopover from 'components/IconPopover';
import SelectField from 'components/SelectField';
import Drawer from 'components/Drawer';
import Radio from 'components/Radio';
import Dialog from 'components/Dialog';
import {index} from 'utils/dom';
import {history} from 'routes';
import styles from './styles.css';

class ApplyDialog extends Component {
	state = {
		applyType: 0
	}

	open() {
		this.dialog.open('申请');
	}

	onChange(val) {
		console.log(val);
	}

	render() {
		const menuItems =['购买', '领用', '退还', '维修', '维护'];

		return (
			<Dialog
                customClassName="apply-dialog"
                onConfirm={this.onConfirm}
                ref={r => this.dialog = r}
            >
            	<SelectField name="type" menuItems={menuItems} onChange={this.onChange} />
            	<Radio />
            </Dialog>
		)
	}
}

class AppBar extends Component {
	goNotification() {
		history.push('/notifications');
	}
	
	openDrawer = () => {
		this.drawer.open();
	}
	
	onApply = () => {
		this.applyDialog.open();
	}

	manageAccount = (e) => {
		const currentIndex = index(e.currentTarget);

		if (!currentIndex) {
			history.push('/setting');
		} else {
			history.push('/signin')
		}
	}

	getAccountMenu = () => {
		const setting = (
			<div className="account">
				<i className="mdi mdi-settings"></i>设置
			</div>
		);

		const signout = (
			<div className="account" onClick={this.signout}>
				<i className="mdi mdi-signout"></i>登出
			</div>
		);
		return [setting, signout];
	}

	render() {
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
							onClick={this.onApply}
						/>
						<IconButton 
							icon="mdi-bell" 
							color="#b4c5cd"  
							hasBadge={true}
							onClick={this.goNotification}
						/>
						<IconPopover 
							menuItems={this.getAccountMenu()}
							onClose={this.manageAccount}
							icon="mdi-account-circle"
						/>
					</div>
				</header>

				<Drawer 
					docked={false} 
					title="管理" 
					drawerItems={drawerItems} 
					ref={r => this.drawer = r} 
				/>

				<ApplyDialog ref={r => this.applyDialog = r} />
			</div>
		)
	}
}

export default AppBar;