import React, {Component} from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import styles from './styles.css';

class Table extends Component {
	static defaultProps = {
		checked: true,
		action: true
	}
	
	selectAll = () => {
		const checkbox = this.tableHeader.checkbox;
		const checked = checkbox.rawCheck.checked;
		if (checked) {

		} else {

		}
	}

	isCheckedAll() {

	}

	render() {
		const {columns, dataSource, ...others} = this.props;
		
		return (
			<div className="table-scroll">
				<table>
					<TableHeader 
						columns={columns}
						selectAll={this.selectAll}
						ref={r => this.tableHeader = r}
						{...others}
					/>

					<TableBody 
						dataSource={dataSource}
						ref={r => this.tableBody = r}
						{...others}
					/>
				</table>
			</div>
		)
	}
}

export default Table;