import React, {Component} from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import styles from './styles.css';

class Users extends Component {
	render() {
		return (
			<div className="users">
				<Header title="用户"/>
				<Table />
				<Pagination />
			</div>
		);
	}
}

export default Users;