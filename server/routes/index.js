import userRoute from './user';
import equipmentRoute from './equipment';
import baseRoute from './base';
import applyRoute from './apply';
import notificationRoute from './notification';
import historyRoute from './history';

const baseUrl = ['/user', '/equipment', '/apply', '/notification', '/apply', '/history'];
const startRoutes = (app) => {
	app.use(baseUrl, baseRoute);
	app.use('/user', userRoute);
	app.use('/equipment', equipmentRoute);
	app.use('/apply', applyRoute);
	app.use('/notification', notificationRoute);
	app.use('/history', historyRoute);
}

export default startRoutes;

