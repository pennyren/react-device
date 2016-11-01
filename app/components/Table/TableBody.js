import React, {Component} from 'react';
import TableRow from './TableRow';

class TableBody extends Component {
	render() {
		const {dataSource, ...others} = this.props;
		return (
			<tbody>
				{dataSource.map((row, index) => {
					return <TableRow row={row} key={index} {...others} />;
				})}
			</tbody>
		)
	}
}

export default TableBody;