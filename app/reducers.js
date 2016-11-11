import {combineReducers} from 'redux';
import usersReducer from 'containers/Users/reducer';
import equipmentsReducer from 'containers/Equipment/reducer';

const appReducers = combineReducers({
	users: usersReducer,
	equipments: equipmentsReducer
});

export default appReducers;