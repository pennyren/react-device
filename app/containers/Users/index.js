import React, {Component} from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import Snackbar from 'components/Snackbar';
import Popconfirm from 'components/Popconfirm';
import Dialog from 'components/Dialog';
import TextField from 'components/TextField'; 
import SelectField from 'components/SelectField';
import getPropsFromInputs from 'utils/form';
import getEnumVal from 'utils/enums';
import moment from 'utils/date';

import {connect} from 'react-redux';
import store from 'store';

import styles from './styles.css';

class Users extends Component {
	componentDidMount() {
		store.dispatch({type: 'INIT_USERS_REQ'});
	}

	componentWillUnmount() {
		store.dispatch({type: 'UNMOUNT_USERS'});
	}

	onBatchDelete = (e) => {
		if (this.popconfirm.isOpen()) {
			this.popconfirm.close();
			return;
		}
		
		const rows = this.table.tableBody.getElementsByClassName('row');
		const ids = [];
		let len = rows.length;
		while (len --) {
			const row = rows[len];
			const isChecked = row.querySelector('input[type=checkbox]').checked;
			isChecked && ids.push(+row.getAttribute('data-id'))
		}
		
		if (ids.length) {
			this.checkedIds = ids;
			this.popconfirm.open(e);
		} else {
			this.checkedIds = [];
			this.snackbar.open()
		}
	}

	onBatchDeleteConfirm = () => {
		const ids = this.checkedIds;
		this.popconfirm.close();
		store.dispatch({type: 'BATCH_DELETE_USERS_REQ', ids: ids});
	}

	onAdd = () => {
		this.dialog.open();
	}

	onSearch = () => {
		const value = this.header.textfield.input.value.trim();
	}

	onConfirm = (dialogContent) => {
		const user = getPropsFromInputs(dialogContent);
		user.role = getEnumVal('userRole', user.role);
		user.ctime = moment.get();
		this.dialog.close();
		store.dispatch({type: 'ADD_USER_REQ', user: user});
	}

	render() {
		const columns =['姓名', '角色', '创建时间', '操作'];
		const display = ['username', 'role', 'ctime'];
		const menuItems =['教师', '主任', '院长', '经费管理员', '系统管理员'];
		const {current, total, list} = this.props; 
		
		return (
			<div className="users">
				<Header
					title="用户"
					onBatchDelete={this.onBatchDelete}
					onAdd={this.onAdd}
					onSearch={this.onSearch}
					ref={r => this.header = r}
				/>
				<Table 
					columns={columns}
					dataSource={list}
					display={display}
					action={true}
					ref={r => this.table = r}
				/>
				<Pagination
					total={total}
					current={current}
				/>
				<Snackbar 
                    message="请选择要删除的内容!"
                    type="warning"
                    ref={r => this.snackbar = r}
                />
                <Popconfirm 
                	message="你确定要删除选择的内容吗?"
                	onConfirm={this.onBatchDeleteConfirm}
                	ref={r => this.popconfirm = r}/>
                <Dialog
                	title="添加用户"
                	customClassName="user-dialog"
                	onConfirm={this.onConfirm}
                	ref={r => this.dialog = r}
                >
                	<SelectField name="role" menuItems={menuItems} />
                	<TextField name="username" placeholder="姓名" />
                	<TextField name="pwd" placeholder="初始密码" />
                </Dialog>
			</div>
		);
	}
}

const mapStateToProps = function(store) {
	const {currentPage, totalPage, list, isInitialized} = store.users;
	return {
		current: currentPage,
		total: totalPage,
		list: isInitialized ? list : []
	}
}

export default connect(mapStateToProps)(Users);