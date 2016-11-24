import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import moment from 'utils/date';
import getEnumVal from 'utils/enums';
import store from 'store';

const {doGet, doPost} = fetch;

function* getUsers(action) {
	try {
		const currentPage = action.currentPage;
		const props = {
			currentPage: currentPage,
			filter: getFilter()
		};
		
		const response = yield call(doPost, '/user/getUsers', props);
		let {totalPage, list} = response.result;
		const finalList = list.length == 0 ? [] : filterUserInfo(list);
		yield put({type: 'GET_USERS', list: finalList, totalPage, currentPage});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

      
function* addUser(action) {
	try {
		const {currentPage, totalPage, list} = store.getState().users;
		const isLastPage = currentPage == totalPage;
		const props = {
			entity: action.user,
			filter: getFilter(),
			isLastPage
		}
		const response = yield call(doPost, 'user/addUser', props);
		const {user, isIncrease} = response.result;
		if (isIncrease) {
			yield put({type: 'INCREASE_TOTAL', totalPage: totalPage + 1})
		} else if (isLastPage) {
			yield put({type: 'ADD_USER', user: filterUserInfo([user])[0]})
		}

	} catch (e) {
		yield put({type: 'FETCH_FAILED'})
	}
}

function* deleteUsers(action) {
	try {
		const props = {
			ids: action.ids,
			currentPage: store.getState().users.currentPage,
			totalPage: store.getState().users.totalPage,
			filter: getFilter()
		};
		
		const response = yield call(doPost, 'user/deleteUsers', props);
		
		let {currentPage, totalPage, list} = response.result;
		const finalList = list.length == 0 ? [] : filterUserInfo(list);
		yield put({type: 'DELETE_USERS', list: finalList, currentPage, totalPage});
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

//watch user async action
function* userSaga() {
	yield [
		takeEvery('GET_USERS_ASYNC', getUsers),
		takeEvery('ADD_USER_ASYNC', addUser),
		takeEvery('DELETE_USERS_ASYNC', deleteUsers),
		takeEvery('UPDATE_USER_ASYNC', updateUser)
	];
}

function filterUserInfo(users) {
	const newUsers = users.map((user, index) => {
		const {ctime} = user;
		user.ctime = moment.get(ctime, 'YYYY-MM-DD');
		return user;
	});
	return newUsers
}

function getFilter() {
	const search = store.getState().users.search;
	const filter = [{
		key: 'id',
		val: 1,
		operator: ' != '
	}, {
		key: 'username',
		val: `'%${search}%'`,
		operator: ' ilike '
	}];
	return filter;
}

export default userSaga;
