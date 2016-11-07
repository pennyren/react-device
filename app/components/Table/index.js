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
		if (!this.rows.length) {
			return;
		}
		
		this.rows.forEach((row) => {
			row.checkbox.checked(isChecked);
		});
	}

	selectSingle = () => {
		const total = this.rows.length;
		const batchCheckbox = this.tableHeader.checkbox;
		let checked = 0;
		this.rows.forEach((row) => {
			const isChecked = row.checkbox.rawCheck.checked;
			isChecked && checked++;
		});

		(total == checked) ?  batchCheckbox.checked(true) : batchCheckbox.checked(false);
	}

	render() {
		const {columns, dataSource, display, ...others} = this.props;
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
					<tbody ref={r => this.tableBody = r}>
						{dataSource.map((row, index) => {
							return (
								<TableRow 
									row={row}
									key={index}
									selectSingle={this.selectSingle}
									display={display}
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