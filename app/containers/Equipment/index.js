import React, {Component} from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import styles from './styles.css';

class Equipment extends Component {
	render() {
		let columns =[{title: 'Name'}, {title: 'Age'}, {title: 'Action'}];
		let dataSource = [{name: 'bob', age: '3'}, {name: 'bob', age: '3'}, {name: 'bob', age: '3'}];
		return (
			<div className="equipment">
				<Header title="设备"/>
				<Table columns={columns} dataSource={dataSource}/>
				<Pagination />
			</div>
		)
	}
}

export default Equipment;