import React, {Component} from 'react';
import TableRow from './TableRow';

class TableBody extends Component {
	render() {
		const {dataSource, checked, action} = this.props;
		return (
			<tbody>
				{dataSource.map((row, index) => {
					return <TableRow row={row} checked={checked} action={action} key={index} />;
				})}
			</tbody>
		)
	}
}

export default TableBody;