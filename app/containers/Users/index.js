import React, {Component} from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import Snackbar from 'components/Snackbar';
import Popconfirm from 'components/Popconfirm';
import Dialog from 'components/Dialog'
import TextField from 'components/TextField'; 
import SelectField from 'components/SelectField';
import getPropsFromInputs from 'utils/form';

import {connect} from 'react-redux';
import store from 'store';

import styles from './styles.css';

class Users extends Component {
	componentDidMount() {

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
			this.popconfirm.open(e);
		} else {
			this.snackbar.open()
		}
	}

	onAdd = () => {
		this.dialog.open();
	}

	onSearch = () => {
		const value = this.header.textfield.input.value.trim();
		
	}

	onConfirm = (dialogContent) => {
		const user = getPropsFromInputs(dialogContent);
		store.dispatch({type: 'ADD_USER_REQ', user: user});
		this.dialog.close();
	}

	render() {
		const columns =['姓名', '角色', '创建时间'];
		const menuItems =['教师', '主任', '院长', '经费管理员', '系统管理员'];
		let dataSource = [];
	
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
					dataSource={dataSource}
					action={false}
					ref={r => this.table = r}
				/>
				<Pagination />
				<Snackbar 
                    message="请选择要删除的内容!"
                    type="warning"
                    ref={r => this.snackbar = r}
                />
                <Popconfirm message="你确定要删除选择的内容吗?" ref={r => this.popconfirm = r}/>
                <Dialog
                	title="添加用户"
                	customClassName="user-dialog"
                	onConfirm={this.onConfirm}
                	ref={r => this.dialog = r}
                >
                	<SelectField name="role" menuItems={menuItems} />
                	<TextField name="username" placeholder="姓名" />
                	<TextField name="password" placeholder="初始密码" />
                </Dialog>
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