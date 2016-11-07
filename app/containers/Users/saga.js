import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import moment from 'utils/date';
import getEnumVal from 'utils/enums';
import store from 'store';

const {doGet, doPost} = fetch;

function* initUsers(action) {
	try {
		const res = yield call(doPost, '/user/initUsers', {filter: {id: 1}});
		const {totalPage, users} = res.result;
		const filterUsers = users.map((user, index) => {
			const {role, ctime} = user;
			user.role = getEnumVal('userRole', role);
			user.ctime = moment.get(ctime, 'YYYY-MM-DD');
			return user;
		});
		yield put({type: 'INIT_USERS', users: filterUsers, totalPage});
	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}


function* addUser(action) {
	try {
		const res = yield call(doPost, 'user/create', action.user);
		const {currentPage, totalPage, list} = store.getState().users;
		const currentRows = list.length;
		if (currentPage !== totalPage) {
			return;
		} else {
			if (currentRows < 10) {
				let user = res.result;
				const {role, ctime} = user;
				user.role = getEnumVal('userRole', role);
				user.ctime = moment.get(ctime, 'YYYY-MM-DD');
				yield put({type: 'ADD_USER', user: user});
			} else {
				yield put({type: 'INCREASE_TOTAL', total: totalPage + 1});
			}
		}
	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}

function* batchDeleteUsers(action) {
	try {
		const res = yield call(doPost, 'user/batchDeleteUsers', {ids: action.ids});
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

export default userSaga;


