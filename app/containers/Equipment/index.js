import React, {Component} from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import Snackbar from 'components/Snackbar';
import Popconfirm from 'components/Popconfirm';
import {closest} from 'utils/dom';
import {Link} from 'react-router';
import {history} from 'routes';
import styles from './styles.css';

class Equipment extends Component {
	onDelete = (e) => {
		const checkedRows = this.table.tableBody.querySelectorAll('.row .checkbox.checked');
		checkedRows.length ? this.popconfirm.open(e) : this.snackbar.open();
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
		console.log(checkedIds)
		/*store.dispatch({type: 'DELETE_USERS_ASYNC', ids: checkedIds});*/
	}

	onAdd = () => {
		 history.push('/equipment/new');
	}

	onSearch = () => {
		const value = this.header.textfield.input.value.trim();
	}

	makeLink = (row, prop) => {
		const pureVal = row[prop];
		if (prop == 'serialNumber') {
			const url = `/equipment/${row.id}`
			return <Link to={url} className="serial-link">{pureVal}</Link>
		}
		return pureVal
	}

	render() {
		const columns = {
			serialNumber: '编号',
			name: '名称',
			version: '型号',
			type: '类型',
			status: '状态'
		};
		const columnStyle = {
			serialNumber: 114,
			name: '20%',
			version: 'calc(40% - 186px)',
			type: '20%',
			status: '20%'
		}

		let dataSource = [{
			id: 1,
			serialNumber: 233,
			name: 'dell',
			version: 'YN',
			type: '耗材',
			status: '可领'
		}, {
			id: 2,
			serialNumber: 233,
			name: 'dell',
			version: 'YN',
			type: '耗材',
			status: '可领'
		}];
		return (
			<div className="equipment">
				<Header
					title="设备"
					onBatchDelete={this.onDelete}
					onAdd={this.onAdd}
					onSearch={this.onSearch}
					ref={r => this.header = r}
				/>

				<Table 
					columns={columns}
					dataSource={dataSource}
					columnStyle={columnStyle}
					columnFactory={this.makeLink}
					ref={r => this.table = r}
				/>

				<Pagination />

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
			</div>
		)
	}
}

export default Equipment;