import express from 'express';
import UserDao from '../dao/user';
import resetResponse from '../utils/response';

const userRoute = express.Router();
const userDao = new UserDao();

userRoute.post('/signin', async (req, res) => {
	const {username, pwd} = req.body;
	const isMatched = await userDao.findUser(username, pwd);
	res.send(resetResponse(true, {isMatched}));	
});

userRoute.post('/getUsers', async (req, res) => {
	const {currentPage, isInitialized, filter} = req.body;
	const totalPage = isInitialized ? await userDao.totalPage(filter) : -1;
	const list = await userDao.list(filter, currentPage);
	res.send(resetResponse(true, {totalPage, list}));
});

userRoute.post('/addUser', async (req, res) => {
	const {entity, filter, isLastPage} = req.body;
	const count = await userDao.count(filter);
	const newEntity = await userDao.create(entity);
	const isIncrease = (isLastPage && (count % 10) == 0) ? true : false;
	res.send(resetResponse(true, {user: newEntity, isIncrease}));
});

userRoute.post('/deleteUsers', async (req, res) => {
	let {currentPage, totalPage, ids, filter} = req.body;
	const count = await userDao.count(filter);
	await userDao.batchDelete(ids);
	const newTotalPage = await userDao.totalPage(filter);
	if ((currentPage !== totalPage && ids.length == 10) || (currentPage == totalPage && ids.length == (count % 10))) {
		currentPage --;
	}
	const list = await userDao.list(filter, currentPage);
	res.send(resetResponse(true, {totalPage: newTotalPage, currentPage, list}));
});

export default userRoute;