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

	search = async (search, filter, pageIdx = 1, pageSize = 10) => {
		const totalSql = `select count(*) from "user" where username ilike '%${search}%'`;
		const limitOffset = `limit ${pageSize} offset ${(pageIdx - 1) * pageSize}`
		const condition = `where username ilike '%${search}%' and id != ${filter.id}`;
		const listSql = `select * from "user" ${condition} order by id asc ${limitOffset}`;
		const totalResult = await executeQuery(totalSql);
		const listResult = await executeQuery(listSql);
		const count = +totalResult.rows[0].count;
		const totalPage = parseInt(count / pageSize);
		const finalTotalPage = (count % pageSize == 0) ? totalPage : totalPage + 1;
		return {
			currentPage: pageIdx,
			totalPage: finalTotalPage,
			list: listResult.rows
		}
	}
}

export default UserDao;