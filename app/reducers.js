import {combineReducers} from 'redux';
import usersReducer from 'containers/Users/reducer';

const appReducers = combineReducers({
	users: usersReducer
});

export default appReducers;