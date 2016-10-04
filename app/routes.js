import React from 'react';
import {Route, IndexRoute, Redirect, useRouterHistory} from 'react-router';
import * as router from 'react-router';
import {createHashHistory} from 'history';
import App from 'containers/App';
import SignIn from 'containers/SignIn';
import Dashboard from 'containers/Dashboard';
import Equipment from'containers/Equipment';
import Setting from'containers/Setting';

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={SignIn}/>
		<Route path="signin" component={SignIn} />

		<Route path="dashboard" onEnter={checkUserInfo} component={Dashboard} >
			<IndexRoute component={Equipment} />
			<Route path="/setting" component={Setting} />
			<Redirect from="setting" to="/setting" />
		</Route>
	</Route>
);

const history = useRouterHistory(createHashHistory)({
	queryKey: false
});

const checkUserInfo = (nextState, replace, cb) => {
	alert(1);
	console.log(nextState);
}

export {routes, history};