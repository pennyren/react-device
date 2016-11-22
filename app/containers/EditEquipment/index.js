import React, {Component} from 'react';
import TextField from 'components/TextField';
import IconButton from 'components/IconButton';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import AutoComplete from 'components/AutoComplete';
import Snackbar from 'components/Snackbar';
import fetch from 'utils/fetch';
import getPropsFromInputs from 'utils/form';
import {closest} from 'utils/dom';
import store from 'store';
import styles from './styles.css';

class EditEquipment extends Component {
	onSave = (e) => {
		const id = +this.props.params.id;
		const infoBox = closest(e.currentTarget, '.box-info');
		const props = getPropsFromInputs(infoBox);
		if (!props.username) {
			store.dispatch({
				type: 'UPDATE_EQUIPMENT_ASYNC', 
				equipment: {id: id, entity: props},
				isGlobal: true,
				snackbar: this.snackbar
			});
		} else {
			store.dispatch({
				type: 'UPDATE_EQUIPMENT_DETAIL_ASYNC', 
				equipment: {id: id, entity: props},
				snackbar: this.snackbar
			});
		}
	}

	onFilter = (val, onChange) => {
		fetch.doPost('user/getUsersByusername', {username: val}).then((data) => {
            onChange(data.result.users.map((user) => user.username));
        });
	}

	render() {
		const id = +this.props.params.id;
		const typeItems = ['耗材', '固定资产', '国有资产'];
		const statusItems = ['可领', '在用', '维修', '报废'];
		const equipments = store.getState().equipments.list;
		let i = equipments.length;
		let currentEquipment = {};
		while (i--) {
			if (equipments[i].id == id) {
				currentEquipment = equipments[i];
				break;
			}
			
		}

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
						<TextField name="serialNumber" value={currentEquipment.serialNumber} placeholder="编号"/>
						<TextField name="educationNumber" value={currentEquipment.educationNumber} placeholder="教育部分类号"/>
						<TextField name="financeNumber" value={currentEquipment.financeNumber} placeholder="财政部分类号"/>
						<TextField name="countryCode" value={currentEquipment.countryCode} placeholder="国别码"/>
						<TextField name="name" value={currentEquipment.name} placeholder="名称"/>
						<TextField name="version" value={currentEquipment.version} placeholder="型号"/>
						<TextField name="spec" value={currentEquipment.spec} placeholder="规格"/>
						<SelectField name="type" value={currentEquipment.type} menuItems={typeItems} placeholder="类型"/>
						<TextField name="manufacturer" value={currentEquipment.manufacturer} placeholder="生产厂家"/>
						<DatePicker name="prodDate" value={currentEquipment.prodDate} placeholder="出厂日期"/>
						<TextField name="prodSign" value={currentEquipment.prodSign} placeholder="出厂号"/>
						<DatePicker name="warranty" value={currentEquipment.warranty} placeholder="质保期"/>
						<TextField name="measure" value={currentEquipment.measure} placeholder="计量单位"/>
						<TextField name="price" value={currentEquipment.price} placeholder="单价"/>
						<TextField name="equipmentTotal" value={currentEquipment.equipmentTotal} placeholder="总额"/>
						<TextField name="retailer" value={currentEquipment.retailer} placeholder="供货商家"/>
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
							<AutoComplete 
								name="username" 
								value={currentEquipment.username} 
								placeholder="使用人"
								onFilter={this.onFilter}
							/>
							<SelectField name="status" value={currentEquipment.status} menuItems={statusItems} value={status} placeholder="状态"/>
							<DatePicker name="obtainDate" value={currentEquipment.obtainDate} placeholder="取得时间"/>
							<TextField name="obtainWay" value={currentEquipment.obtainWay} placeholder="取得方式"/>
							<TextField name="useIntent" value={currentEquipment.useIntent} placeholder="使用方向"/>
							<TextField name="useDepartment" value={currentEquipment.useDepartment} placeholder="使用单位"/>
							<TextField name="storeLocationNumber" value={currentEquipment.storeLocationNumber} placeholder="存放地点编号"/>
							<TextField name="storeLocation" value={currentEquipment.storeLocation} placeholder="存放地点"/>
							<TextField name="assertInventory" value={currentEquipment.assertInventory} placeholder="资产清查" multiLine={true}/>
							<TextField name="comment" value={currentEquipment.comment} placeholder="备注" multiLine={true}/>
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
							<TextField name="fundNumber" value={currentEquipment.fundNumber} placeholder="经费编号"/>
							<TextField name="fundSubject" value={currentEquipment.fundSubject} placeholder="经费科目"/>
							<TextField name="fundName" value={currentEquipment.fundName} placeholder="经费名称"/>
							<TextField name="fundDirector" value={currentEquipment.fundDirector} placeholder="经费负责人"/>
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
							<DatePicker name="recordDate" value={currentEquipment.recordDate} placeholder="入账日期"/>
							<DatePicker name="financeVoucherDate" value={currentEquipment.financeVoucherDate} placeholder="财务凭单日期"/>
							<TextField name="financeVoucherNumber" value={currentEquipment.financeVoucherNumber} placeholder="财务凭单号"/>
							<TextField name="billNumber" value={currentEquipment.billNumber} placeholder="单据编号"/>
							<TextField name="contractNumber" value={currentEquipment.contractNumber} placeholder="合同编号"/>
							<TextField name="agent" value={currentEquipment.agent} placeholder="经办人"/>
						</div>
					</section>
				</div>
				<Snackbar ref={r => this.snackbar = r} />
			</div>
		)
	}
}

export default EditEquipment;