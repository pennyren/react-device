import userRoute from './user';
import equipmentRoute from './equipment';
import baseRoute from './base';

const baseUrl = ['/user', '/equipment'];
const startRoutes = (app) => {
	app.use(baseUrl, baseRoute);
	app.use('/user', userRoute);
	app.use('/equipment', equipmentRoute);
}

export default startRoutes;

