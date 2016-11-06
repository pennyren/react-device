import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import formatDate from 'utils/date';
import getEnumVal from 'utils/enums';

const {doGet, doPost} = fetch;

function* initUsers(action) {
	try {
		const userList = yield call(fetch);
		yield put({type: 'INIT_USERS'});
	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}


function* addUser(action) {
	try {
		const res = yield call(doPost, 'user/create', action.user);
		let user = res.result;
		const {role, ctime} = user;
		user.role = getEnumVal('userRole', role);
		user.ctime = formatDate(ctime, 'YYYY-MM-DD');
		yield put({type: 'ADD_USER', user: user});
	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}

//watch user async action
function* userSaga() {
	yield [
		takeEvery('INIT_USERS_REQ', initUsers),
		takeEvery('ADD_USER_REQ', addUser)
	];
}

export default userSaga;


