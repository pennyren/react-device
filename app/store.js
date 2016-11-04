import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import appSagas from './sagas';
import appReducers from './reducers';

const sagaMiddleware= createSagaMiddleware()
const store = createStore(
	appReducers,
	compose(applyMiddleware(sagaMiddleware), window.devToolsExtension && window.devToolsExtension())
);

sagaMiddleware.run(appSagas);

export default store;