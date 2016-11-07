import express from 'express';
import BaseDao from '../dao/base';
import resetResponse from '../utils/response';

const baseRoute = express.Router();

baseRoute.get('/get', async (req, res) => {
	const entityName = req.baseUrl.slice(1);
	const baseDao = new BaseDao(entityName);
	const entity = await baseDao.get(+req.query.id);
	res.send(resetResponse(true, entity));	
});

baseRoute.post('/create', async (req, res) => {
	const entityName = req.baseUrl.slice(1);
	const baseDao = new BaseDao(entityName);
	const newEntity = await baseDao.create(req.body);
	res.send(resetResponse(true, newEntity));
});

baseRoute.post('/update', async (req, res) => {
	const entityName = req.baseUrl.slice(1);
	const {id, entity} = req.body;
	const baseDao = new BaseDao(entityName);
	const newEntity = await baseDao.update(id, entity);
	res.send(resetResponse(true, newEntity));
});

baseRoute.post('/delete', async (req, res) => {
	const entityName = req.baseUrl.slice(1);
	const baseDao = new BaseDao(entityName);
	const id = req.body.id;
	const delEntity = await baseDao.delete(id);
	res.send(resetResponse(true, delEntity));
});

baseRoute.post('/list', async (req, res) => {
	const entityName = req.baseUrl.slice(1);
	const baseDao = new BaseDao(entityName);
	let {pageIdx, pageSize, orderBy, filter} = req.body;
	const list = await baseDao.list(pageIdx, pageSize, orderBy, filter);
	res.send(resetResponse(true, list));
});

baseRoute.post('/count', async (req, res) => {
	const entityName = req.baseUrl.slice(1);
	const baseDao = new BaseDao(entityName);
	const count = await baseDao.count(req.body.filter);
	res.send(resetResponse(true, count));
});

baseRoute.get('/totalPage', async (req, res) => {
	const entityName = req.baseUrl.slice(1);
	const baseDao = new BaseDao(entityName);
	const pageSize = await baseDao.totalPage(+req.query.pageSize);
	res.send(resetResponse(true, pageSize));
});

export default baseRoute;