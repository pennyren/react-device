import express from 'express';
import NotificationDao from '../dao/notification';
import resetResponse from '../utils/response';

const notificationRoute = express.Router();
const notificationDao = new NotificationDao();

notificationRoute.post('/getNotifications', async (req, res) => {
	const {filter, currentCount} = req.body;
	const allCount = await notificationDao.count(filter);
	const notifications = await notificationDao.offsetNotifications(filter, currentCount);
	const hasOlder = (notifications.length + currentCount) < allCount;
	res.send(resetResponse(true, {notifications, hasOlder}));
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

notificationRoute.post('/getNewest', async (req, res) => {
	const {acceptUserId} = req.body;
	const ids = await notificationDao.getNewest(acceptUserId);
	res.send(resetResponse(true, ids));
});

export default notificationRoute;