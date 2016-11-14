import React, {Component} from 'react';
import styles from './styles.css';

class EditEquipment extends Component {
	render() {
		const id = +this.props.params.id;
		const isEdit = !isNaN(id);
		
		return (
			<div className="edit-equipment">
				<section className="box-info spec">
					<div className="title">规格参数</div>
				</section>

				<div className="wrapper">
					<section className="box-info fund">
						<div className="title">经费</div>
					</section>

					<section className="box-info bill">
						<div className="title">单据</div>
					</section>

					<section className="box-info other">
						<div className="title">其它</div>
					</section>
				</div>
			</div>
		)
	}
}

export default EditEquipment;