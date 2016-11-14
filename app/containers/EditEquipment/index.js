import React, {Component} from 'react';
import styles from './styles.css';

class EditEquipment extends Component {
	render() {
		const id = +this.props.params.id;
		const isEdit = !isNaN(id);
		
		return (
			<div className="edit-equipment">
				<section className="base-info"></section>
				<section className="fund-info"></section>
				<section className="bill-info"></section>
			</div>
		)
	}
}

export default EditEquipment;