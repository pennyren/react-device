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
	const {currentPage, filter} = req.body;
	const totalPage = await userDao.totalPage(filter);
	const list = await userDao.list(filter, currentPage);
	res.send(resetResponse(true, {totalPage, list}));
});

userRoute.post('/addUser', async (req, res) => {
	const {entity, filter, isLastPage} = req.body;
	let isIncrease = false;
	const count = await userDao.count(filter);
	const newEntity = await userDao.create(entity);
	if (count != 0) {
		isIncrease = (isLastPage && (count % 10) == 0) ? true : false;
	}
	res.send(resetResponse(true, {user: newEntity, isIncrease}));
});

userRoute.post('/deleteUsers', async (req, res) => {
	let {currentPage, totalPage, ids, filter} = req.body;
	const count = await userDao.count(filter);
	await userDao.batchDelete(ids);
	const newTotalPage = await userDao.totalPage(filter);
	if ((currentPage !== totalPage && ids.length == 10) || (currentPage == totalPage && ids.length == (count % 10) && currentPage != 1)) {
		currentPage --;
	}
	const list = await userDao.list(filter, currentPage);
	res.send(resetResponse(true, {totalPage: newTotalPage, currentPage, list}));
});

userRoute.post('/getUsersByUsername', async (req, res) => {
	const {username} = req.body;
	const users = await userDao.getUsersByUsername(username);
	res.send(resetResponse(true, {users}));
})

export default userRoute;