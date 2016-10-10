import React, {Component} from 'react';
import SelectField from 'components/SelectField';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import styles from './styles.css';

class Equipment extends Component {
	render() {
		return (
			<div className="equipment">
				<Table />
				<Pagination />
			</div>
		)
	}
}

export default Equipment;