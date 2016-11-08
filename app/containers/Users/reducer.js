const initUsers = {
	isFiltered: false,
	currentPage: 1,
	totalPage: 1 ,
	list: []
};

const usersReducer = function(state = initUsers, action) {
	switch (action.type) {
		case 'INIT_USERS':
			let initState = Object.assign({}, state);
			initState.currentPage = 1;
			initState.totalPage = action.totalPage;
			initState.list = action.users;
			return initState;
		case 'ADD_USER':
			let addState = Object.assign({}, state);
			addState.list = [...addState.list];
			addState.list.push(action.user);
			return addState;
		case 'BATCH_DELETE_USERS':
			const {currentPage, totalPage, users} = action;
			let delState = Object.assign({}, state);
			delState.currentPage = currentPage;
			delState.totalPage = totalPage;
			delState.list = users;
			return delState;
		case 'SEARCH_USERS':
			let searchState = Object.assign({}, state);
			searchState.totalPage = action.totalPage;
			searchState.list = action.list;
			return searchState;
		case 'INCREASE_TOTAL':
			let totalState = Object.assign({}, state);
			totalState.totalPage = action.total;
			return totalState;
		default:
			return state;
	}
}

function diffUsersState(state, newState) {
	const shallowCloneState = Object.assign({}, state);
}

export default usersReducer;