import express from 'express';
import UserDao from '../dao/user';

const userRoute = express.Router();
const userDao = new UserDao();

userRoute.post('/signin', (req, res) => {
	const {username, password} = req.body;
	
	const isMatched = userDao.findUser(username, password);
	console.log(3);
	res.send(isMatched);	
});

export default userRoute;