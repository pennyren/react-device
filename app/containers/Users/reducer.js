const initUsers = {
	isFiltered: false,
	currentPage: 1,
	totalPage: 1 ,
	list: []
};

const usersReducer = function(state = initUsers, action) {
	switch (action.type) {
		case 'INIT_USERS':
			return diffUsersState(state, {
				currentPage: 1,
				totalPage: action.totalPage,
				list: action.users
			});
		case 'ADD_USER':
			return diffUsersState(state, {
				list: [...state.list, action.user]
			});
		case 'BATCH_DELETE_USERS':
			return diffUsersState(state, {
				currentPage: action.currentPage,
				totalPage: action.totalPage,
				list: action.users
			});
		case 'SEARCH_USERS':
			return diffUsersState(state, {
				totalPage: action.totalPage,
				list: action.list
			});
		case 'UPDATE_USER':
			return diffUsersState(state, {
				list: action.list
			});
		case 'INCREASE_TOTAL':
			return diffUsersState(state, {
				totalPage: action.totalPage,
			});
		default:
			return state;
	}
}

function diffUsersState(state, diff) {
	const newState = Object.assign({}, state);
	const keys = Object.keys(diff);
	keys.map((key) => {
		(newState[key] !== diff[key]) && (newState[key] = diff[key]);
	});
	return newState;
}

export default usersReducer;