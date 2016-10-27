import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class UserDao extends BaseDao {
	constructor() {
		super('user');
	}
	
	findUser(username, password) {
		const sql = `select count(*) from user`;
		const result = executeQuery(sql);
		console.log(2)
		return result;
		
	}
}

export default UserDao;