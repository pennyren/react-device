const initEquipments = {
	search: '',
	currentPage: 1,
	totalPage: 1 ,
	currentEquipment: {},
	list: []
};

const equipmentsReducer = function(state = initEquipments, action) {
	switch (action.type) {
		case 'GET_EQUIPMENTS':
			return diffEquipmentsState(state, {
				currentPage: action.currentPage,
				totalPage: action.totalPage,
				list: action.list
			});
		case 'ADD_EQUIPMENT':
			return diffEquipmentsState(state, {
				list: [...state.list, action.equipment]
			});
		case 'UPDATE_EQUIPMENT':
			return diffEquipmentsState(state, {
				list: state.list.map((equipment) => (equipment.id == action.equipment.id) ? action.equipment : equipment)
			});
		case 'DELETE_EQUIPMENTS':
			return diffEquipmentsState(state, {
				currentPage: action.currentPage,
				totalPage: action.totalPage,
				list: action.list
			});
		case 'INCREASE_TOTAL':
			return diffEquipmentsState(state, {
				totalPage: action.totalPage,
			});
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