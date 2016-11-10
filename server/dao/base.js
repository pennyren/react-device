import executeQuery from '../utils/executeQuery';
import {getConditionQuery, getEntityMap} from '../utils/generateQuery';

class BaseDao {
	constructor(entity) {
		this.entity = entity;
	}

	get = async (id) => {
		const sql = `select * from "${this.entity}" where id = ${id}`;
		const result = await executeQuery(sql);
		return result.rows[0];
	}

	create = async (entity) => {
		const {keys, values} = getEntityMap(entity, false);
		const sql = `insert into "${this.entity}" (${keys}) values (${values})`;
		await executeQuery(sql);
		const result = await executeQuery(`select * from "${this.entity}" order by id desc limit 1`);
		return result.rows[0];
	}

	update = async (id, entity) => {
		const entityMap = getEntityMap(entity);
		const sql = `update "${this.entity}" set ${entityMap} where id = ${id}`;
		await executeQuery(sql);
		const result = await executeQuery(`select * from "${this.entity}" where id = ${id}`);
		return result.rows[0];
	}

	delete = async (id) => {
		const result = await this.get(id);
		const sql = `delete from "${this.entity}" where id = ${id}`;
		await executeQuery(sql);
		return result;
	}

	list = async (filter = '', pageIdx = 1, pageSize = 10, orderBy = 'asc') => {
		const condition = getConditionQuery(filter);
		const offset = `limit ${pageSize} offset ${(pageIdx - 1) * pageSize}`;
		const sql = `select * from "${this.entity}" ${condition} order by id ${orderBy} ${offset}`;
		const result = await executeQuery(sql);
		return result.rows;
	}

	count = async (filter = '') => {
		const condition = getConditionQuery(filter);
		const sql = `select count(*) from "${this.entity}" ${condition}`;
		const result = await executeQuery(sql);
		return +result.rows[0].count;
	}

	totalPage = async (filter = '', pageSize = 10) => {
		const condition = getConditionQuery(filter);
		const count = await this.count(filter);
		const totalPage = parseInt(count / pageSize);
		return (count % pageSize == 0) ? totalPage : totalPage + 1;
	}
}

export default BaseDao;