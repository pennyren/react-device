import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import moment from 'utils/date';
import getEnumVal from 'utils/enums';
import store from 'store';

const {doGet, doPost} = fetch;

function* getUsers(action) {
	try {
		const props = {
			currentPage: action.currentPage,
			isInitialized: action.isInitialized,
			filter: {id: 1}
		}
		const response = yield call(doPost, '/user/getUsers', props);
		let {totalPage, users} = response.result;
		const len = users.length;
		const filterUsers = len == 0 ? [] : filterUserInfo(users);
		yield put({type: 'GET_USERS', users: filterUsers, totalPage});
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

function* deleteUsers(action) {
	try {
		const props = {
			ids: action.ids,
			currentPage: store.getState().users.currentPage	
		};
		const response = yield call(doPost, 'user/deleteUsers', props);
		let {currentPage, totalPage, users} = response.result;
		const len = users.length;
		const filterUsers = len == 0 ? [] : filterUserInfo(users);
		yield put({type: 'BATCH_DELETE_USERS', users: filterUsers, currentPage, totalPage});
	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}

function* updateUser(action) {
	try {
		const response = yield call(doPost, 'user/update', action.user);
		const newUser = response.result;
		yield put({type: 'UPDATE_USER', user: filterUserInfo([newUser])[0]});
	} catch (e) {
		yield put({type: 'FETCH_FAILED'});
	}
}

function* searchUsers(action) {
	try {
		const props = {
			search: action.search,
			filter: {id: 1},
			currentPage: action.currentPage || 1
		};
		const response = yield call(doPost, 'user/searchUsers', props);
		const {currentPage, totalPage, list} = response.result;
		const finalList = list.length == 0 ? [] : filterUserInfo(list);
		yield put({type: 'ON_FILTERED', isFiltered: (action.search == '') ? false : true});
		yield put({type: 'SEARCH_USERS', list: finalList, currentPage, totalPage});
	} catch (e) {
		yield put({type: 'FETCH_FAILED'});
	}
}


//watch user async action
function* userSaga() {
	yield [
		takeEvery('GET_USERS_ASYNC', getUsers),
		takeEvery('ADD_USER_ASYNC', addUser),
		takeEvery('DELETE_USERS_ASYNC', deleteUsers),
		takeEvery('UPDATE_USER_ASYNC', updateUser),
		takeEvery('SEARCH_USERS_ASYNC', searchUsers),
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


