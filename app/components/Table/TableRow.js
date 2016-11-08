import React, {Component} from 'react';

import Checkbox from 'components/Checkbox';

class TableRow extends Component {
	onSelectSingle = () => {
		const {selectSingle} = this.props;
		selectSingle();
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
		const {row, checked, display} = this.props;
		
		return (
			<tr className="row" data-id={row.id}>
				{checked && <td className="selection-column">
								<Checkbox onChange={this.onSelectSingle} ref={r => this.checkbox = r}/>
							</td>}
				{display.map((prop, index) => {
					return (<td key={index}>{row[prop]}</td>)
				})}
				{this.ownAction()}
			</tr>
		)
	}
}

export default TableRow;