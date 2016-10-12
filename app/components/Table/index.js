import React, {Component} from 'react';
import Checkbox from 'components/Checkbox';
import styles from './styles.css';

class Table extends Component {
	static defaultProps = {
		isScrolled: false,
		isChecked: false
	}

	batchChecked(isChecked) {

	}

	render() {
		const {columns, dataSource, scrolled, checked} = this.props;
		
		let thead = (
			<thead>
				<tr>
					{checked && 
						<th className="selection-column">
							<Checkbox onChange={this.batchChecked}/>
						</th>}
					{columns.map((item, index) => <th key={index}>{item.title}</th>)}
				</tr>
			</thead>
		);

		let tbody = (

		);

		let table = (
			<table>
				<colgroup>
					<col>
				</colgroup>
			</table>
		);

		return (
			<div className="table-scroll">
				<div className="table-header">
					<table>
						<colgroup>
							<col />
							<col style={{with: '33.3%', minWidth: '33.3%'}}/>
							<col style={{with: '33.3%', minWidth: '33.3%'}}/>
							<col style={{with: '33.3%', minWidth: '33.3%'}}/>
						</colgroup>
						<thead>
							<tr>
								
								<th>Name</th>
								<th>Age</th>
								<th>Address</th>
							</tr>
						</thead>
					</table>
				</div>
				<div className="table-body">
					<table>
						<colgroup>
							<col />
							<col style={{with: '33.3%', minWidth: '33.3%'}}/>
							<col style={{with: '33.3%', minWidth: '33.3%'}}/>
							<col style={{with: '33.3%', minWidth: '33.3%'}}/>
						</colgroup>
						<tbody>
							<tr className="row">
								<td className="selection-column"><Checkbox /></td>
								<td>hello react redux</td>
								<td>3</td>
								<td>3</td>
							</tr>
							<tr className="row">
								<td className="selection-column"><Checkbox /></td>
								<td>3</td>
								<td>3</td>
								<td>3</td>
							</tr>
							<tr className="row">
								<td className="selection-column"><Checkbox /></td>
								<td>3</td>
								<td>3</td>
								<td>3</td>
							</tr>
							<tr className="row">
								<td className="selection-column"><Checkbox /></td>
								<td>3</td>
								<td>3</td>
								<td>3</td>
							</tr>
							<tr className="row">
								<td className="selection-column"><Checkbox /></td>
								<td>3</td>
								<td>3</td>
								<td>3</td>
							</tr>
							<tr className="row">
								<td className="selection-column"><Checkbox /></td>
								<td>3</td>
								<td>3</td>
								<td>3</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default Table;