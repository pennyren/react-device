import React, {Component} from 'react';
import Checkbox from 'components/Checkbox';
import shortId from 'shortid';

class TableHeader extends Component {
	shouldChecked() {
		const {selectAll, checked} = this.props;
		if (checked) {
			return (
				<th className="select">
					<div className="wrap-cell">
						<Checkbox 
							onChange={selectAll}
							key={shortId.generate()}
							ref={r => this.checkbox = r}
						/>
					</div>
			   	</th>
			);
		}
	}

	renderColumns() {
		const {columnStyle, columns} = this.props;
		const computedColumns = Object.keys(columns).map((key, index) => {
			const props = {
				key: index,
				style: {
					width: columnStyle[key]
				}
			}
			return (
				<th {...props}>
					<div className="wrap-cell">{columns[key]}</div>
				</th>
			)
		});
		return computedColumns;
	}

	render() {
		return (
			<thead>
				<tr>
					{this.shouldChecked()}
					{this.renderColumns()}
				</tr>
			</thead>
		)
	}
}

export default TableHeader;