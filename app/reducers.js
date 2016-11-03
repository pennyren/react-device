import {combineReducers} from 'redux';
import usersReducer from 'containers/Users/reducer';

const reactEMS = combineReducers({
	users: usersReducer
});

export default reactEMS;