import React, {Component} from 'react';

import Checkbox from 'components/Checkbox';

class TableRow extends Component {
	onSelectSingle = (e, isChecked) => {
		const {selectSingle} = this.props;
		selectSingle(e, isChecked);
	}
	
	ownAction() {
		const {action, children} = this.props;
		if (action) {
			return (
				<td className="action">
					{children}
				</td>
			);
		}
	}

	render() {
		const {row, checked, display, columnFactory} = this.props;
		
		return (
			<tr className="row" data-id={row.id}>
				{checked && <td className="selection-column">
								<Checkbox onChange={this.onSelectSingle} ref={r => this.checkbox = r}/>
							</td>}
				{display.map((prop, index) => {
					const finalColumn = typeof columnFactory == 'function' ? columnFactory(row, prop) : row[prop];
					return <td key={index}>{finalColumn}</td>;
				})}
				{this.ownAction()}
			</tr>
		)
	}
}

export default TableRow;