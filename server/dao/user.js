import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class UserDao extends BaseDao {
	constructor() {
		super('user');
	}
	
	findUser = async (username, pwd) => {
		const sql = `select count(*) from "user" where username = '${username}' and pwd = '${pwd}'`;
		const result = await executeQuery(sql);
		const count = +result.rows[0].count;
		return count == 0 ? false : true;
	}

	batchDelete = async (ids) => {
		const sql = `delete from "user" where id in (${ids.join(', ')})`;
		await executeQuery(sql);
	}

	getUsersByUsername = async (username) => {
		const sql = `select username from "user" where username ilike '%${username}%'`;
		const result = await executeQuery(sql);
		return result.rows;
	}

	findUserByUsername = async (username) => {
		const sql = `select * from "user" where username = '${username}'`;
		const result = await executeQuery(sql);
		return result.rows[0];
	}
}

export default UserDao;