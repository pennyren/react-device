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

notificationRoute.post('/read', async (req, res) => {
	const {id} = req.body;
	const newNotification = await notificationDao.update(id, {read: true});
	res.send(resetResponse(true, {notification: newNotification}));
});

notificationRoute.post('/readAll', async (req, res) => {
	const {ids} = req.body;
	await notificationDao.readAll(ids);
	res.send(resetResponse(true));
});

export default notificationRoute;