import React, {Component} from 'react';
import Checkbox from 'components/Checkbox';

class TableHeader extends Component {
	selectAll() {

	}

	render() {
		const {checked, columns, action} = this.props;
		const numCol = columns.length - 1;
		return (
			<thead>
				<tr>
					{checked && <th className="selection-column"><Checkbox onChange={this.selectAll} /></th>}
					{columns.map((item, index) => {
						const className = action && (numCol == index) ? {className: 'action'} : {};
						return <th {...className} key={index}>{item.title}</th>;
					})}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;