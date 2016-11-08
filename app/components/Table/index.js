import React, {Component} from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import shortId from 'shortid';
import styles from './styles.css';

class Table extends Component {
	static defaultProps = {
		checked: true,
		action: true
	}
	
	selectAll = () => {
		const batchCheckbox = this.tableHeader.checkbox;
		const isChecked = batchCheckbox.rawCheck.checked;
		const checkboxes = this.tableBody.querySelectorAll('.row .checkbox');

		if (!checkboxes.length) {
			return;
		}
		
		for (const checkbox of checkboxes) {
			const classList = checkbox.classList;
			if (!classList.contains('disabled')) {
				checkbox.querySelector('input').checked = isChecked;
				isChecked ? classList.add('checked') : classList.remove('checked');
			}
		}
		
	}

	selectSingle = () => {
		const total = this.tableBody.querySelectorAll('.row').length;
		const checked = this.tableBody.querySelectorAll('.row .checkbox input:checked').length;
		const batchCheckbox = this.tableHeader.checkbox;
		(total == checked) ?  batchCheckbox.checked(true) : batchCheckbox.checked(false);
	}

	render() {
		const {columns, dataSource, display, ...others} = this.props;
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
						{dataSource.map((row) => {
							return (
								<TableRow 
									row={row}
									key={shortId.generate()}
									selectSingle={this.selectSingle}
									display={display}
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