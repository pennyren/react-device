import fetch from 'utils/fetch';

/*fetch.doGet('/getUsers').then((data) => {
	
})*/

const initState = [];

const usersReducer = function(state = initState, action) {
	switch (action.type) {
		default:
			return state;
	}
}

export default usersReducer;