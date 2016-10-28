import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class UserDao extends BaseDao {
	constructor() {
		super('user');
	}
	
	findUser = async (username, password) => {
		const sql = `select count(*) from public.user where usernaem=${username} and password=${password}`;
		const result = await executeQuery(sql);
		return result.rows;
	}
}

export default UserDao;