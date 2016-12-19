import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class UserDao extends BaseDao {
	constructor() {
		super('user');
	}
	
	findUser = async (username, pwd) => {
		const sql = `select id from "user" where username = '${username}' and pwd = '${pwd}'`;
		const result = await executeQuery(sql);
		const data = result.rows[0];
		return data == undefined ? -1 : +data.id;
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

	findIdsByRoles = async (roles) => {
		const values = roles.map((role, index) => `('${role}', ${index + 1})`);
		const sql = `select u.id from "user" u join (values ${values.join(', ')}) as v (role, ordering) on u.role = v.role order by v.ordering`;
		const result = await executeQuery(sql);
		let ids = [];
		result.rows.forEach((row) => ids.push(+row.id));
		return ids;
	}

	getUserEquipments = async (userId) => {
		const sql = `select "serialNumber", name, version from equipment where "userId" = ${userId}`;
		const result = await executeQuery(sql);
		return result.rows;
	}
}

export default UserDao;