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