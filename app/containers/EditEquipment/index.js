import React, {Component} from 'react';
import TextField from 'components/TextField';
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
						<div className="form">
							<label>编号</label>
							<TextField name="serialNumber" />
						</div>
						<div className="form">
							<label>名称</label>
							<TextField name="name" />
						</div>
						<div className="form">
							<label>型号</label>
							<TextField name="version" />
						</div>
						<div className="form">
							<label>规格</label>
							<TextField name="spec" />
						</div>
						
						<div className="form">
							<label>生产厂家</label>
							<TextField name="manufacturer" />
						</div>
						<div className="form">
							<label>出厂日期</label>
							<TextField name="prodDate" />
						</div>
						<div className="form">
							<label>出厂号</label>
							<TextField name="prodSign" />
						</div>
						<div className="form">
							<label>质保期</label>
							<TextField name="warranty" />
						</div>
						<div className="form">
							<label>计量单位</label>
							<TextField name="measure" />
						</div>
						<div className="form">
							<label>单价</label>
							<TextField name="price" />
						</div>
						<div className="form">
							<label>总额</label>
							<TextField name="equipmentTotal" />
						</div>
						
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