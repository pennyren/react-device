import React, {Component} from 'react';
import styles from './styles.css';

class EditEquipment extends Component {
	render() {
		const id = +this.props.params.id;
		console.log(id);
		return (
			<div className="edit-equipment">
			</div>
		)
	}
}

export default EditEquipment;