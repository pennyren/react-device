import App from 'containers/App';
import SignIn from 'containers/SignIn';
import Dashboard from 'containers/Dashboard';
import Equipment from'containers/Equipment';
import Setting from'containers/Setting';

const createRoutes = function() {
	return {
		path: '/',
		component: App,
		indexRoute: {component: SignIn},
		childRoutes: [{
			path: 'signin',
			component: SignIn
		}, {
			path: 'dashboard',
			component: Dashboard,
			indexRoute: {component: Equipment},
			onEnter: function (nextState, replaceState) {
				
			},
			childRoutes: [{
				path: '/setting',
				component: Setting
			}]
		}]
	};
}

export default createRoutes;