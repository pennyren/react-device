const initUsers = {
	search: '',
	currentPage: 1,
	totalPage: 1 ,
	list: []
};

const usersReducer = function(state = initUsers, action) {
	switch (action.type) {
		case 'GET_USERS':
			return diffUsersState(state, {
				currentPage: action.currentPage,
				totalPage: action.totalPage,
				list: action.list
			});
		case 'ADD_USER':
			return diffUsersState(state, {
				list: [...state.list, action.user]
			});
		case 'DELETE_USERS':
			return diffUsersState(state, {
				currentPage: action.currentPage,
				totalPage: action.totalPage,
				list: action.list
			});
		case 'UPDATE_USER':
			return diffUsersState(state, {
				list: state.list.map((user) => (user.id == action.user.id) ? action.user : user)
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
	keys.forEach((key) => {
		(newState[key] !== diff[key]) && (newState[key] = diff[key]);
	});
	return newState;
}

export default usersReducer;