import React, {Component} from 'react';
import Checkbox from 'components/Checkbox';

class TableRow extends Component {
	shouldChecked() {
		const {checked, selectSingle} = this.props;
		if (checked) {
			return (
				<td className="select">
					<div className="wrap-cell">
						<Checkbox onChange={selectSingle} ref={r => this.checkbox = r}/>
					</div>
				</td>
			)
		}
	}

	render() {
		const {row, columns, columnFactory, columnStyle, columnClass} = this.props;
		
		return (
			<tr className="row" data-id={row.id}>
				{this.shouldChecked()}
				{Object.keys(columns).map((key, index) => {
					const finalColumn = (typeof columnFactory == 'function') ? columnFactory(row, key) : row[key];
					let props = {
						key: index,
						style: {
							width: columnStyle[key]
						}
					}
					if (typeof columnClass == 'object' && columnClass[key]) {
						 props.className = columnClass[key];
					}
					
					return (
						<td {...props}>
							<div className="wrap-cell">{finalColumn}</div>
						</td>
					);
				})}
			</tr>
		)
	}
}

export default TableRow;