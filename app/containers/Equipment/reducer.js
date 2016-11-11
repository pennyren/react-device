const initEquipments = {
	search: '',
	currentPage: 1,
	totalPage: 1 ,
	currentEquipment: {},
	list: []
};

const equipmentsReducer = function(state = initEquipments, action) {
	switch (action.type) {
		default:
			return state;
	}
}

function diffEquipmentsState(state, diff) {
	const newState = Object.assign({}, state);
	const keys = Object.keys(diff);
	keys.forEach((key) => {
		(newState[key] !== diff[key]) && (newState[key] = diff[key]);
	});
	return newState;
}

export default equipmentsReducer;