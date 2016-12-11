import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import fetch from 'utils/fetch';
import moment from 'utils/date';
import store from 'store';

const {doGet, doPost} = fetch;

function* getCurrentApproval(action) {
	try {
		const response = yield call(doGet, '/apply/getCurrentApproval', {id: action.id});
		yield put({type: 'GET_CURRENT_APPROVAL', current: response.result.current});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

function* getApprovalList(action) {
	const offset = store.getState().approvals.list.length;
	const userId = 1;
	try {
		const response = yield call(doPost, '/apply/getOffsetList', {userId: userId, offset: offset});
		yield put({type: 'GET_APPROVALS', list: filterApprovalsInfo(response.result.list)});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

function* clearApprovals(action) {
	try {
		yield put({type: 'CLEAR_APPROVALS_LIST'});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

function* clearCurrentApproval(action) {
	try {
		yield put({type: 'CLEAR_APPROVALS_CURRENT'});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

function* doApproval(action) {
	try {
		const {applyId, content, isAgreed} = action
		const response = yield call(doPost, '/apply/doApproval', {applyId, content, isAgreed});
		yield put({type: 'DO_APPROVAL'});
	} catch (e) {
		yield put({type: 'FETCH_FAILED', message: e});
	}
}

function* approvalSaga() {
	yield [
		takeEvery('GET_CURRENT_APPROVAL_ASYNC', getCurrentApproval),
		takeEvery('GET_APPROVALS_ASYNC', getApprovalList),
		takeEvery('CLEAR_APPROVALS', clearApprovals),
		takeEvery('CLEAR_CURRENT_APPROVAL', clearCurrentApproval),
		takeEvery('DO_APPROVAL_ASYNC', doApproval)
	];
}

function filterApprovalsInfo(approvals) {
	const newApprovals = approvals.map((approval, index) => {
		const {ctime} = approval;
		approval.ctime = moment.get(ctime, 'YYYY-MM-DD HH:MM');
		return approval;
	});
	return newApprovals;
}

export default approvalSaga;
