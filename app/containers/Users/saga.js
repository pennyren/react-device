import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import moment from 'utils/date';
import getEnumVal from 'utils/enums';
import store from 'store';

const {doGet, doPost} = fetch;

function* initUsers(action) {
	try {
		const response = yield call(doPost, '/user/initUsers', {filter: {id: 1}});
		let {totalPage, users} = response.result;
		const len = users.length;
		const filterUsers = len == 0 ? [] : filterUserInfo(users);
		yield put({type: 'INIT_USERS', users: filterUsers, totalPage});
	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}


function* addUser(action) {
	try {
		const {currentPage, totalPage, list} = store.getState().users;
		const response = yield call(doPost, 'user/create', action.user);

		let user = response.result;
		
		if (currentPage == totalPage) {
			yield list.length < 10 ? put({type: 'ADD_USER', user: filterUserInfo([user])[0]}) :
				  put({type: 'INCREASE_TOTAL', total: totalPage + 1})
		} 
	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}

function* batchDeleteUsers(action) {
	try {
		const props = {
			ids: action.ids,
			currentPage: store.getState().users.currentPage	
		};
		const response = yield call(doPost, 'user/batchDeleteUsers', props);
		let {currentPage, totalPage, users} = response.result;
		const len = users.length;
		const filterUsers = len == 0 ? [] : filterUserInfo(users);
		yield put({type: 'BATCH_DELETE_USERS', users: filterUserInfo(users), currentPage, totalPage});
	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}

function* unmountUsers(action) {
	yield put({type: 'UNMOUNT_USERS'});
}

//watch user async action
function* userSaga() {
	yield [
		takeEvery('INIT_USERS_REQ', initUsers),
		takeEvery('ADD_USER_REQ', addUser),
		takeEvery('BATCH_DELETE_USERS_REQ', batchDeleteUsers),
		takeEvery('UNMOUNT_USERS', unmountUsers)
	];
}

function filterUserInfo(users) {
	const newUsers = users.map((user, index) => {
		const {role, ctime} = user;
		user.role = getEnumVal('userRole', role);
		user.ctime = moment.get(ctime, 'YYYY-MM-DD');
		return user;
	});
	return newUsers
}

export default userSaga;


