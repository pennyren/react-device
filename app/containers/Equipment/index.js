import React, {Component} from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import styles from './styles.css';

class Equipment extends Component {
	render() {
		return (
			<div className="equipment">
				<Header title="设备"/>
				<Table />
				<Pagination />
			</div>
		)
	}
}

export default Equipment;