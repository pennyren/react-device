import App from 'containers/App';
import SignIn from 'containers/SignIn';
import Dashboard from 'containers/Dashboard';

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
			onEnter: function (nextState, replaceState) {
				console.log(nextState);
				console.log(replaceState);
			}
		}]
	};
}

export default createRoutes;