import express from 'express';
import UserDao from '../dao/user';
import resetResponse from '../utils/response';

const userRoute = express.Router();
const userDao = new UserDao();

userRoute.post('/signin', async (req, res) => {
	const {username, pwd} = req.body;
	const isMatched = await userDao.findUser(username, pwd);
	res.send();	
});

userRoute.post('/initUsers', async (req, res) => {
	const {pageIdx, pageSize, orderBy, filter} = req.body;
	const totalPage = await userDao.totalPage();
	const users = await userDao.list(pageIdx, pageSize, orderBy, filter);
	res.send(resetResponse(true, {totalPage, users}));
});

userRoute.post('/batchDeleteUsers', async (req, res) => {
	const ids = req.body.ids;
	const del = await userDao.batchDelete(ids);
	res.send({});
})

export default userRoute;