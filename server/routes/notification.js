import express from 'express';
import NotificationDao from '../dao/notification';
import resetResponse from '../utils/response';

const notificationRoute = express.Router();
const notificationDao = new NotificationDao();

notificationRoute.post('/getNotifications', async (req, res) => {
	const {filter, currentCount} = req.body;
	const notifications = await notificationDao.offsetNotifications(filter, currentCount);
	res.send(resetResponse(true, {notifications}));
});

export default notificationRoute;