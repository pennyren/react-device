import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {history, routes} from './routes';

ReactDOM.render(
	<Router history={history} routes={routes} />, 
	document.getElementById('app')
);