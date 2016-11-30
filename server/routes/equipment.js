import express from 'express';
import EquipmentDao from '../dao/equipment';
import UserDao from '../dao/user';
import HistoryDao from '../dao/history';
import moment from '../utils/date';
import resetResponse from '../utils/response';

const equipmentRoute = express.Router();
const equipmentDao = new EquipmentDao();
const userDao = new UserDao();
const historyDao = new HistoryDao();

equipmentRoute.post('/getEquipments', async (req, res) => {
	const {currentPage, filter} = req.body;
	const totalPage = await equipmentDao.totalPage(filter);
	const list = await equipmentDao.list(filter, currentPage);
	res.send(resetResponse(true, {totalPage, list}));
});

equipmentRoute.post('/addEquipment', async (req, res) => {
	const {entity, filter, isLastPage} = req.body;
	let isIncrease = false;
	const count = await equipmentDao.count(filter);
	const newEntity = await equipmentDao.create(entity);
	if (count != 0) {
		isIncrease = (isLastPage && (count % 10) == 0) ? true : false;
	}
	res.send(resetResponse(true, {equipment: newEntity, isIncrease}));
});

equipmentRoute.post('/deleteEquipments', async (req, res) => {
	let {currentPage, totalPage, ids, filter} = req.body;
	const count = await equipmentDao.count(filter);
	await equipmentDao.batchDelete(ids);
	const newTotalPage = await equipmentDao.totalPage(filter);
	
	if ((currentPage !== totalPage && ids.length == 10) || (currentPage == totalPage && ids.length == (count % 10) && currentPage != 1)) {
		currentPage --;
	}
	const list = await equipmentDao.list(filter, currentPage);
	res.send(resetResponse(true, {totalPage: newTotalPage, currentPage, list}));
});

equipmentRoute.post('/updateEquipment', async (req, res) => {
	let {id, entity} = req.body;
	const {status, username} = entity;
	
	let shouldCreateHistory = false;
	let user = null;
	const currentEquipment = await equipmentDao.get(id);

	if (username) {
		user = await userDao.findUserByUsername(username);
		if (!user) {
			res.send(resetResponse(false));
			return;
		}
	}

	if (status != currentEquipment.status || username != currentEquipment.username) {
		shouldCreateHistory = true;
	}

	if (shouldCreateHistory) {
		const finalUsername = username ? username : currentEquipment.username ? currentEquipment.username : '无';
		const finalStatus = status ? status : currentEquipment.status;
		let history = {
			equipmentId: id,
			ctime: moment.get(),
			content: `设备使用人: ${finalUsername} 状态: ${finalStatus}`,
		}
		if (username || currentEquipment.username) {
			history.userId = user.id;
		}
		await historyDao.create(history);
	}

	if (user) {
		entity.userId = +user.id;
	}
	const newEquipment = await equipmentDao.update(id, entity);
	res.send(resetResponse(true, {equipment: newEquipment}));
});

export default equipmentRoute;