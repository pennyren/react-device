import React, {Component} from 'react';
import TextField from 'components/TextField';
import IconButton from 'components/IconButton';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import styles from './styles.css';

class EditEquipment extends Component {
	onSave = () => {

	}

	render() {
		const id = +this.props.params.id;
		const isEdit = !isNaN(id);
		const typeItems = ['耗材', '固定资产', '国有资产'];
		const statusItems = ['可领', '在用', '维修', '报废'];
		return (
			<div className="edit-equipment">
				<section className="box-info spec">
					<div className="title">
						规格参数
						<IconButton 
							icon="mdi-save" 
							color="#b4c5cd"  
							tooltip={'保存'}
							onClick={this.onSave}
						/>
					</div>
					<div className="content">
						<TextField name="serialNumber" placeholder="编号"/>
						<TextField name="fundNumber" placeholder="教育部分类号"/>
						<TextField name="fundNumber" placeholder="财政部分类号"/>
						<TextField name="fundNumber" placeholder="国别码"/>
						<TextField name="name" placeholder="名称"/>
						<TextField name="version" placeholder="型号"/>
						<TextField name="spec" placeholder="规格"/>
						<SelectField name="type" menuItems={typeItems} placeholder="类型"/>
						<TextField name="manufacturer" placeholder="生产厂家"/>
						<DatePicker name="prodDate" placeholder="出厂日期"/>
						<TextField name="prodSign" placeholder="出厂号"/>
						<DatePicker name="warranty" placeholder="质保期"/>
						<TextField name="measure" placeholder="计量单位"/>
						<TextField name="price" placeholder="单价"/>
						<TextField name="equipmentTotal" placeholder="总额"/>
						<TextField name="retailer" placeholder="供货商家"/>
					</div>
				</section>

				<div className="wrapper">
					<section className="box-info detail">
						<div className="title">
							详情
							<IconButton 
								icon="mdi-save" 
								color="#b4c5cd"  
								tooltip={'保存'}
								onClick={this.onSave}
							/>
						</div>
						<div className="content">
						<TextField name="version" placeholder="使用人"/>
							<SelectField name="status" menuItems={statusItems} value={status} placeholder="状态"/>
							<DatePicker name="fundNumber" placeholder="取得时间"/>
							<TextField name="fundNumber" placeholder="取得方式"/>
							<TextField name="fundNumber" placeholder="使用方向"/>
							<TextField name="fundNumber" placeholder="使用单位"/>
							<TextField name="fundNumber" placeholder="存放地点编号"/>
							<TextField name="fundNumber" placeholder="存放地点"/>
							<TextField name="comment" placeholder="资产清查" multiLine={true}/>
							<TextField name="comment" placeholder="备注" multiLine={true}/>
						</div>
					</section>

					<section className="box-info fund">
						<div className="title">
							经费
							<IconButton 
								icon="mdi-save" 
								color="#b4c5cd"  
								tooltip={'保存'}
								onClick={this.onSave}
							/>
						</div>
						<div className="content">
							<TextField name="fundNumber" placeholder="经费编号"/>
							<TextField name="fundSubject" placeholder="经费科目"/>
							<TextField name="fundName" placeholder="经费名称"/>
							<TextField name="price" placeholder="经费负责人"/>
						</div>
					</section>

					<section className="box-info bill">
						<div className="title">
							单据
							<IconButton 
								icon="mdi-save" 
								color="#b4c5cd"  
								tooltip={'保存'}
								onClick={this.onSave}
							/>
						</div>
						<div className="content">
							<DatePicker name="fundNumber" placeholder="入账日期"/>
							<DatePicker name="fundNumber" placeholder="财务凭单日期"/>
							<TextField name="fundNumber" placeholder="财务凭单号"/>
							<TextField name="fundNumber" placeholder="单据编号"/>
							<TextField name="fundNumber" placeholder="合同编号"/>
							<TextField name="fundNumber" placeholder="经办人"/>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default EditEquipment;