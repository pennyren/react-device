import express from 'express';
import UserDao from '../dao/user';

const userRoute = express.Router();
const userDao = new UserDao();

userRoute.post('/signin', async (req, res) => {
	const {username, pwd} = req.body;
	const isMatched = await userDao.findUser(username, pwd);
	res.send({
		success: true,
		result: isMatched
	});	
});

export default userRoute;