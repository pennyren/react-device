import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import moment from 'utils/date';
import getEnumVal from 'utils/enums';
import store from 'store';

const {doGet, doPost} = fetch;

function* getEquipments(action) {
	try {
		yield put({type: 'getEquipments'});
	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}

function* equipmentSaga() {
	yield [
		takeEvery('GET_EQUIPMENTS_ASYNC', getEquipments)
	];
}

export default equipmentSaga;
