import React, {Component} from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import shortId from 'shortid';
import {closest} from 'utils/dom';
import styles from './styles.css';

class Table extends Component {
	static defaultProps = {
		checked: true
	}
	
	selectAll = () => {
		const batchCheckbox = this.tableHeader.checkbox;
		const isChecked = batchCheckbox.rawCheck.checked;
		const checkboxes = this.tableBody.querySelectorAll('.row .checkbox');

		if (!checkboxes.length) {
			return;
		}
		
		for (const checkbox of checkboxes) {
			const checkboxClass = checkbox.classList;
			const rowClass = closest(checkbox, '.row').classList;
			if (!checkboxClass.contains('disabled')) {
				checkbox.querySelector('input').checked = isChecked;
				if (isChecked) {
					checkboxClass.add('checked');
					rowClass.add('checked');
				} else {
					checkboxClass.remove('checked');
					rowClass.remove('checked');
				}
			}
		}
		
	}

	selectSingle = (e, isChecked) => {
		const total = this.tableBody.querySelectorAll('.row').length;
		const checked = this.tableBody.querySelectorAll('.row .checkbox input:checked').length;
		const batchCheckbox = this.tableHeader.checkbox;
		const currentRow = closest(e.currentTarget, '.row');
		isChecked ? currentRow.classList.add('checked') : currentRow.classList.remove('checked');
		(total == checked) ?  batchCheckbox.checked(true) : batchCheckbox.checked(false);
	}

	render() {
		const {dataSource, ...others} = this.props;
		const {columnStyle, checked} = this.props;
		let computedWidth = 0;
		Object.keys(columnStyle).forEach((prop) => {
			computedWidth += columnStyle[prop];
		})
		if (checked) {
			computedWidth += 72
		}

		return (
			<div className="datagrid">
				<table>
					<TableHeader
						selectAll={this.selectAll}
						computedWidth={computedWidth}
						{...others}
						ref={r => this.tableHeader = r}
					/>
					<tbody ref={r => this.tableBody = r}>
						{dataSource.map((row) => {
							return (
								<TableRow
									key={shortId.generate()} 
									row={row}
									selectSingle={this.selectSingle}
									computedWidth={computedWidth}
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