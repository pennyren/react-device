import React, {Component} from 'react';
import Checkbox from 'components/Checkbox';

class TableHeader extends Component {
	shouldComponentUpdate() {
		return false;
	}

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
									<Checkbox onChange={this.onSelectAll} ref={r => this.checkbox = r}/>
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