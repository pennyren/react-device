import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import moment from 'utils/date';
import store from 'store';

const {doGet, doPost} = fetch;

function* getNotifications(action) {
	try {
		
		yield put({type: 'GET_NOTIFICATIONS'});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

      

function* notificationSaga() {
	yield [
		takeEvery('GET_NOTIFICATIONS_ASYNC', getNotifications)
	];
}

export default notificationSaga;
