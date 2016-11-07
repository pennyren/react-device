import React, {Component} from 'react';
import IconButton from 'components/IconButton';
import Checkbox from 'components/Checkbox';

class TableRow extends Component {
	onSelectSingle = () => {
		const {selectSingle} = this.props;
		selectSingle();
	}

	modify() {

	}

	delete() {

	}

	ownAction() {
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