import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import moment from 'utils/date';
import getEnumVal from 'utils/enums';
import store from 'store';

const {doGet, doPost} = fetch;

function* getEquipments(action) {
	try {
		const currentPage = action.currentPage;
		const props = {
			currentPage: currentPage,
			filter: getFilter()
		};

		const response = yield call(doPost, '/equipment/getEquipments', props);
		let {totalPage, list} = response.result;
		yield put({type: 'GET_EQUIPMENTS', list: filterEquipmentInfo(list), totalPage, currentPage});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

function* addEquipment(action) {
	try {
		const {currentPage, totalPage, list} = store.getState().equipments;
		const isLastPage = currentPage == totalPage;
		const props = {
			entity: action.equipment,
			filter: getFilter(),
			isLastPage
		}
		const response = yield call(doPost, 'equipment/addEquipment', props);
		const {equipment, isIncrease} = response.result;
		if (isIncrease) {
			yield put({type: 'INCREASE_TOTAL', totalPage: totalPage + 1})
		} else if (isLastPage) {
			yield put({type: 'ADD_EQUIPMENT', equipment: equipment})
		}
		
	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}

function* updateEquipment(action) {
	try {
		const {equipment, isGlobal, snackbar} = action;
		const response = yield call(doPost, 'equipment/updateEquipment', equipment);
		if (!response.success) {
			snackbar && snackbar.open({message: '该用户名不存在!', type: 'error'});
			return;
		} 
		if (isGlobal) {
			snackbar && snackbar.open({message: '保存成功!', type: 'success'});
		}
		yield !isGlobal && put({type: 'UPDATE_EQUIPMENT', equipment: response.result.equipment});
	} catch (e) {
		yield put({type: 'FETCH_FAILED'});
	}
}

function* deleteEquipments(action) {
	try {
		const props = {
			ids: action.ids,
			currentPage: store.getState().equipments.currentPage,
			totalPage: store.getState().equipments.totalPage,
			filter: getFilter()
		};
		const response = yield call(doPost, 'equipment/deleteEquipments', props);
		let {currentPage, totalPage, list} = response.result;
		yield put({type: 'DELETE_EQUIPMENTS', list, currentPage, totalPage});
	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}

function* equipmentSaga() {
	yield [
		takeEvery('GET_EQUIPMENTS_ASYNC', getEquipments),
		takeEvery('ADD_EQUIPMENT_ASYNC', addEquipment),
		takeEvery('UPDATE_EQUIPMENT_ASYNC', updateEquipment),
		takeEvery('DELETE_EQUIPMENTS_ASYNC', deleteEquipments)
	];
}

function filterEquipmentInfo(equipments) {
	const dateHandle = ['prodDate', 'warranty', 'obtainDate', 'recordDate', 'financeVoucherDate'];
	const newEquipments = equipments.map((equipment, index) => {
		dateHandle.forEach((prop) => {
			const val = equipment[prop];
			if (val) {
				equipment[prop] = moment.get(val, 'YYYY-MM-DD');
			}
		});
		return equipment;
	});
	return newEquipments
}

function getFilter() {
	const search = store.getState().equipments.search;
	const filter = [{
		key: 'name',
		val: `'%${search}%'`,
		operator: ' ilike '
	}];
	return filter;
}

export default equipmentSaga;
