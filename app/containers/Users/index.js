import React, {Component} from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import Snackbar from 'components/Snackbar';
import Popconfirm from 'components/Popconfirm';
import Dialog from 'components/Dialog';
import TextField from 'components/TextField'; 
import SelectField from 'components/SelectField';
import IconButton from 'components/IconButton';
import getPropsFromInputs from 'utils/form';
import getEnumVal from 'utils/enums';
import fetch from 'utils/fetch';
import {closest} from 'utils/dom';
import moment from 'utils/date';
import {connect} from 'react-redux';
import store from 'store';

import styles from './styles.css';

class UserDialog extends Component {
	state = {
		isEdit: false,
		user: {}
	}

	open(config) {
		const {isEdit, user, title} = config;
		this.setState({isEdit: isEdit, user: user});
		this.dialog.open(title);
	}

	onConfirm = (dialogContent) => {
		const user = getPropsFromInputs(dialogContent);
		const isEdit = this.state.isEdit;
		user.role = getEnumVal('userRole', user.role);
		if (isEdit) {
			user.utime = moment.get();
			store.dispatch({type: 'UPDATE_USER_ASYNC', user: {id: this.state.user.id, entity: user}})
		} else {
			user.ctime = moment.get();
			store.dispatch({type: 'ADD_USER_ASYNC', user: user})
		}
		this.dialog.close();
	}

	render() {
		const menuItems =['教师', '主任', '院长', '经费管理员', '系统管理员'];
		const {username, pwd, role} = this.state.user;
		return (
			<Dialog
                	customClassName="user-dialog"
                	onConfirm={this.onConfirm}
                	ref={r => this.dialog = r}
                >
            	<SelectField name="role" menuItems={menuItems} value={role}/>
            	<TextField name="username" placeholder="姓名" value={username}/>
            	<TextField name="pwd" placeholder="初始密码"value={pwd} />
            </Dialog>
		)
	}
}

class Users extends Component {
	componentDidMount() {
		store.dispatch({type: 'INIT_USERS_ASYNC'});
	}
	
	onBatchDelete = (e) => {
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
		store.dispatch({type: 'BATCH_DELETE_USERS_ASYNC', ids: ids});
	}

	onAdd = () => {
		this.userDialog.open({title: '添加用户', user: {}, isEdit: false});
	}

	onSearch = () => {
		const value = this.header.textfield.input.value.trim();
		store.dispatch({type: 'SEARCH_USERS_ASYNC', search: value});
	}

	onModify = (e) => {
		const currentRow = closest(e.currentTarget, '.row');
		const id = currentRow.getAttribute('data-id');
		const usersList = store.getState().users.list;
		let currentUser = null;
		let i = usersList.length;
		while (i--) {
			if (usersList[i].id == id) {
				currentUser = usersList[i];
				break;
			} 
		}
		this.userDialog.open({title: '编辑用户', user: currentUser, isEdit: true});
	}

	render() {
		const columns =['姓名', '角色', '创建时间', '操作'];
		const display = ['username', 'role', 'ctime'];
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
				>
					<IconButton icon="mdi-pen" color="#b4c5cd" onClick={this.onModify} tooltip={'编辑'}/>
				</Table>

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
                	ref={r => this.popconfirm = r}
                />

                <UserDialog ref={r => this.userDialog = r} />
            </div>
		);
	}
}

const mapStateToProps = function(store) {
	const {currentPage, totalPage, list} = store.users;
	return {
		current: currentPage,
		total: totalPage,
		list: list
	}
}

export default connect(mapStateToProps)(Users);