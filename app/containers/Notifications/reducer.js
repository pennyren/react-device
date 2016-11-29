const initNotifications = [];

const notificationsReducer = function(state = initNotifications, action) {
	switch (action.type) {
		case 'GET_NOTIFICATIONS':
			return [...state, ...action.notifications];
		default:
			return state;
	}
}

export default notificationsReducer;