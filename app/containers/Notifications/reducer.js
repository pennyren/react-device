const initNotifications = {
	list: [],
	hasOlder: false
}

const notificationsReducer = function(state = initNotifications, action) {
	switch (action.type) {
		case 'GET_NOTIFICATIONS':
			return {
				list: [...state.list, ...action.notifications],
				hasOlder: action.hasOlder
			};
		case 'CLEAR_NOTIFICATIONS_NULL':
			return {
				list: [],
				hasOlder: false
			}
		case 'READ_ALL_TRUE':
			return {
				list: action.notifications,
				hasOlder: state.hasOlder
			};
		case 'REFRESH_NOTIFICATIONS':
			return {
				list: action.notifications,
				hasOlder: action.hasOlder
			};
		default:
			return state;
	}
}

export default notificationsReducer;