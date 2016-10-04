import React, {Component} from 'react';
import Dropdown from 'components/Dropdown';

class Equipment extends Component {
	render() {
		return (
			<div className="container">
				<Dropdown menuItems={['react', 'redux', 'router']} />
			</div>
		)
	}
}

export default Equipment;