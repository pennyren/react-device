import executeQuery from '../utils/executeQuery';

class BaseDao {
	constructor(entity) {
		this.entity = entity;
	}

	get = async (id) => {
		const sql = `select * from "${this.entity}" where id=${id}`;
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
		const values = keys.map((key, index) => `${key}=${entity[key]}`);
		const sql = `update "${this.entity}" set ${values.join(',')} where id=${id}`;
		const result = await executeQuery(sql);

		return result.rows;
	}

	delete = async (id) => {
		const sql = `delete from "${this.entity}" where id=${id}`;
		const result = await executeQuery(sql);
		return result.rows;
	}

	list = async (filter, pageIdx, pageSize) => {
		const finalFilter = filter ? 'where ' + filter : '';
		const finalPageSize = pageSize || 10;
		const limitOffset = pageIdx ? `limit ${finalPageSize} offset ${pageIdx*finalPageSize}` : '';
		const sql = `select * from "${this.entity} ${finalFilter} ${limitOffset}"`;
		const result = await executeQuery(sql);
		return result.rows;
	}

	count = async (filter) => {
		const finalFilter = filter ? 'where ' + filter : '';
		const sql = `select count(*) from "${this.entity}" ${finalFilter}`;
		const result = await executeQuery(sql);
		return result.rows;
	}

	totalPage = async (pageSize = 10) => {
		const sql = `select count(*) from "${this.entity}"`;
		const result = await executeQuery(sql);
		const count = result.row[0].count;
		const totalPage = parseInt(count / pageSize);
		return (count % pageSize == 0) ? totalPage : totalPage + 1;
	}
}

export default BaseDao;