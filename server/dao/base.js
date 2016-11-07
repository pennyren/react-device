import executeQuery from '../utils/executeQuery';

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
		const keys = Object.keys(entity);
		const values = keys.map((key, index) => {
			let val = entity[key];
			return typeof val == 'string' ? `'${val}'` : val;
		});
		const sql = `insert into "${this.entity}" (${keys.join(',')}) values (${values.join(',')})`;
		await executeQuery(sql);
		const result = await executeQuery(`select * from "${this.entity}" order by id desc limit 1`);
		return result.rows[0];
	}

	update = async (id, entity) => {
		const keys = Object.keys(entity);
		const values = keys.map((key, index) => {
			let val = entity[key];
			return typeof val == 'string' ? `'${val}'` : val;
		});
		const sql = `update "${this.entity}" set ${values.join(',')} where id = ${id}`;
		await executeQuery(sql);
		const result = await executeQuery(`select * from "${this.entity}" where id = ${id}`);
		return result.rows[0];
	}

	delete = async (id) => {
		const sql = `delete from "${this.entity}" where id = ${id}`;
		const result = await executeQuery(sql);
		return result.rows;
	}

	list = async (pageIdx = 1, pageSize = 10, orderBy = 'asc', filter = '') => {
		let filterMap = null;
		let finalFilter = '';
		if (filter) {
			filterMap = Object.keys(filter).map((key) => {
				const val = (typeof filter[key] == 'string') ? `'${filter[key]}'` : filter[key];
				return key + ' != ' + val; 
			})
			finalFilter = 'where ' + filterMap.join(' and ');
		}
		const limitOffset = `limit ${pageSize} offset ${(pageIdx - 1) * pageSize}`;
		const sql = `select * from "${this.entity}" ${finalFilter} order by id ${orderBy} ${limitOffset}`;
		const result = await executeQuery(sql);
		return result.rows;
	}

	count = async (filter = '') => {
		let filterMap = null;
		let finalFilter = '';
		if (filter) {
			filterMap = Object.keys(filter).map((key) => {
				const val = (typeof filter[key] == 'string') ? `'${filter[key]}'` : filter[key];
				return key + ' != ' + val; 
			})
			finalFilter = 'where ' + filterMap.join(' and ');
		}
		const sql = `select count(*) from "${this.entity}" ${filter}`;
		const result = await executeQuery(sql);
		return +result.rows[0].count;
	}

	totalPage = async (pageSize = 10) => {
		const sql = `select count(*) from "${this.entity}"`;
		const result = await executeQuery(sql);
		const count = +result.rows[0].count;
		const totalPage = parseInt(count / pageSize);
		return (count % pageSize == 0) ? totalPage : totalPage + 1;
	}
}

export default BaseDao;