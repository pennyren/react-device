import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {history, routes} from './routes';
import {Provider} from 'react-redux';
import store from './store';


ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>, 
	document.getElementById('app')
);