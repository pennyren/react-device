import React, {Component} from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import Snackbar from 'components/Snackbar';
import Popconfirm from 'components/Popconfirm';
import Dialog from 'components/Dialog';
import {Link} from 'react-router';
import styles from './styles.css';

class Equipment extends Component {
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
					onBatchDelete={this.onBatchDelete}
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
                <Popconfirm message="你确定要删除选择的内容吗?" ref={r => this.popconfirm = r}/>
			</div>
		)
	}
}

export default Equipment;