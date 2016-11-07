import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class UserDao extends BaseDao {
	constructor() {
		super('user');
	}
	
	findUser = async (username, pwd) => {
		const sql = `select count(*) from "user" where username='${username}' and pwd='${pwd}'`;
		const result = await executeQuery(sql);
		const count = result.rows[0].count;
		return count == '1' ? true : false;
	}

	batchDelete = async (ids) => {
		const sql = `delete from "user" where id in (${ids.join(', ')})`;
		const result = await executeQuery(sql);
		console.log(result);
	}
}

export default UserDao;