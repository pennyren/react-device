import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import Checkbox from 'components/Checkbox';

class TableRow extends Component {
	selected() {

	}

	modify() {

	}

	delete() {

	}

	withAction() {
		const action = this.props.action;
		if (action) {
			return (
				<td className="action">
					<IconButton 
						icon="mdi-pen" 
						color="#b4c5cd"
						onClick={this.modify}
					/>
					<IconButton 
						icon="mdi-del" 
						color="#b4c5cd"
						onClick={this.delete}
					/>
				</td>
			);
		}
	}

	render() {
		const {row, checked} = this.props;
		let keys = Object.keys(row);
		return (
			<tr className="row">
				{checked && <td className="selection-column"><Checkbox onChange={this.selected} /></td>}
				{keys.map((prop, index) => {
					return (<td key={index}>{row[prop]}</td>)
				})}
				{this.withAction()}
			</tr>
		)
	}
}

export default TableRow;