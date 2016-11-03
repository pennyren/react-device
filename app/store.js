import {createStore} from 'redux';
import reactEMS from './reducers';

const store = createStore(reactEMS, window.devToolsExtension && window.devToolsExtension());

export default store;