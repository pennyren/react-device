const initApprovals = {
	list: [],
	current: {}
};

const approvalsReducer = function(state = initApprovals, action) {
	switch (action.type) {
		case 'GET_CURRENT_APPROVAL':
			return diffApprovalsState(state, {
				current: action.current
			});
		case 'GET_APPROVALS':
			return diffApprovalsState(state, {
				list: action.list
			});
		case 'CLEAR_APPROVALS_LIST':
			return diffApprovalsState(state, {
				list: []
			});
		case 'CLEAR_APPROVALS_CURRENT':
			return diffApprovalsState(state, {
				current: {}
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