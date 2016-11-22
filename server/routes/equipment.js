import express from 'express';
import EquipmentDao from '../dao/equipment';
import UserDao from '../dao/user';
import resetResponse from '../utils/response';

const equipmentRoute = express.Router();
const equipmentDao = new EquipmentDao();
const userDao = new UserDao();

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

equipmentRoute.post('/updateDetail', async (req, res) => {
	let {id, entity} = req.body;
	const user = await userDao.findUserByUsername(entity.username);
	if (user) {
		entity.userId = +user.id;
		const newEquipment = await equipmentDao.update(id, entity);
		res.send(resetResponse(true, {equipment: newEquipment}));
	} else {
		res.send(resetResponse(false));
	}
});

export default equipmentRoute;