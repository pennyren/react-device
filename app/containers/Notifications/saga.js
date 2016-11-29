import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import moment from 'utils/date';
import store from 'store';

const {doGet, doPost} = fetch;

function* getNotifications(action) {
	try {
		const currentCount = store.getState().notifications.length;
		const filter = getFilter();
		const response = yield call(doPost, '/notification/getNotifications', {filter, currentCount});
		const finalNotifications = filterNotificationsInfo(response.result.notifications);
		yield put({type: 'GET_NOTIFICATIONS', notifications: finalNotifications});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

      

function* notificationSaga() {
	yield [
		takeEvery('GET_NOTIFICATIONS_ASYNC', getNotifications)
	];
}

function getFilter() {
	const filter = [{
		key: 'acceptUserId',
		val: 1,
		operator: ' = '
	}];
	return filter;
}

function filterNotificationsInfo(notifications) {
	const newNotifications = notifications.map((notification, index) => {
		const {ctime} = notification;
		notification.ctime = moment.get(ctime, 'YYYY-MM-DD HH:MM');
		return notification;
	});
	return newNotifications
}

export default notificationSaga;
