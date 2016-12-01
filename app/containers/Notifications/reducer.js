const initNotifications = [];

const notificationsReducer = function(state = initNotifications, action) {
	switch (action.type) {
		case 'GET_NOTIFICATIONS':
			return [...state, ...action.notifications];
		case 'CLEAR_NOTIFICATIONS_NULL':
			return [];
		case 'READ_ALL_TRUE':
			return action.notifications;
		default:
			return state;
	}
}

export default notificationsReducer;