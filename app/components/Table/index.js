import React, {Component} from 'react';
import Checkbox from 'components/Checkbox';
import styles from './styles.css';

class Table extends Component {
	render() {
		return (
			<div className="table-scroll">
				<div className="table-header">
					<table>
						<thead>
							<tr>
								<th className="selection-column"><Checkbox /></th>
								<th>Name</th>
								<th>Age</th>
								<th>Address</th>
							</tr>
						</thead>
					</table>
				</div>
				<div className="table-body">
					<table>
						<tbody>
							<tr className="row"><td className="selection-column"></td><td>hello react redux</td><td>3</td><td>3</td></tr>
							<tr className="row"><td className="selection-column"></td><td>3</td><td>3</td><td>3</td></tr>
							<tr className="row"><td className="selection-column"></td><td>3</td><td>3</td><td>3</td></tr>
							<tr className="row"><td className="selection-column"></td><td>3</td><td>3</td><td>3</td></tr>
							<tr className="row"><td className="selection-column"></td><td>3</td><td>3</td><td>3</td></tr>
							<tr className="row"><td className="selection-column"></td><td>3</td><td>3</td><td>3</td></tr>
							<tr className="row"><td className="selection-column"></td><td>3</td><td>3</td><td>3</td></tr>
							<tr className="row"><td className="selection-column"></td><td>3</td><td>3</td><td>3</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default Table;