const pool = require('../utils/connectToDb');

class BaseModel {
	constructor(model) {
		this.model = model;
	}

	get(id) {
		const sql = `select * from ${this.model} where id=${id}`;
		const query = pool.query(sql);
		query.on('row', (row, result) => {
			return row;
		})
	}

	create(model) {

	}

	update(id, model) {

	}

	delete(id) {

	}

	list(filter, pageIdx, pageSize, orderBy) {

	}

	count(filter) {

	}

}

module.exports = BaseModel;