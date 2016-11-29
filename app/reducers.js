import {combineReducers} from 'redux';
import usersReducer from 'containers/Users/reducer';
import equipmentsReducer from 'containers/Equipment/reducer';
import notificationsReducer from 'containers/Notifications/reducer';
import approvalsReducer from 'containers/Approval/reducer';

const appReducers = combineReducers({
	users: usersReducer,
	equipments: equipmentsReducer,
	notifications: notificationsReducer,
	approvals: approvalsReducer
});

export default appReducers;