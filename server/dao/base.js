import executeQuery from '../utils/executeQuery';

class BaseDao {
	constructor(entity) {
		this.entity = entity;
	}

	get(id) {
		const sql = `select * from ${this.entity} where id=${id}`;
		const result = executeQuery(sql);
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