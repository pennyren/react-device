const initHistory = {
	list: [],
	hasOlder: false
};

const historyReducer = function(state = initHistory, action) {
	switch (action.type) {
		case 'GET_HISTORY':
			return {
				list: [...state.list, ...action.history],
				hasOlder: action.hasOlder
			};
		case 'CLEAR_HISTORY_NULL':
			return {
				list: [],
				hasOlder: false
			};
		default:
			return state;
	}
}

export default historyReducer;