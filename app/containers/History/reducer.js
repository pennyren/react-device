const initHistory = [];

const historyReducer = function(state = initHistory, action) {
	switch (action.type) {
		case 'GET_HISTORY':
			return [...state, ...action.history];
		case 'CLEAR_HISTORY_NULL':
			return [];
		default:
			return state;
	}
}

export default historyReducer;