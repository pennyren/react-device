import executeQuery from '../utils/executeQuery';

class BaseDao {
	constructor(entity) {
		this.entity = entity;
	}

	get = async (id) => {
		const sql = `select * from public.${this.entity} where id=${id}`;
		const result = await executeQuery(sql);
		return result.rows;
	}

	create(entity) {

	}

	update(id, entity) {

	}

	delete(id) {

	}

	list(filter, pageIdx, pageSize, orderBy) {

	}

	count(filter) {

	}

}

export default BaseDao;