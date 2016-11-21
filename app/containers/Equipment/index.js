import React, {Component} from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import Snackbar from 'components/Snackbar';
import Popconfirm from 'components/Popconfirm';
import Dialog from 'components/Dialog';
import getPropsFromInputs from 'utils/form';
import {closest} from 'utils/dom';
import {Link} from 'react-router';
import {history} from 'routes';
import IconButton from 'components/IconButton';
import TextField from 'components/TextField'; 
import SelectField from 'components/SelectField';
import {connect} from 'react-redux';
import store from 'store';

import styles from './styles.css';


class EquipmentDialog extends Component {
	state = {
		isEdit: false,
		equipment: {}
	}

	open(config) {
		const {isEdit, title, equipment} = config;
		this.setState({isEdit: isEdit, equipment: equipment});
		this.dialog.open(title);
	}

	onConfirm = (dialogContent) => {
		const equipment = getPropsFromInputs(dialogContent);
		const isEdit = this.state.isEdit;
		if (isEdit) {
			store.dispatch({
				type: 'UPDATE_EQUIPMENT_ASYNC', 
				equipment: {id: this.state.equipment.id, entity: equipment},
				isGlobal: false
			});
		} else {
			store.dispatch({type: 'ADD_EQUIPMENT_ASYNC', equipment: equipment});
		}
		this.dialog.close();
	}

	render() {
		const typeItems = ['耗材', '固定资产', '国有资产'];
		const statusItems = ['可领', '在用', '维修', '报废'];
		const {serialNumber, name, version, type, status} = this.state.equipment;
		return (
			<Dialog
                	customClassName="equipment-dialog"
                	onConfirm={this.onConfirm}
                	ref={r => this.dialog = r}
                >
                <TextField name="serialNumber" placeholder="编号" value={serialNumber}/>
                <TextField name="name" placeholder="名称" value={name}/>
                <TextField name="version" placeholder="型号" value={version}/>
            	<SelectField name="type" menuItems={typeItems} value={type} placeholder="类型"/>
            	<SelectField name="status" menuItems={statusItems} value={status} placeholder="状态"/>
            </Dialog>
		)
	}
}

class Equipment extends Component {
	componentDidMount() {
		store.dispatch({type: 'GET_EQUIPMENTS_ASYNC', currentPage: 1});
	}

	onDelete = (e) => {
		const checkedRows = this.table.tableBody.querySelectorAll('.row .checkbox.checked');
		checkedRows.length ? this.popconfirm.open(e) : this.snackbar.open();
	}

	onDeleteConfirm = () => {
		const checkedRows = this.table.tableBody.querySelectorAll('.row .checkbox.checked');
		const i = checkedRows.length;
		let checkedIds = [];
		if (i == 0) {
			this.snackbar.open();
			return;
		}
		for (const row of checkedRows) {
			checkedIds.push(+closest(row, '.row').getAttribute('data-id'))
		}
		this.popconfirm.close();
		store.dispatch({type: 'DELETE_EQUIPMENTS_ASYNC', ids: checkedIds});
	}

	onAdd = () => {
		this.equipmentDialog.open({isEdit: false, title: '添加设备', equipment: {}});
	}

	onSearch = () => {
		const value = this.header.textfield.input.value.trim();
		store.getState().equipments.search = value;
		store.dispatch({type: 'GET_EQUIPMENTS_ASYNC', currentPage: 1});
	}

	onPaginated = (currentPage) => {
		store.dispatch({type: 'GET_EQUIPMENTS_ASYNC', currentPage});
	}

	onModify = (e) => {
		const currentRow = closest(e.currentTarget, '.row');
		const id = currentRow.getAttribute('data-id');
		const list = store.getState().equipments.list;
		let i = list.length;
		let currentEquipment = null;
		while (i--) {
			if (list[i].id == id) {
				currentEquipment = list[i];
				break;
			} 
		}
		this.equipmentDialog.open({isEdit: true, title: '修改设备', equipment: currentEquipment});
	}

	seeHistory = () => {
		
	}

	makeColumns = (row, prop) => {
		const pureVal = row[prop];
		if (prop == 'serialNumber') {
			const url = `/equipment/${row.id}`
			return <Link to={url} className="serial-link">{pureVal}</Link>
		} else if (prop == 'action') {
			return (
				<div>
					<IconButton 
						icon="mdi-pen" 
						color="#b4c5cd" 
						onClick={this.onModify} 
						tooltip={'编辑'}
					/>
					<IconButton 
						icon="mdi-eye" 
						color="#b4c5cd" 
						onClick={this.seeHistory} 
						tooltip={'历史记录'}
					/>
				</div>
				
			)
		}
		return pureVal
	}

	render() {
		const columns = {
			serialNumber: '编号',
			name: '名称',
			version: '型号',
			type: '类型',
			status: '状态',
			action: '操作'
		};
		const columnStyle = {
			serialNumber: 96,
			name: '16%',
			version: 'calc(36% - 168px)',
			type: '16%',
			status: '16%',
			action: '16%'
		}
		const columnClass = {
			action: 'action'
		}

		const {current, total, list} = this.props; 

		return (
			<div className="equipment">
				<Header
					title="设备"
					onBatchDelete={this.onDelete}
					onAdd={this.onAdd}
					onSearch={this.onSearch}
					ref={r => this.header = r}
				/>

				<Table 
					columns={columns}
					dataSource={list}
					columnStyle={columnStyle}
					columnClass={columnClass}
					columnFactory={this.makeColumns}
					ref={r => this.table = r}
				/>

				<Pagination
					current={current}
					total={total}
					onChange={this.onPaginated}
				/>

				<Snackbar 
                    message="请选择要删除的内容!"
                    type="warning"
                    ref={r => this.snackbar = r}
                 />

                <Popconfirm 
                	message="你确定要删除选择的内容吗?"
                	onConfirm={this.onDeleteConfirm}
                	ref={r => this.popconfirm = r}
                />

                 <EquipmentDialog ref={r => this.equipmentDialog = r} />
			</div>
		)
	}
}

const mapStateToProps = function(store) {
	const {currentPage, totalPage, list} = store.equipments;
	return {
		current: currentPage,
		total: totalPage,
		list: list
	}
}

export default connect(mapStateToProps)(Equipment);