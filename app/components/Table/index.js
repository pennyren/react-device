import React, {Component} from 'react';
import styles from './styles.css';

class Table extends Component {
	render() {
		return (
			<div className="mdl-table">
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Age</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
						<tr className="row"><td>3</td><td>3</td><td>3</td></tr>
						<tr className="row"><td>3</td><td>3</td><td>3</td></tr>
						<tr className="row"><td>3</td><td>3</td><td>3</td></tr>
						<tr className="row"><td>3</td><td>3</td><td>3</td></tr>
						<tr className="row"><td>3</td><td>3</td><td>3</td></tr>
						<tr className="row"><td>3</td><td>3</td><td>3</td></tr>
						<tr className="row"><td>3</td><td>3</td><td>3</td></tr>
						<tr className="row"><td>3</td><td>3</td><td>3</td></tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default Table;