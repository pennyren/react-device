import userRoute from './user';
import baseRoute from './base';

const baseUrl = ['/user', '/equipment'];
const startRoutes = (app) => {
	app.use(baseUrl, baseRoute);
	app.use('/user', userRoute);
}

export default startRoutes;

