import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';

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
		console.log(1);
		const user = yield call(doPost, '/createUser', action.user);
		console.log(4)
		yield put({type: 'INIT_USERS'});
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


