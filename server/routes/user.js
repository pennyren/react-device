import express from 'express';
import UserDao from '../dao/user';

const userRoute = express.Router();
const userDao = new UserDao();

userRoute.post('/signin', async (req, res) => {
	const {username, password} = req.body;
	
	const isMatched = await userDao.findUser(username, password);
	isMatched.async = true;
	res.send(isMatched);	
});

export default userRoute;