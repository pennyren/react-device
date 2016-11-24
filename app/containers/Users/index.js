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
		store.dispatch({type: 'GET_USERS_ASYNC', currentPage: 1});
	}
	
	onDelete = (e) => {
		const checkedRows = this.table.tableBody.querySelectorAll('.row .checkbox.checked');
		const i = checkedRows.length;
		i ? this.popconfirm.open(e) : this.snackbar.open();
	}

	onDeleteConfirm = () => {
		const checkedRows = this.table.tableBody.querySelectorAll('.row .checkbox.checked');
		const i = checkedRows.length;
		let checkedIds = [];
		if (i == 0) {
			this.snackbar.open();
			return;
		}
		for (const row of checkedRows) {
			checkedIds.push(+closest(row, '.row').getAttribute('data-id'))
		}
		this.popconfirm.close();
		store.dispatch({type: 'DELETE_USERS_ASYNC', ids: checkedIds});
	}

	onAdd = () => {
		this.userDialog.open({title: '添加用户', user: {}, isEdit: false});
	}

	onSearch = () => {
		const value = this.header.textfield.input.value.trim();
		store.getState().users.search = value;
		store.dispatch({type: 'GET_USERS_ASYNC', currentPage: 1});
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

	onPaginated = (currentPage) => {
		store.dispatch({type: 'GET_USERS_ASYNC', currentPage});
	}

	renderAction = (row, prop) => {
		if (prop == 'action') {
			return <IconButton 
						icon="mdi-pen" 
						color="#b4c5cd" 
						onClick={this.onModify} 
						tooltip={'编辑'}
					/>;
		} else {
			return row[prop];
		}
	}

	render() {
		const columns = {
			username: '姓名',
			role: '角色',
			ctime: '创建时间',
			action: '操作'
		};
		const columnStyle = {
			username: 'calc(50% - 168px)',
			role: '25%',
			ctime: '25%',
			action: 96
		};
		const columnClass = {
			action: 'action'
		};

		const {current, total, list} = this.props; 
		return (
			<div className="users">
				<Header
					title="用户"
					onBatchDelete={this.onDelete}
					onAdd={this.onAdd}
					onSearch={this.onSearch}
					ref={r => this.header = r}
				/>

				<Table 
					columns={columns}
					dataSource={list}
					columnStyle={columnStyle}
					columnClass={columnClass}
					columnFactory={this.renderAction}
					ref={r => this.table = r}
				/>

				<Pagination
					current={current}
					total={total}
					onChange={this.onPaginated}
				/>

				<Snackbar 
                    message="请选择要删除的内容!"
                    type="warning"
                    ref={r => this.snackbar = r}
                />

                <Popconfirm 
                	message="你确定要删除选择的内容吗?"
                	onConfirm={this.onDeleteConfirm}
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