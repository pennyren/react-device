import React, {Component} from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import styles from './styles.css';

class Table extends Component {
	static defaultProps = {
		checked: true,
		action: true
	}
	
	selectAll = () => {
		const batchCheckbox = this.tableHeader.checkbox;
		const isChecked = batchCheckbox.rawCheck.checked;
		this.rows.forEach((row) => {
			row.checkbox.checked(isChecked);
		});
	}

	isCheckedAll() {

	}

	render() {
		const {columns, dataSource, ...others} = this.props;
		this.rows = [];

		return (
			<div className="table-scroll">
				<table>
					<TableHeader 
						columns={columns}
						selectAll={this.selectAll}
						ref={r => this.tableHeader = r}
						{...others}
					/>
					<tbody>
						{dataSource.map((row, index) => {
							return (
								<TableRow 
									row={row}
									key={index}
									ref={r => this.rows.push(r)}
									{...others}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Table;