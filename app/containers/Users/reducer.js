const initUsers = {
	isFiltered: false,
	currentPage: 1,
	totalPage: 1 ,
	list: []
};

const usersReducer = function(state = initUsers, action) {
	switch (action.type) {
		case 'GET_USERS':
			return diffUsersState(state, {
				currentPage: 1,
				totalPage: action.totalPage,
				list: action.users
			});
		case 'ADD_USER':
			return diffUsersState(state, {
				list: [...state.list, action.user]
			});
		case 'DELETE_USERS':
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
				list: state.list.map((user) => (user.id == action.user.id) ? action.user : user)
			});
		case 'ON_FILTERED':
			return diffUsersState(state, {
				isFiltered: action.isFiltered
			});
		case 'INCREASE_TOTAL_PAGE':
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
	keys.forEach((key) => {
		(newState[key] !== diff[key]) && (newState[key] = diff[key]);
	});
	return newState;
}

export default usersReducer;