import React, {Component} from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import styles from './styles.css';

class Table extends Component {
	static defaultProps = {
		checked: false,
		action: true
	}
	
	render() {
		const {columns, dataSource, checked, action} = this.props;
		let numRow = columns.length;
		checked && numRow++;
		let col = [];
		for (let i = 0; i < numRow; i++) {
			col.push(<col key={i}></col>);
		}
		return (
			<div className="table-scroll">
				<table>
					<colgroup>
						{col}
					</colgroup>
					<TableHeader columns={columns} checked={checked} action={action} />
					<TableBody dataSource={dataSource} checked={checked} action={action} />
				</table>
			</div>
		)
	}
}

export default Table;