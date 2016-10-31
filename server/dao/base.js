import executeQuery from '../utils/executeQuery';

class BaseDao {
	constructor(entity) {
		this.entity = entity;
	}

	get = async (id) => {
		const sql = `select * from "${this.entity}" where id=${id}`;
		const result = await executeQuery(sql);
		return result.rows;
	}

	create = async (entity) => {
		const keys = Object.keys(entity);
		const values = keys.map((key, index) => entity[key])
		const sql = `insert into "${this.entity}" (${keys.join(',')}) values (${values.join(',')})`;
		const result = await executeQuery(sql);
		return result.rows;
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
}

export default BaseDao;