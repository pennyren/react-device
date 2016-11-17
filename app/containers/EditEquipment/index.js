import React, {Component} from 'react';
import TextField from 'components/TextField';
import DatePicker from 'components/DatePicker';
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
						<DatePicker name="prodDate" placeholder="出厂日期"/>
						<TextField name="prodSign" placeholder="出厂号"/>
						<TextField name="warranty" placeholder="质保期"/>
						
						<TextField name="measure" placeholder="计量单位"/>
						<TextField name="retailer" placeholder="供货商家"/>
						<TextField name="price" placeholder="单价"/>
						<TextField name="equipmentTotal" placeholder="总额"/>
						<TextField name="comment" placeholder="备注"/>
						<Button>保存</Button>
					</div>
				</section>

				<div className="wrapper">
					<section className="box-info other">
						<div className="title">其他</div>
						<div className="content">
							<TextField name="fundNumber" placeholder="取得方式"/>
							<TextField name="fundNumber" placeholder="取得时间"/>
							<TextField name="fundNumber" placeholder="使用方向"/>
							<TextField name="fundNumber" placeholder="使用单位"/>
							<TextField name="fundNumber" placeholder="存放地点编号"/>
							<TextField name="fundNumber" placeholder="存放地点"/>
						</div>
					</section>

					<section className="box-info fund">
						<div className="title">经费</div>
						<div className="content">
							<TextField name="fundNumber" placeholder="经费编号"/>
							<TextField name="fundSubject" placeholder="经费科目"/>
							<TextField name="fundName" placeholder="经费名称"/>
							<TextField name="price" placeholder="经费负责人"/>
						</div>
					</section>

					<section className="box-info bill">
						<div className="title">单据</div>
						<div className="content">
							<TextField name="fundNumber" placeholder="单据编号"/>
							<TextField name="fundNumber" placeholder="合同编号"/>
							<TextField name="fundNumber" placeholder="经办人"/>
							<TextField name="fundNumber" placeholder="入账日期"/>
							<TextField name="fundNumber" placeholder="财务凭单号"/>
							<TextField name="fundNumber" placeholder="财务凭单日期"/>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default EditEquipment;