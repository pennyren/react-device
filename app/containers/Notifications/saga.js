import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import moment from 'utils/date';
import cookie from 'utils/cookie';
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

function* clearNotifications(action) {
	try {
		yield put({type: 'CLEAR_NOTIFICATIONS_NULL'});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

function* readNotification(action) {
	try {
		yield call(doPost, '/notification/read', {id: action.id});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

function* readAllNotification(action) {
	try {
		const {ids} = action;
		const response = yield call(doPost, '/notification/readAll', {ids: action.ids});
		if (response.success) {
			yield put({type: 'READ_ALL_TRUE', notifications: makeNotificationsReaded(store.getState().notifications, ids)});
		}
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}     

function* notificationSaga() {
	yield [
		takeEvery('GET_NOTIFICATIONS_ASYNC', getNotifications),
		takeEvery('CLEAR_NOTIFICATIONS', clearNotifications),
		takeEvery('READ_NOTIFICATION_ASYNC', readNotification),
		takeEvery('READ_ALL_ASYNC', readAllNotification)
	];
}

function getFilter() {
	const val = +cookie.get('uid');
	const filter = [{
		key: 'acceptUserId',
		val: val,
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

function makeNotificationsReaded(notifications, ids) {
	return notifications.map((notification, index) => {
		const id = +notification.id;
		if (ids.indexOf(id) != -1) {
			notification.read = true;
		}
		return notification;
	});
}

export default notificationSaga;
