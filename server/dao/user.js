import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class UserDao extends BaseDao {
	constructor() {
		super('user');
	}
	
	findUser = (username, password) => {
		const sql = `select * from public.user`;
		return executeQuery(sql);
	}
}

export default UserDao;