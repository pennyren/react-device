import userRoute from './user';
import equipmentRoute from './equipment';
import baseRoute from './base';
import applyRoute from './apply';

const baseUrl = ['/user', '/equipment', 'apply'];
const startRoutes = (app) => {
	app.use(baseUrl, baseRoute);
	app.use('/user', userRoute);
	app.use('/equipment', equipmentRoute);
	app.use('/apply', applyRoute);
}

export default startRoutes;

