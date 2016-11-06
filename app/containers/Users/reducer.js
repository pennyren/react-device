/*import fetch from 'utils/fetch';*/

/*fetch.doGet('/getUsers').then((data) => {
	
})*/

const initUsers = {
	isInitialized: false,
	isFiltered: false,
	currentPage: 1,
	totalPage: 1 ,
	firtList: [],
	currentList: []
};

const usersReducer = function(state = initUsers, action) {
	switch (action.type) {
		default:
			return state;
	}
}

export default usersReducer;