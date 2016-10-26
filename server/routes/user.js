const express = require('express');
const user = express.Router();
const UserModel = require('./models/user');

user.post('/signin', (req, res) => {
	res.send(req.body);	
});

module.exports = user;