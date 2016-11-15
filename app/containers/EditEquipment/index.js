import React, {Component} from 'react';
import TextField from 'components/TextField';
import Button from 'components/Button';
import styles from './styles.css';

class EditEquipment extends Component {
	render() {
		const id = +this.props.params.id;
		const isEdit = !isNaN(id);
		
		return (
			<div className="edit-equipment">
				<section className="box-info spec">
					<div className="title">规格参数</div>
					<div className="content">
						<TextField name="serialNumber" placeholder="编号"/>
						<TextField name="name" placeholder="名称"/>
						<TextField name="version" placeholder="型号"/>
						<TextField name="spec" placeholder="规格"/>
						<TextField name="manufacturer" placeholder="生产厂家"/>
						<TextField name="prodDate" placeholder="出厂日期"/>
						<TextField name="prodSign" placeholder="出厂号"/>
						<TextField name="warranty" placeholder="质保期"/>
						<TextField name="measure" placeholder="计量单位"/>
						<TextField name="price" placeholder="单价"/>
						<TextField name="equipmentTotal" placeholder="总额"/>
						<Button>保存</Button>
					</div>
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