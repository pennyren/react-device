import React, {Component} from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import styles from './styles.css';

class Users extends Component {
	render() {
		let columns =[{title: 'Name'}, {title: 'Age'}, {title: 'Action'}];
		let dataSource = [{name: 'bob', age: '3'}, {name: 'bob', age: '3'}, {name: 'bob', age: '3'}, {name: 'bob', age: '3'}, {name: 'bob', age: '3'}, {name: 'bob', age: '3'}];
		return (
			<div className="users">
				<Header title="用户"/>
				<Table columns={columns} dataSource={dataSource} checked={true} />
				<Pagination />
			</div>
		);
	}
}

export default Users;