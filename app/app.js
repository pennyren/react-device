import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import appHistory from 'utils/history';
import createRoutes from './routes';

const appRoutes = createRoutes();

ReactDOM.render(
	<Router
		history={appHistory} 
		routes={appRoutes}
	/>, 
	document.getElementById('app')
);