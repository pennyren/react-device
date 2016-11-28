import {combineReducers} from 'redux';
import usersReducer from 'containers/Users/reducer';
import equipmentsReducer from 'containers/Equipment/reducer';
import notificationsReducer from 'containers/Notifications/reducer';

const appReducers = combineReducers({
	users: usersReducer,
	equipments: equipmentsReducer,
	notifications: notificationsReducer
});

export default appReducers;