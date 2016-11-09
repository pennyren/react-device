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
	const {filter} = req.body;
	const totalPage = await userDao.totalPage();
	const users = await userDao.list(filter);
	res.send(resetResponse(true, {totalPage, users}));
});

userRoute.post('/deleteUsers', async (req, res) => {
	const filter = {id: 1};
	let {currentPage, ids} = req.body;
	ids.length == 10 && currentPage--;
	await userDao.batchDelete(ids);
	const totalPage = await userDao.totalPage();
	const users = await userDao.list({id: 1}, currentPage);
	res.send(resetResponse(true, {currentPage, totalPage, users}));
});

userRoute.post('/searchUsers', async (req, res) => {
	const {search, filter, currentPage} = req.body.search;
	const result = await userDao.search(search, filter, currentPage);
	res.send(resetResponse(true, result));
})

export default userRoute;