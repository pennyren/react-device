import React, {Component} from 'react';
import Pagination from 'components/Pagination';
import styles from './styles.css';

class Users extends Component {
	render() {
		return (
			<div className="users">
				<Pagination	/>
			</div>
		);
	}
}

export default Users;