const pool = require('../utils/connectToDb');
const BaseModel = require('./base');

class UserModel extends BaseModel {
	constructor() {
		super();
	}
}

module.exports = userModel;