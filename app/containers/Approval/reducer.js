const initApprovals = {
	list: [],
	current: {},
	hasOlder: false
};

const approvalsReducer = function(state = initApprovals, action) {
	switch (action.type) {
		case 'GET_CURRENT_APPROVAL':
			return diffApprovalsState(state, {
				current: action.current
			});
		case 'GET_APPROVALS':
			return diffApprovalsState(state, {
				list: [...state.list, ...action.list],
				hasOlder: action.hasOlder
			});
		case 'CLEAR_APPROVALS_LIST':
			return diffApprovalsState(state, {
				list: [],
				hasOlder: false
			});
		case 'CLEAR_APPROVALS_CURRENT':
			return diffApprovalsState(state, {
				current: {}
			});
		case 'DO_APPROVAL':
			return diffApprovalsState(state, {
				current: action.current
			});
		case 'REFRESH_APPROVALS':
			return diffApprovalsState(state, {
				list: action.list,
				hasOlder: action.hasOlder
			});
		default:
			return state;
	}
}

function diffApprovalsState(state, diff) {
	const newState = Object.assign({}, state);
	const keys = Object.keys(diff);
	keys.forEach((key) => {
		(newState[key] !== diff[key]) && (newState[key] = diff[key]);
	});
	return newState;
}

export default approvalsReducer;