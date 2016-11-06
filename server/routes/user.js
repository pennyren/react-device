import express from 'express';
import UserDao from '../dao/user';
import formatDate from '../utils/date';
import resetResponse from '../utils/response';

const userRoute = express.Router();
const userDao = new UserDao();

userRoute.post('/signin', async (req, res) => {
	const {username, pwd} = req.body;
	const isMatched = await userDao.findUser(username, pwd);
	res.send(resetResponse(true, isMatched));	
});

userRoute.post('/create', async (req, res) => {
	req.body.ctime = formatDate();
	const user = await userDao.create(req.body);
	res.send(resetResponse(true, user));
});

userRoute.post('/update', async (req, res) => {
	const {id, entity} = req.body;
	entity.utime = format(new Date(), 'YYYY-MM-DD HH:MM:SS');
	const user = await userDao.update(id, entity);
});

userRoute.post('/delete', async (req, res) => {
	req.body.utime = format(new Date(), 'YYYY-MM-DD HH:MM:SS');
})

export default userRoute;