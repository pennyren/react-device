const initUsers = {
	isInitialized: false,
	isFiltered: false,
	currentPage: 1,
	totalPage: 1 ,
	list: []
};

const usersReducer = function(state = initUsers, action) {
	switch (action.type) {
		case 'INIT_USERS':
			let initState = Object.assign({}, state);
			initState.isInitialized = true;
			initState.currentPage = 1;
			initState.totalPage = action.totalPage;
			initState.list = action.users;
			return initState;
		case 'UNMOUNT_USERS':
			let unmountState = Object.assign({}, state);
			unmountState.isInitialized = false;
			unmountState.isFiltered = false;
			return unmountState;
		case 'ADD_USER':
			let addState = Object.assign({}, state);
			addState.list = [...addState.list];
			addState.list.push(action.user);
			return addState;
		case 'BATCH_DELETE_USERS':
			const {currentPage, totalPage, users} = action;
			let batchDeleteState = Object.assign({}, state);
			batchDeleteState.currentPage = currentPage;
			batchDeleteState.totalPage = totalPage;
			batchDeleteState.list = users;
			return batchDeleteState;
		case 'INCREASE_TOTAL':
			let totalState = Object.assign({}, state);
			totalState.totalPage = action.total;
			return totalState;
		default:
			return state;
	}
}

export default usersReducer;