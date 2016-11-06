import express from 'express';
import baseDao from '../dao/base';
import resetResponse from '../utils/response';

const baseRoute = express.Router();
const baseDao = new baseDao();

baseRoute.get('/get', async (req, res) => {
	const id = req.query.id;
	const entity = await baseDao.get(id);
	res.send(resetResponse(true, entity));	
});

export default baseRoute;