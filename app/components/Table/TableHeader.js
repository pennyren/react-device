import React, {Component} from 'react';
import Checkbox from 'components/Checkbox';
import shortId from 'shortid';

class TableHeader extends Component {
	onSelectAll = () => {
		const {selectAll} = this.props;
		selectAll();
	}

	render() {
		const {columns, checked, action} = this.props;
		const lastCol = columns.length - 1;
		
		return (
			<thead>
				<tr>
					{checked && <th className="selection-column">
									<Checkbox onChange={this.onSelectAll} ref={r => this.checkbox = r} key={shortId.generate()}/>
								</th>}

					{columns.map((title, index) => {
						const actionClassName = action && (lastCol == index) ? {className: 'action'} : {};
						return <th {...actionClassName} key={index}>{title}</th>;
					})}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;