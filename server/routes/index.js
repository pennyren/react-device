import userRoute from './user';

const startRoutes = (app) => {
	app.use('/user', userRoute);
}

export default startRoutes;

