const express = require('express');
const user = express.Router();

user.post('/signin', (req, res) => {
	console.log(req.query);
	res.send(req.body);
});

module.exports = user;