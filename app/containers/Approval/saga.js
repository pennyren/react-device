import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import moment from 'utils/date';
import store from 'store';

const {doGet, doPost} = fetch;

function* getCurrentApproval(action) {
	try {
		const response = yield call(doGet, '/apply/get', {id: action.id});
		yield put({type: 'GET_CURRENT_APPROVAL', current: response.result});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

function* approvalSaga() {
	yield [
		takeEvery('GET_CURRENT_APPROVAL_ASYNC', getCurrentApproval)
	];
}

export default approvalSaga;
