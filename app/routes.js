import React from 'react';
import {Route, IndexRoute, Redirect, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import App from 'containers/App';
import SignIn from 'containers/SignIn';
import Dashboard from 'containers/Dashboard';
import Equipment from'containers/Equipment';
import Users from 'containers/Users';
import Setting from'containers/Setting';
import Notifications from'containers/Notifications';
import Approval from 'containers/Approval';
import EditEquipment from 'containers/EditEquipment';
import DoneApproval from 'containers/DoneApproval';
import History from 'containers/History';

const history = useRouterHistory(createHashHistory)({
	queryKey: false
});

const requireAuth = (nextState, replace) => {
	console.log(nextState);
}

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={SignIn}/>
		<Route path="signin" component={SignIn} />

		<Route path="dashboard" component={Dashboard} onEnter={requireAuth}>
			<IndexRoute component={Equipment} />
			<Route path="/equipment" component={Equipment} onEnter={requireAuth} />
			<Route path="/users" component={Users} onEnter={requireAuth} />
			<Route path="/setting" component={Setting} onEnter={requireAuth} />
			<Route path="/notifications" component={Notifications} onEnter={requireAuth} />
			<Route path="/approval" component={Approval} onEnter={requireAuth} />
			<Route path="/equipment/:id" component={EditEquipment} onEnter={requireAuth} />
			<Route path="/equipment/:id/history" component={History} onEnter={requireAuth} />
			<Route path="/approval/:id" component={DoneApproval} onEnter={requireAuth} />
		</Route>
	</Route>
);

export {routes, history};