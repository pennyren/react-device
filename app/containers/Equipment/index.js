import React, {Component} from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import Snackbar from 'components/Snackbar';
import Popconfirm from 'components/Popconfirm';
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

	}

	render() {
		let columns =['Name', 'Age', 'Action'];
		let dataSource = [{id: 1, name: 'bob', age: '3'}, {id: 2, name: 'bob', age: '3'}, {id: 3, name: 'bob', age: '3'}];
		return (
			<div className="equipment">
				<Header
					title="设备"
					onBatchDelete={this.onBatchDelete}
					onAdd={this.onAdd}
				/>
				<Table 
					columns={columns}
					dataSource={dataSource}
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